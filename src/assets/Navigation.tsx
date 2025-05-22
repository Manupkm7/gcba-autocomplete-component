interface NavigationIconProps {
  className?: string
  size?: number
  color?: string
}

export const NavigationIcon: React.FC<NavigationIconProps> = ({
  className = "",
  size = 24,
  color = "currentColor",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="3,11 22,2 13,21 11,13 3,11" />
    </svg>
  )
}

export default NavigationIcon
