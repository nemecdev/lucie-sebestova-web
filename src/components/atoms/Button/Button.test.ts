/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from "@testing-library/vue"
import { afterEach, describe, it, expect, beforeEach } from "vitest"
import Button from "./Button.vue"

let btn: HTMLButtonElement | undefined
let getByText: Function

afterEach(() => {
  btn = undefined
  getByText = () => {}
  cleanup()
})

const renderWithProps = (propsObj: Object) => {
  ({ getByText } = render(Button, { props: propsObj }))
  btn = getByText('Click me')
}

describe('Button Component - No props', () => {
  beforeEach(() => {
    renderWithProps({})
  })

  it ('can be rendered with no props', () => {
    expect(btn).toBeDefined()
  })

  it ('has default .btn class', () => {
    expect(btn?.className).toBe('btn')
  })
})

describe('Button Component - Use defined props', () => {
  it ('accepts vClass prop', () => {
    renderWithProps({ vClass: 'test-btn' })

    expect(btn?.className).toBe('btn test-btn')
  })
})

describe('Button Component - Pass trough props', () => {
  it ('checks passed through props overrides defaults', () => {
    renderWithProps({
      className: 'test-btn',
      name: 'Button',
      value: 'Click me',
    })

    expect(btn?.className).toBe('test-btn')
    expect(btn?.name).toBe('Button')
    expect(btn?.value).toBe('Click me')
  })
})
