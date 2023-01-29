import { MIME } from "./MIME"

export interface IImg {
  getName(): string,
  getWidth(): number,
  getHeight(): number,
  getContentSize(): number,
  getEncodingFormat(): MIME,
}
export class Img implements IImg
{
  _name: string
  _album: string
  _width: number
  _height: number
  _contentSize: number
  _encodingFormat: MIME

  constructor(name: string, album: string, width: number, height: number, contentSize: number, encodingFormat: MIME) {
    this._name = name
    this._album = album
    this._width = width
    this._height = height
    this._contentSize = contentSize
    this._encodingFormat = encodingFormat
  }

  getName(): string
  {
    return this._name
  }

  getAlbum(): string
  {
    return this._album
  }

  getWidth(): number
  {
    return this._width
  }

  getHeight(): number
  {
    return this._height
  }

  getContentSize(): number
  {
    return this._contentSize
  }

  getEncodingFormat(): MIME
  {
    return this._encodingFormat
  }
}