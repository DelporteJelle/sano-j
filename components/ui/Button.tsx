import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type ButtonProps = {
  children: React.ReactNode
  variant: ButtonVariant
  href?: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit'
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-yellow text-brand-black hover:bg-yellow-light',
  secondary: 'bg-brand-black text-yellow hover:bg-brand-black/90',
  ghost: 'border-2 border-white/50 text-white/90 hover:border-white hover:text-white',
}

export default function Button({ children, variant, href, onClick, className = '', type = 'button' }: ButtonProps) {
  const base = 'inline-flex items-center gap-2 px-6 py-3 rounded-[6px] text-sm font-bold transition-colors duration-200 cursor-pointer'
  const classes = `${base} ${variantClasses[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
