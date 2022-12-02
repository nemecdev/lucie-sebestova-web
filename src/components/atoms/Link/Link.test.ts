/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from "@testing-library/vue"
import { afterEach, describe, it, expect, beforeEach } from "vitest"
import Link from "./Link.vue"

let link: HTMLLinkElement | undefined
let getByText: Function

afterEach(() => {
  link = undefined
  getByText = () => {}
  cleanup()
})

const renderWithProps = (propsObj: Object) => {
  ({ getByText } = render(Link, { props: propsObj }))
  link = getByText('Link')
}

describe('Link Component - No props', () => {
  beforeEach(() => {
    renderWithProps({})
  })

  it ('can be rendered with no props', () => {
    expect(link).toBeDefined()
  })

  it ('has default .btn class', () => {
    expect(link?.className).toBe('link')
  })
})

describe('Link Component - Use defined props', () => {
  it ('accepts vClass prop', () => {
    renderWithProps({ vClass: 'test-link' })

    expect(link?.className).toBe('link test-link')
  })
})

describe('Link Component - Pass trough props', () => {
  it ('checks passed through props overrides defaults', () => {
    renderWithProps({
      className: 'test-link',
      href: '/#aboutMe',
    })

    expect(link?.className).toBe('test-link')
    expect(link?.href).toBe(location.href.slice(0, -1) + '/#aboutMe')
  })
})
