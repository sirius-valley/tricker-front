import React from 'react'

interface DividerProps {
  color: string
  vertical?: boolean
}

const Divider: React.FC<DividerProps> = ({
  color,
  vertical = false
}): JSX.Element => (
  <div className={`${vertical ? 'w-px h-full' : 'w-full h-px'} bg-${color}`} />
)

export default Divider
