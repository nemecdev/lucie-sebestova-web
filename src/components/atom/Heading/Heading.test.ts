/**
 * @vitest-environment jsdom
 */
import { cleanup, render } from "@testing-library/vue"
import { afterEach, describe, it, expect } from "vitest"
import { HEADING } from "./E_HEADING"
import Heading from "./Heading.vue"

let heading: HTMLHeadingElement | null
let getByText: Function
let findPhrase: string

afterEach(() => {
  heading = null
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
    findPhrase = 'Heading'
    expect(() => renderWithProps({})).toThrowError()
  })
})

describe('Heading Component - Use defined props', () => {
  it ('accepts vType prop', () => {
    findPhrase = 'Heading'
    renderWithProps({
      vType: HEADING.h1
    })

    expect(heading?.tagName).toBe('H1')
  })

  it ('accepts vContent prop', () => {
    findPhrase = 'Heading 1'
    renderWithProps({ vType: HEADING.h1, vContent: 'Heading 1' })

    expect(heading?.innerHTML.trim()).toBe('Heading 1')
  })

  it ('should render error content', () => {
    findPhrase = 'vType not in HEADING( ENUM )'
    renderWithProps({ vType: 'h20' })

    expect(heading?.innerHTML.trim()).toBe('vType not in HEADING( ENUM )')
  })
})

describe('Heading Component - Pass trough props', () => {
  it ('checks passed through props overrides defaults', () => {
    findPhrase = 'Heading'
    renderWithProps({
      vType: HEADING.h1,
      class: 'test-heading',
      id: '#super-head',
      style: 'color: red;',
    })

    expect(heading?.className).toBe('test-heading')
    expect(heading?.id).toBe('#super-head')
    expect(heading?.style.color).toBe('red')
  })
})
