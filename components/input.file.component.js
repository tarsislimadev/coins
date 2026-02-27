import { InputComponent } from './input.component.js'

export class InputFileComponent extends InputComponent {
  constructor({ label = '', value = '', placeholder = '' } = {}) {
    super({ label, value, type: 'file', placeholder })
  }
}
