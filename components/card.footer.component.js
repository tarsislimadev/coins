import { HTML } from '../../../libs/afrontend/index.js'

export class CardFooterComponent extends HTML {
  getName() { return 'card-footer-component' }

  onCreate() {
    super.onCreate()
    this.setStyles()
  }

  setStyles() {
    this.setStyle('padding', 'calc(1rem / 4)')
  }
}
