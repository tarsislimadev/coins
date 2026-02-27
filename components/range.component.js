import { HTML } from '../../../libs/afrontend/index.js'

export class RangeComponent extends HTML {
  constructor({ label, min, max, step }) {
    super()
    this.label = label
    this.min = min
    this.max = max
    this.step = step
  }

  onCreate() {
    super.onCreate()
    this.append(new HTML({
      tag: 'label',
      text: this.label,
      attributes: { for: this.id }
    }))
    this.append(new HTML({
      tag: 'input',
      attributes: {
        type: 'range',
        id: this.id,
        min: this.min,
        max: this.max,
        step: this.step
      }
    }))
  }
}