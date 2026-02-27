import { HTML, nTable, nTr, nTd } from '../../../libs/afrontend/index.js'
import { TextComponent } from './text.component.js'
import { TableColumnComponent } from '../../../components/table.column.component.js'

class TableHeaderComponent extends HTML {
  getTagName() { return 'thead' }
  getName() { return 'thead-component' }
  hasContainer() { return false }
}

class TableBodyComponent extends HTML {
  getTagName() { return 'tbody' }
  getName() { return 'tbody-component' }
  hasContainer() { return false }
}

export class TableComponent extends nTable {
  head = new TableHeaderComponent()
  body = new TableBodyComponent()

  constructor(headers = []) {
    super()
    this.headers = headers.length ? headers : Object.keys(this.data?.[0] || {})
  }

  onCreate() {
    super.onCreate()
    this.append(this.head)
    this.append(this.body)
  }

  addHeaders(headers = []) {
    const tr = new nTr()
    Array.from(headers).map((h) => tr.append(new TableColumnComponent(new TextComponent({ text: h }))))
    this.append(this.head.append(tr))
  }
}
