import { HTML } from '../libs/@brtmvdl/frontend/src/index.js'

export class TopHTML extends HTML {
  onCreate() {
    this.setText('Coins')

    this.setStyle('background-color', '#000000')
    this.setStyle('margin-bottom', '1rem')
    this.setStyle('text-align', 'center')
    this.setStyle('font-size', '2rem')
    this.setStyle('color', '#ffffff')
    this.setStyle('padding', '1rem')
  }
}
