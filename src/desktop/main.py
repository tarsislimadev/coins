from datetime import datetime
import flet
import config
import threading
import foxbit
import datetime

# models

class PairModel():
  def __init__(self, base: str, quote: str):
    self._base = base
    self._quote = quote

  def __str__(self) -> str:
    return (self._base + self._quote).upper()

class OrderModel():
  def __init__(self, side: str = "", now = datetime.datetime.now(), amount: str = "", price: str = ""):
    self._side = side
    self._datetime = now
    self._amount = amount
    self._price = price

class BuyModel(OrderModel):
  def __init__(self, now = datetime.datetime.now(), amount: str = "", price: str = ""):
    super().__init__("Buy", now, amount, price)

class SellModel(OrderModel):
  def __init__(self, now = datetime.datetime.now(), amount: str = "", price: str = ""):
    super().__init__("Sell", now, amount, price)

# components

class KeyValuePair(flet.Column):
  def __init__(self, t1: str = "", t2: str = ""):
    super().__init__()
    self.__key = flet.Text(t1)
    self.__value = flet.Text(t2)

    self.controls.append(flet.Row([self.__key, self.__value]))

class PricesComponent(flet.Column):
  def __init__(self, pair: PairModel("", ""), on_update = lambda: print("update")):
    super().__init__()
    self.on_update = on_update
    
    self._pair = pair
    self.__price = KeyValuePair("price", "")
    self.__datetime = KeyValuePair("datetime", "")

    self.controls.append(flet.Row([self.__price, self.__datetime]))
    self.update_price()

  def update_price(self):
    res = foxbit.GetMarketQuotation("buy", self._pair._base, self._pair._quote, "100.00")
    print("price:", res.getPrice())
    print("datetime:", str(datetime.datetime.now()))
    self.on_update()

  def set_interval(self, func, sec: float = 1):
      def func_wrapper():
          func()
          self.set_interval(func, sec)
      t = threading.Timer(sec, func_wrapper)
      t.start()
      return t

  def get_current_price(self) -> str:
    return str(self._price)

class CoinComponent(flet.Tab):
  def __init__(self, pair: PairModel("", ""), on_update = lambda: print("update")):
    super().__init__()
    self.on_update = on_update

    self.__prices = PricesComponent(pair, on_update)

    self.text = str(pair)
    self.content = flet.Column([self.__prices])

# main

def main(page: flet.Page):
  page.title = config.app_name
  page.add(flet.Tabs(tabs = [CoinComponent(PairModel("btc", "brl"), lambda: page.update())]))

if __name__ == "__main__":
  flet.app(target = main)
