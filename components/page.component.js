import { HTML } from '../../../libs/afrontend/index.js'
import { HeaderComponent } from './header.component.js'
import { FooterComponent } from './footer.component.js'

export class PageComponent extends HTML {
  header = new HeaderComponent()
  body = new HTML()
  footer = new FooterComponent()

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getHeaderComponent())
    this.append(this.getBodyComponent())
    this.append(this.getFooterComponent())
  }

  setStyles() {
    this.setStyle('padding', '0.5rem')
    this.setStyle('margin', '0 auto')
  }

  getHeaderComponent() {
    return this.header
  }

  getBodyComponent() {
    return this.body
  }

  getFooterComponent() {
    return this.footer
  }

}
