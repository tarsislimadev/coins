import { HTML } from '../../../libs/afrontend/index.js'

export class SeparatorComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.setStyle('border', '1px solid #000')
    this.setStyle('margin', '10px 0')
  }
}
