import { HTML } from '../../../libs/afrontend/index.js'

export class ContainerComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.setStyle('margin', '0 auto')
    this.setStyle('width', '40rem')
  }
}
