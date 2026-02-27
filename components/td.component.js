import { HTML, nTd } from '../../../libs/afrontend/index.js'

export class TdComponent extends nTd {
  styles = {}
  text = ''

  constructor({ text = null, styles = {} } = {}) {
    super()
    this.text = text
    this.styles = styles
  }

  onCreate() {
    super.onCreate()
    if (this.text) this.setText(this.text)
    this.setStyles()
  }

  setStyles() {
    const self = this
    Object.keys(self.styles).map((key) => self.setStyle(key, self.styles[key]))
  }
}
