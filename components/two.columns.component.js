import { HTML, nFlex } from '../libs/afrontend/index.js'

import { getWidth, getHeight } from '../../../utils/window.js'

export class TwoColumnsComponent extends nFlex {
  getName() { return 'two-columns-component' }

  html1 = new HTML()
  html2 = new HTML()

  state = {
    widths: ['20%', '79%'],
  }

  constructor({ html1 = new HTML(), html2 = new HTML(), widths = ['20%', '79%'] } = {}) {
    super()
    this.html1 = html1
    this.html2 = html2
    this.state.widths = widths
  }

  onCreate() {
    const landscape = (getWidth() > getHeight())
    const html = landscape ? new nFlex() : new HTML()
    html.append(this.html1.setContainerStyle('width', landscape ? this.state.widths[0] : ''))
    html.append(this.html2.setContainerStyle('width', landscape ? this.state.widths[1] : ''))
    this.append(html)
  }
}
