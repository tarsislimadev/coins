import { nFlex } from '../libs/afrontend/index.js'

export class ColumnComponent extends nFlex {
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
