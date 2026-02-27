import { HTML } from '../../../libs/afrontend/index.js'

export class RowComponent extends HTML {
  components = []

  constructor(components = []) {
    super()
    this.components = components
  }

  onCreate() {
    super.onCreate()
    Array.from(this.components).map((item) => this.append(item))
  }
}
