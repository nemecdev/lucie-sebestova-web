import { LinkInterface } from "./LinkInterface"
import { LINK_TYPE } from "./LINK_TYPE_ENUM"
import { LINK_SOURCE } from "./LINK_SOURCE_ENUM"

export class Link implements LinkInterface
{
    _label: string
    _href: string
    _target: string
    _isActive: boolean
    _type: LINK_TYPE
    _source: LINK_SOURCE

    constructor(
        label: string,
        href: string,
        target: string = '_self',
        isActive: boolean = false,
        type: LINK_TYPE = LINK_TYPE.URL,
        source: LINK_SOURCE = LINK_SOURCE.EXTERNAL
    ) {
        this._label = label
        this._href = href
        this._target = target
        this._isActive = isActive
        this._type = type,
        this._source = source
    }

    setLabel(label: string): void
    {
        this._label = label
    }

    setHref(href: string): void
    {
        const exp = new RegExp(/^[^@+_.]((http(s)?\:\/\/)|(\/|\.\/|\.\.\/)?)([a-zA-Z0-9\-_+?=&%#!@]+(\.[a-z]{1,})*(\/)?){1,}$/)

        if (!href.match(exp)) {
            throw new Error('Link::setHref: provided invalid href')
        }

        this._href = href
    }

    setTarget(target: string): void
    {
        this._target = target
    }

    setIsActive(value: boolean): void
    {
        this._isActive = value
    }

    getLabel(): string
    {
        return this._label
    }

    getHref(): string
    {
        return this._href
    }

    getTarget(): string
    {
        return this._target
    }

    getIsActive(): boolean
    {
        return this._isActive
    }

    getSource(): string
    {
        return this._source
    }

    getType(): string
    {
        return this._type
    }

    call(method: string): any
    {
        interface AllowedGetters {
            getLabel: Function,
            getHref: Function
            getTarget: Function,
            getSource: Function,
            getType: Function,
            getIsActive: Function,
        }

        const allowedGetters: AllowedGetters = {
            getLabel: () => this.getLabel(),
            getHref: () => this.getHref(),
            getTarget: () => this.getTarget(),
            getSource: () => this.getSource(),
            getType: () => this.getType(),
            getIsActive: () => this.getIsActive(),
        }


        return allowedGetters[method as keyof AllowedGetters]()
    }
}
