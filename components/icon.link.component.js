import { HTML, nLink } from "../libs/afrontend/index.js";
import { LinkComponent } from "./link.component.js";

class IconComponent extends HTML {
  icon = null;

  constructor({ icon = null } = {}) {
    super();
    this.icon = icon;
  }

  getName() {
    return "icon";
  }

  getTagName() {
    return "i";
  }

  hasContainer() {
    return false;
  }

  onCreate() {
    super.onCreate();
    this.element.classList.add("fa-brands");
    this.element.classList.add(this.icon);
  }
}

export class IconLinkComponent extends LinkComponent {
  icon = null;

  constructor({ icon = null, href = null } = {}) {
    super({ text: "", href });
    this.append(new IconComponent({ icon }));
  }

  hasContainer() {
    return false;
  }
}
