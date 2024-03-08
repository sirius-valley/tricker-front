import React from 'react'

interface ExampleProps {
  exampleMessage?: string
}

const Example: React.FC<ExampleProps> = ({
  exampleMessage = 'This is an example message.'
}: ExampleProps): JSX.Element => {
  return <div data-testid="message-container">{exampleMessage}</div>
}

export default Example
