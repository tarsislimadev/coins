import { nTr, nTd } from '../libs/afrontend/index.js'

export class TableLineComponent extends nTr {
  cols = []

  constructor(cols = []) {
    super()
    this.cols = cols
  }

  onCreate() {
    super.onCreate()
    this.cols.map((c) => {
      const td = new nTd()
      td.append(c)
      this.append(td)
    })
  }
}
