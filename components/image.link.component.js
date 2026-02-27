import { HTML } from '../../../libs/afrontend/index.js'
import { LinkComponent } from './link.component.js'
import { ImageComponent } from './image.component.js'

export class ImageLinkComponent extends HTML {
  state = {
    src: '',
    href: '',
    text: '',
  }

  constructor({ src = '', href = '#', text = '' } = {}) {
    super()
    this.state.src = src
    this.state.href = href
    this.state.text = text
  }

  getName() { return 'image-link-component' }

  onCreate() {
    super.onCreate()
    this.append(this.getLink())
  }

  getLink() {
    const link = new LinkComponent({ href: this.state.href, text: this.state.text })
    link.append(this.getImage())
    return link
  }

  getImage() {
    const image = new ImageComponent({ src: this.state.src, alt: this.state.text })
    image.setAttr('src', this.state.src)
    return image
  }
}
