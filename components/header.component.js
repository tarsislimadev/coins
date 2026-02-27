import { HTML, nFlex, nSpan } from "../libs/afrontend/index.js";
import { IconLinkComponent } from "./icon.link.component.js";
import { NoContainerLinkComponent } from "./no.container.link.component.js";
import { LinkComponent } from "./link.component.js";
import * as LOCAL from "../../../utils/local.js";
import * as CONFIG from "../../../utils/config.js";

export class HeaderComponent extends HTML {
  props = {
    subdomains: {
      products: "https://loja.tarsislima.com/",
    },
    socials: Array.from([
      ["github", "/pages/github/"], // <i class="brands github"></i>
      ["linkedin", "/pages/linkedin/"],
      ["youtube", "/pages/youtube/"],
      ["x-twitter", "/pages/twitter/"], // <i class="fa-brands fa-x-twitter"></i>
    ]),
    links: Array.from([
      // ['products'],
      ["projects", "/"],
      LOCAL.get(["access_token"])
        ? ["logout", "/pages/logout/"]
        : ["login", "/pages/login/"],
    ]),
  };

  onCreate() {
    super.onCreate();
    this.append(this.getFlex());
  }

  getFlex() {
    const flex = new nFlex();
    flex.append(this.getLeft());
    flex.append(this.getRight());
    return flex;
  }

  getLeft() {
    const left = new nSpan()
    left.append(new LinkComponent({ text: CONFIG.NAME, href: CONFIG.PAGES.HOME }),)
    return left
  }

  getRight() {
    const html = new nFlex()
    html.append(this.getLinksComponent())
    html.append(this.getSocialLinksComponent())
    return html
  }

  getSocialLinksComponent() {
    const html = new nFlex();
    Array.from(this.props.socials)
      .map(
        ([key, value = null]) =>
          new IconLinkComponent({
            icon: `fa-${key}`,
            href: value || this.props.subdomains[key],
          }),
      )
      .map((link) => html.append(link));
    return html;
  }

  getLinksComponent() {
    const html = new nFlex();
    Array.from(this.props.links)
      .map(
        ([key, value = null]) =>
          new NoContainerLinkComponent({
            text: key,
            href: value || this.props.subdomains[key],
          }),
      )
      .map((link) => html.append(link));
    return html;
  }
}
