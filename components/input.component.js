import { HTML, nInput } from '../../../libs/afrontend/index.js'

export class InputComponent extends HTML {
  state = {
    label: '',
    value: '',
    type: 'text',
    placeholder: '',
  }

  label = new HTML()
  input = new nInput()
  error = new HTML()

  constructor({ label = '', value = '', type = 'text', placeholder = '' } = {}) {
    super()
    this.state.label = label
    this.state.value = value
    this.state.type = type
    this.state.placeholder = label || placeholder
  }

  onCreate() {
    super.onCreate()
    this.append(this.getLabel())
    this.append(this.getInput())
    this.append(this.getError())
  }

  getLabelText(text = this.state.label?.toString()) { return text }

  getLabel(text = this.getLabelText()) {
    if (text) this.label.setText(text)
    return this.label
  }

  getPlaceholderText(text = this.state.placeholder?.toString()) { return text }

  getValueText(text = this.state.value?.toString()) { return text }

  getTypeText(text = this.state.type?.toString()) { return text }

  getAccepts(accepts = '') { return accepts }

  getInput() {
    this.input.setPlaceholder(this.getPlaceholderText())
    this.input.setValue(this.getValueText())
    this.input.setAttr('type', this.getTypeText())
    this.input.setAttr('accepts', this.getAccepts())
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
    return this.input.getValue()
  }

  setValue(value = '') {
    this.input.setValue(value)
  }
}
