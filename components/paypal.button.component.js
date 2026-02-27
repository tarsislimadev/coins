import { ButtonComponent } from '../../../components/button.component.js'

export class PayPalButtonComponent extends ButtonComponent {
  constructor({ price = 0 } = {}) {
    super({ text: `Comprar por R$ ${price}`, onclick: () => this.onClick() })

    this.state.price = price
  }

  onCreate() {
    super.onCreate()
    this.setStyle('padding', 'calc(1rem / 2) 0')
    this.setStyle('margin', 'calc(1rem / 2) 0')
  }

  onClick() {
    alert('pagar ' + this.state.price)
  }
}
