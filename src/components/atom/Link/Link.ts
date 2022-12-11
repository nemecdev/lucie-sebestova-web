export interface ILinkData {
    label: string,
    href: string,
    target?: string,
    rel?: string,
}
export interface ILink {
    setLabel(label: string): void,
    setHref(href: string): void,
    setTarget(target: string): void,
    setRel(rel: string): void,
    setIsActive(value: boolean): void,
    getLabel(): string,
    getHref(): string,
    getTarget(): string,
    getRel(): string,
    getIsActive(): boolean,
}
export class Link implements ILink
{
    _label: string
    _href: string
    _rel: string
    _target: string
    _isActive: boolean

    constructor(
        name: string,
        href: string,
        target: string = '_self',
        rel: string = '',
        isActive: boolean = false
    ) {
        this._label = name
        this._href = href
        this._target = target
        this._rel = rel
        this._isActive = isActive
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

    setRel(rel: string): void
    {
        this._rel = rel
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

    getRel(): string
    {
        return this._rel
    }

    getIsActive(): boolean
    {
        return this._isActive
    }
}
