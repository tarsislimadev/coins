import { TextComponent } from '../../../components/text.component.js'

export class TitleComponent extends TextComponent {
  onCreate() {
    super.onCreate()
    this.setStyle('font-size', '2em')
    this.setStyle('font-weight', 'bold')
  }
}
