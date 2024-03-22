export interface FormattedTextProps {
  text: string | null
}

const FormattedText: React.FC<FormattedTextProps> = ({
  text
}: FormattedTextProps): JSX.Element => {
  const bulletRegex = /^\* (.*)$/
  const boldRegex = /\*\*(.*?)\*\*/g
  //   const codeBlockRegex = /```javascript\s*([\s\S]*?)\s*```/gm

  return text === null ? (
    <></>
  ) : (
    <>
      {text.split('\n').map((paragraph, index) => {
        if (bulletRegex.test(paragraph)) {
          return (
            <li key={index}>
              {paragraph
                .replace(bulletRegex, '$1')
                .split(boldRegex)
                .map((part, index) => {
                  if (index % 2 === 1) {
                    return <strong key={index}>{part}</strong>
                  } else {
                    return <span key={index}>{part}</span>
                  }
                })}
            </li>
          )
        } else {
          return (
            <p key={index}>
              {paragraph.split(boldRegex).map((part, index) => {
                if (index % 2 === 1) {
                  return (
                    <strong key={index}>
                      {part}
                      <br />
                    </strong>
                  )
                } else {
                  return (
                    <span key={index}>
                      {part}
                      <br />
                    </span>
                  )
                }
              })}
            </p>
          )
        }
      })}
    </>
  )
}

export default FormattedText
