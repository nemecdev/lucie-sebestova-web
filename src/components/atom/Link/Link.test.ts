import { afterEach, beforeEach, describe, it, expect } from "vitest"
import { ILink, Link } from "./Link"

let linkStub: ILink | null

beforeEach(() => {
  linkStub = new Link('Home', '/#home', false)
})

afterEach(() => {
  linkStub = null
})

describe('Test Link class', () => {

  it('should reflect stub props', () => {
    expect(linkStub?.getLabel()).toBe('Home')
    expect(linkStub?.getHref()).toBe('/#home')
  })

  it('should be able to set isActive', () => {
    linkStub?.setIsActive(true)
    expect(linkStub?.getIsActive()).toBe(true)
    linkStub?.setIsActive(false)
    expect(linkStub?.getIsActive()).toBe(false)
  })

  it('should be able to set label', () => {
    linkStub?.setLabel('Contact')
    expect(linkStub?.getLabel()).toBe('Contact')
  })

  it('should be able to set href', () => {
    linkStub?.setHref('/api')
    expect(linkStub?.getHref()).toBe('/api')
  })

  it('should throw error when passing invalid URI as href', () => {
    expect(() => linkStub?.setHref('@/api'))
      .toThrowError('Link::setHref: provided invalid href')
  })
})