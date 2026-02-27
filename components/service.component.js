import { HTML, nFlex } from '../../../libs/afrontend/index.js'
import { TextComponent } from '../../../components/text.component.js'
import { ImageComponent } from '../../../components/image.component.js'
import { ButtonComponent } from './button.component.js'

export class ServiceComponent extends HTML {
  state = {
    image: '',
    title: '',
    price: 0,
    href: '',
  }

  constructor({ image = '', title = '', price = 0, href = '' } = {}) {
    super()

    this.state.image = image
    this.state.title = title
    this.state.price = price
    this.state.href = href
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getFlex())
    this.append(new ButtonComponent({ text: `Assinar por R$ ${this.state.price}/mes`, onclick: () => (window.location = this.state.href) }))
  }

  setStyles() {
    this.setStyle('padding', 'calc(1rem / 2) 0')
    this.setStyle('margin', 'calc(1rem / 2) 0')
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getFlexLeft())
    flex.append(this.getFlexRight())
    return flex
  }

  getFlexLeft() {
    const image = new ImageComponent({ src: `/assets/img/${this.state.image}.png`, alt: this.state.title })
    image.setStyle('max-width', '3rem')
    return image
  }

  getFlexRight() {
    return new TextComponent({ text: this.state.title })
  }
}
