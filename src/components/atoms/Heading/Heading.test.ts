/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from "@testing-library/vue"
import { afterEach, describe, it, expect, vi } from "vitest"
import { HEADING } from "./E_HEADING"
import Heading from "./Heading.vue"

let heading: HTMLHeadingElement | undefined
let getByText: Function
let findPhrase: string

afterEach(() => {
  heading = undefined
  getByText = () => {}
  findPhrase = ''
  cleanup()
})

const renderWithProps = (propsObj: Object) => {
  ({ getByText } = render(Heading, { props: propsObj }))
  heading = getByText(findPhrase)
}

describe('Heading Component - No props', () => {
  it ('should throw Error with no props', () => {
    expect(() => renderWithProps({})).toThrowError('vType is required')
    expect(heading).toBeUndefined()
  })
})

describe('Heading Component - Use defined props', () => {
  it ('accepts vClass prop', () => {
    findPhrase = 'Heading 1'
    renderWithProps({
      vType: HEADING.h1,
      vClass: 'test-heading',
    })

    expect(heading?.className).toBe('heading test-heading')
  })

  it ('accepts vType prop', () => {
    findPhrase = 'Heading 1'
    renderWithProps({ vType: HEADING.h1 })
  })
})

describe('Heading Component - Pass trough props', () => {
  it ('checks passed through props overrides defaults', () => {
    findPhrase = 'Heading 1'
    renderWithProps({
      className: 'test-heading',
      vType: HEADING.h1,
    })

    expect(heading?.className).toBe('test-heading')
  })
})
