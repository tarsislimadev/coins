import { HTML } from '../../../libs/afrontend/index.js'

export class InputsComponent extends HTML {
  components = {}

  getComponent(component = '') {
    return this.components[component]
  }

  getValue(component = '') {
    return this.getComponent(component)?.getValue()
  }
}
