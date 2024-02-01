import * as icons from './index.ts'

export interface IconProps {
  width?: string;
  height?: string;
  fillColor?: string;
  name: keyof typeof icons;
}

const Icon = ({ name, ...props }: IconProps) => {
  const Component = icons[name]
  return <Component {...props} />
}

export default Icon