import { HTML, nSelect } from '../../../libs/afrontend/index.js'

export class SelectComponent extends HTML {
  state = { label: '', options: [] }

  label = new HTML()
  input = new nSelect()
  error = new HTML()

  constructor({ label = '', options = [] } = {}) {
    super()
    this.state.label = label
    this.state.options = options
  }

  getName() { return 'select-component' }

  onCreate() {
    super.onCreate()
    this.append(this.getLabel())
    this.append(this.getInput())
    this.append(this.getError())
  }

  getLabel() {
    this.label.setStyle('margin', '0rem 0rem calc(1rem / 4) 0rem')
    this.label.setText(this.state.label)
    Array.from(this.state.options).map(([key, value = '']) => this.addOption(key, value))
    return this.label
  }

  getInput() {
    this.input.setStyle('margin', '0rem 0rem calc(1rem / 4) 0rem')
    this.input.setStyle('padding', 'calc(1rem / 4)')
    this.input.setStyle('box-sizing', 'border-box')
    this.input.setStyle('width', '100%')
    return this.input
  }

  getError() {
    return this.error
  }

  getValue() {
    return this.getInput().getValue()
  }

  addOption(key, value = '') {
    this.input.addOption(key, value)
    return this
  }
}
