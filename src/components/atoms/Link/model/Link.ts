export class Link
{
    _label: string;
    _href: string;
    _isActive: boolean;

    constructor(name: string, href: string, isActive: boolean)
    {
        this._label = name;
        this._href = href;
        this._isActive = isActive;
    }

    getLabel(): string
    {
        return this._label;
    }

    setLabel(label: string): void
    {
        this._label = label;
    }

    getHref(): string
    {
        return this._href;
    }

    setHref(href: string): void
    {
        this._href = href;
    }

    getIsActive(): boolean
    {
        return this._isActive
    }

    setIsActive(value: boolean): void
    {
        this._isActive = value;
    }
}
