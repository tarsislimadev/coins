import { HTML, nSelectGroup } from '../../../libs/afrontend/index.js'

export class SelectGroupComponent extends nSelectGroup {
  text = ''
  values = []

  constructor(text = '', values = []) {
    super()
    this.text = text
    this.values = values
  }

  onCreate() {
    super.onCreate()
    this.label.setText(this.text)
    Array.from(this.values).map((value) => this.select.addOption(value, value))
  }

}
