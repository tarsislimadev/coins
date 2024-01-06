import flet
import config
import threading
import foxbit
import datetime

# models

class DatetimeModel():
  def __init__(self, now: datetime = datetime.datetime.now()):
    self._now = now

  def __str__(self) -> str:
    return f"{self._now.year}/{self._now.month}/{self._now.day} {self._now.hour}:{self._now.minute}"

class PairModel():
  def __init__(self, base: str, quote: str):
    self._base = base
    self._quote = quote

  def __str__(self) -> str:
    return (self._base + self._quote).upper()

class BuyModel():
  def __init__(self, pair: PairModel, amount: str):
    self._datetime = datetime.datetime.now()
    self._pair = pair
    self._amount = amount
    self._value: str = ""

class SellModel():
  def __init__(self, buy: BuyModel):
    self._datetime = datetime.datetime.now()
    self._buy = buy
    self._value: str = ""

# components

class KeyValuePair(flet.Column):
  def __init__(self, t1: str = "", t2: str = ""):
    super().__init__()
    self._t1 = t1
    self._t2 = t2
    self.t1 = flet.Text(f"{self._t1}: ")
    self.t2 = flet.Text(self._t2)
    self.controls.append(flet.Row([self.t1, self.t2]))

class TitleComponent(flet.Column):
  def __init__(self, text: str = ""):
    super().__init__()
    self._text = ""
    self.text = flet.Text(self._text)
    self.controls.append(flet.Row([self.text]))

class BuyComponent(flet.Column):
  def __init__(self, buy: BuyModel = None, on_sell = lambda _: print("sell"), on_update = lambda _: print("update")):
    super().__init__()
    self._buy = buy
    self.on_sell = on_sell
    self.on_update = on_update
    self.controls.append(flet.Column([
      KeyValuePair("datetime", self._buy._datetime),
      KeyValuePair("base", self._buy._pair._base),
      KeyValuePair("quote", self._buy._pair._quote),
      KeyValuePair("amount", self._buy._amount),
      KeyValuePair("value", self._buy._value),
      flet.TextButton("Sell", on_click = self.sell)
    ]))

  def sell(self, e):
    self.on_sell(self._buy)
    self.on_update()

class BuysComponent(flet.Column):
  def __init__(self, on_sell = lambda _: print("sell"), on_update = lambda _: print("update")):
    super().__init__()
    self._buys = []
    self.on_sell = on_sell
    self.on_update = on_update

  def append(self, buy: BuyModel):
    self._buys.append(buy)
    self.update()

  def update(self):
    self.controls.clear()

    self.controls.append(TitleComponent("Buys"))

    for buy in self._buys:
      self.controls.append(BuyComponent(buy, self.on_sell, self.on_update))

    self.on_update()

class SellComponent(flet.Column):
  def __init__(self, sell: SellModel = None):
    super().__init__()
    self._sell = sell
    self.controls.append(flet.Row([
    ]))

class SellsComponent(flet.Column):
  def __init__(self, on_update = lambda _: print("update")):
    super().__init__()
    self._sells = []
    self.on_update = on_update

  def append(self, sell: SellModel):
    self._sells.append(sell)
    self.update()

  def update(self):
    self.controls.clear()

    self.controls.append(TitleComponent("Sells"))

    for sell in self._sells:
      self.controls.append(SellComponent(sell))

    self.on_update()

class PricesComponent(flet.Column):
  def __init__(self, pair: PairModel, on_update = lambda _: print("update")):
    super().__init__()
    self._pair = pair
    self.on_update = on_update
    self.controls.append(flet.Row([
      KeyValuePair("pair", ""),
      KeyValuePair("price", ""),
      KeyValuePair("datetime", ""),
    ]))

#     def updatePrice():
#       res = foxbit.GetMarketQuotation("buy", self._pair._base, self._pair._quote, "100")
#       print(foxbit.GetMarketQuotationResponse(res))
#       self.update()

#     self.set_interval(updatePrice)

#   def set_interval(self, func, sec: int = 1):
#     def func_wrapper():
#       self.set_interval(func, sec)
#       func()
    
#     t = threading.Timer(sec, func_wrapper)
#     t.start()
#     return t

#   def update(self):
#     self.on_update()

class CoinComponent(flet.Tab):
  def __init__(self, pair: PairModel("", ""), on_update = None):
    super().__init__()
    self._pair = pair
    self.text = str(self._pair)
    self._sells = SellsComponent(on_update)
    self._buys = BuysComponent(lambda buy: self._sells.append(buy), on_update)
    self._amount = flet.TextField(label = "Amount")
    self._buy_button = flet.TextButton(text = "Buy", on_click = lambda _: self._buys.append(BuyModel(self._pair, self._amount.value)))

    self.content = flet.Column([
      PricesComponent(self._pair, on_update),
      flet.Row([self._amount, self._buy_button]),
      flet.Row([self._buys]),
      flet.Row([self._sells]),
    ])

# main

def main(page: flet.Page):
  page.title = config.app_name
  on_update = lambda: page.update()
  page.add(flet.Tabs(tabs = [
    CoinComponent(PairModel("btc", "brl"), on_update),
    CoinComponent(PairModel("usdt", "brl"), on_update),
    CoinComponent(PairModel("usdc", "brl"), on_update),
  ]))

if __name__ == "__main__":
  flet.app(target = main)
