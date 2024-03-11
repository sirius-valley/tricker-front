import { describe, expect, it } from 'vitest'
import Example from './Example'
import { render, screen } from '@testing-library/react'
//import React from 'react'

/**
 * For more info visit:
 * - https://vitest.dev/api/
 * - https://testing-library.com/docs/
 * - https://www.youtube.com/watch?v=dopLE8NTgFk&ab_channel=MonsterlessonsAcademy
 *  */

describe('ExampleMessage', () => {
  it('renders default example message', () => {
    render(<Example />)
    // screen.debug()
    expect(screen.getByTestId('message-container')).toHaveTextContent(
      'This is an example message.'
    )
  })
  it('renders custom example message', () => {
    render(<Example exampleMessage="This is another example message." />)
    // screen.debug() // DOM view
    expect(screen.getByTestId('message-container')).toHaveTextContent(
      'This is another example message.'
    )
  })
})
