import { HTML, nButton } from '../libs/@brtmvdl/frontend/src/index.js'

export class ButtonHTML extends nButton {
  onCreate() {

    this.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 4) #000000')
    this.setStyle('background-color', '#000000')
    this.setStyle('padding', 'calc(1rem / 2)')
    this.setStyle('text-align', 'center')
    this.setStyle('color', '#ffffff')
    this.setStyle('outline', 'none')
    this.setStyle('border', 'none')
    this.setStyle('margin', '1rem')
  }

}
