import { ILinkData, Link } from "./Link";
export const SOCIAL_MEDIA_DOMAINS: Array<string> = [
  'linkedin.com',
  'facebook.com',
  'instagram.com',
]
export enum LINK_TYPE {
  INTERNAL = 'internal',
  EXTERNAL = 'external',
  SOCIAL = 'social',
  FILE = 'file',
}
export interface ILinkService {
  getLinks(type: string): Array<Link>,
  getLinkByLabel(label: string): Link | undefined,
  buildLinks(links: Array<ILinkData>): void,
  deactivateLinks(): void,
  deactivateLink(label: string): void,
}
export class LinkService implements ILinkService
{
  _links: Array<Link> = []
  _internalLinks: Array<Link> = []
  _externalLinks: Array<Link> = []
  _socialLinks: Array<Link> = []
  _fileLinks: Array<Link> = []

  constructor(links: Array<ILinkData> = [])
  {
    this.buildLinks(links)
  }

  deactivateLink(label: string): void
  {
    this.getLinkByLabel(label)?.setIsActive(false)
  }

  deactivateLinks(): void
  {
    this._links.forEach(link => link.setIsActive(false))
  }

  getLinks(type: LINK_TYPE | string = ''): Array<Link>
  {
    switch (type) {
      case 'internal':
        return this._internalLinks
      case 'external':
        return this._externalLinks
      case 'social':
        return this._socialLinks
      case 'file':
        return this._fileLinks
      default:
        return this._links
    }
  }

  getLinkByLabel(label: string): Link | undefined
  {
    return this._links.find(link => link.getLabel() === label)
  }

  buildLinks(links: Array<ILinkData>): void
  {
    links.forEach((link: ILinkData) => {
      const cLink = new Link(
        link.label,
        link.href,
        link.target
      )

      this._links.push(cLink)
      if (cLink.getHref().match(/\..*$/)) this._fileLinks.push(cLink)

      if (!cLink.getHref().match(/^http(s)?/)
        || cLink.getHref().includes(origin)
      ) {
        this._internalLinks.push(cLink)
      } else if (cLink.getHref().match(/^http(s)?/)
        && !cLink.getHref().includes(origin)
      ) {
        this._externalLinks.push(cLink)
        if (SOCIAL_MEDIA_DOMAINS.some((domain: string) => {
          return cLink.getHref().includes(domain)
        })) {
          this._socialLinks.push(cLink)
        }
      }
    })
  }
}