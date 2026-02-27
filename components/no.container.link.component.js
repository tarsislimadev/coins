import { LinkComponent } from './link.component.js'

export class NoContainerLinkComponent extends LinkComponent {
  side = 'right'

  constructor({ side = 'right', text = null, href = null } = {}) {
    super({ text, href })
    this.side = side
  }

  hasContainer() { return false }

  onCreate() {
    super.onCreate()
    this.setStyle('margin-' + this.side, '0.5rem')
  }
}
