import { HTML } from '../../../libs/afrontend/index.js'
import { SelectComponent } from './select.component.js'
import { ButtonComponent } from './button.component.js'
import { InputsComponent } from './inputs.component.js'

export class EndpointsComponent extends HTML {
  select = new SelectComponent({})
  form = new HTML()
  inputs = new InputsComponent()

  state = {
    endpoints: [],
  }

  constructor(endpoints = [], inputs = new InputsComponent()) {
    super()
    this.state.endpoints = endpoints
    this.inputs = inputs
  }

  getName() { return 'endpoints-component' }

  onCreate() {
    super.onCreate()
    this.append(this.getEndpointsSelect())
    this.append(this.getForm())
    this.append(new ButtonComponent({ text: 'send', onclick: () => this.onSendButtonClick() }))
  }

  getEndpointsSelect() {
    Array.from(this.state.endpoints).map(({ name }) => this.select.addOption(name, name))
    this.select.addEventListener('change', () => this.onEndpointsSelectChange())
    return this.select
  }

  onEndpointsSelectChange() {
    this.form.clear()
    this.getEndpointInputs().map((i) => this.form.append(i))
  }

  getEndpointInputs(endpoint = this.select.getValue()) {
    const { params, query } = this.getEndpoint(endpoint)
    return Array.from(params).concat(query).map((q) => (this.inputs.getComponent(q)))
  }

  getForm() {
    return this.form
  }

  onSendButtonClick() {
    const endpoint = this.getEndpoint()
    const query = this.getEndpointQuery()
    const params = this.getEndpointParams()
    this.dispatch('send', { endpoint, query, params })
  }

  getEndpoint(endpoint = this.select.getValue()) {
    return Array.from(this.state.endpoints).find(({ name }) => name == endpoint)
  }

  getEndpointQuery(endpoint = this.select.getValue()) {
    const { query } = this.getEndpoint(endpoint)
    return Array.from(query).reduce((params, q) => ({ ...params, [q]: this.inputs.getValue(q) }), {})
  }

  getEndpointParams(endpoint = this.select.getValue()) {
    const { params } = this.getEndpoint(endpoint)
    return Array.from(params).reduce((params, q) => ({ ...params, [q]: this.inputs.getValue(q) }), {})
  }

}
