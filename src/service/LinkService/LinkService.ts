import { Link } from "@model/Link/Link";
import { LINK_TYPE } from "@model/Link/LINK_TYPE_ENUM";
import { LINK_SOURCE } from "@model/Link/LINK_SOURCE_ENUM"
import { LinkDataType } from "@model/Link/LinkDataType";
import LinkData from "@config/LinkData.json";

interface FilterCriteria {
  [key: string]: string
}

export interface ILinkService {
  getLinkBy(criteria: FilterCriteria): Link | null,
  getLinksBy(criteria: FilterCriteria): Array<Link>,
  getLinks(): Array<Link>,
}

export class LinkService implements ILinkService
{
  _links: Array<Link> = []

  constructor()
  {
    this._init()
  }

  getLinks(): Array<Link>
  {
    return this._links
  }

  getLinksBy(criteria: FilterCriteria): Array<Link>
  {
    let resultset: Array<Link> = []
    let truthStore: Array<Boolean> = []
    let methods = Object.keys(criteria).map(key => {
      truthStore.push(false)
      return 'get' + key.charAt(0).toUpperCase() + key.slice(1)
    })

    this._links.forEach((link: Link) => {
      methods.forEach((method, id) => {
        if (link.call(method).toLowerCase() === Object.values(criteria)[id].toLowerCase()) truthStore[id] = true
        else truthStore[id] = false
      })

      if (!truthStore.includes(false)) resultset.push(link)
    })

    return resultset
  }

  getLinkBy(criteria: FilterCriteria): Link | null
  {
    let result: Link | null = null
    let truthStore: Array<Boolean> = []
    let methods = Object.keys(criteria).map(key => {
      truthStore.push(false)
      return 'get' + key.charAt(0).toUpperCase() + key.slice(1)
    })

    this._links.forEach((link: Link) => {
      methods.forEach((method, id) => {
        if (link.call(method).toLowerCase() === Object.values(criteria)[id].toLowerCase()) truthStore[id] = true
        else truthStore[id] = false
      })

      if (!truthStore.includes(false) && result === null) result = link
    })

    return result
  }

  _init(): void
  {
    if (Array.isArray(LinkData.links)) {
      const links: Array<LinkDataType> = LinkData.links;
      links.forEach(l => {
        const link = new Link(
          l.label,
          l.href,
          l.target,
          false,
          this._decideLinkType(l),
          this._decideLinkSource(l)
        )

        this._links.push(link)
      })
    }
  }

  _decideLinkType(link: LinkDataType): LINK_TYPE
  {
    if (typeof link.type !== "undefined") {
      return LINK_TYPE[ link.type?.toUpperCase() as keyof typeof LINK_TYPE ] || LINK_TYPE.URL
    }

    if (link.href.match(/^(\/.+|\#.+)$/)) return LINK_TYPE.ROUTE

    return LINK_TYPE.URL
  }

  _decideLinkSource(link: LinkDataType): LINK_SOURCE
  {
    if (typeof link.source !== "undefined") {
      return LINK_SOURCE[ link.source?.toUpperCase() as keyof typeof LINK_SOURCE ] || LINK_SOURCE.EXTERNAL
    }

    const href = location.href
    const origin = href.slice(0, href.lastIndexOf('/'))
    if (link.href.includes(origin)
      || link.href.match(/^(\/|\.\/|\#)/)
    ) return LINK_SOURCE.INTERNAL

    return LINK_SOURCE.EXTERNAL
  }
}