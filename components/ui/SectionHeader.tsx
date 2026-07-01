type SectionHeaderProps = {
  tag: string
  title: string
  subtitle?: string
  light?: boolean
  center?: boolean
  className?: string
}

export default function SectionHeader({ tag, title, subtitle, light = false, center = false, className = '' }: SectionHeaderProps) {
  return (
    <div className={`${center ? 'text-center' : ''} ${className}`}>
      <span className="block text-[11px] font-semibold tracking-[0.14em] uppercase text-yellow mb-2.5">
        {tag}
      </span>
      <h2 className={`font-serif text-4xl leading-tight mb-3 ${light ? 'text-white' : 'text-brand-black'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-[15px] leading-relaxed max-w-xl ${center ? 'mx-auto' : ''} ${light ? 'text-white/60' : 'text-brand-gray'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
