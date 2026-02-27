import { HTML, nSpan, nFlex, nImage } from '../../../../libs/afrontend/index.js'

export class BootstrapCardImageTopComponent extends nImage {
  onCreate() {
    super.onCreate()
    this.element.classList.add('card-img-top')
  }
}

export class BootstrapCardBodyTitleComponent extends HTML {
  getTagName() { return 'h5' }

  onCreate() {
    super.onCreate()
    this.element.classList.add('card-title')
  }
}

export class BootstrapCardBodyTextComponent extends HTML {
  getTagName() { return 'p' }

  onCreate() {
    super.onCreate()
    this.element.classList.add('card-text')
  }
}

export class BootstrapCardBodyComponent extends HTML {
  body_title = new BootstrapCardBodyTitleComponent()
  body_text = new BootstrapCardBodyTextComponent()

  onCreate() {
    super.onCreate()
    this.element.classList.add('card-body')
    this.append(this.getBodyTitleComponent())
    this.append(this.getBodyTextComponent())
  }

  getBodyTitleComponent() {
    return this.body_title
  }

  getBodyTextComponent() {
    return this.body_text
  }

  setTitleText(text = '') {
    this.body_title.setText(text)
  }

  setTextText(text = '') {
    this.body_text.setText(text)
  }
}

export class BootstrapCardComponent extends HTML {
  card_image_top = new BootstrapCardImageTopComponent()
  card_body = new BootstrapCardBodyComponent()

  onCreate() {
    super.onCreate()
    this.element.classList.add('card')
    this.append(this.getCardImageTopComponent())
    this.append(this.getCardBodyComponent())
  }

  getCardImageTopComponent() {
    return this.card_image_top
  }

  getCardBodyComponent() {
    return this.card_body
  }
}
