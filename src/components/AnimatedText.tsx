import { useRef, CSSProperties } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

interface AnimatedCharProps {
  char: string
  progress: MotionValue<number>
  index: number
  total: number
}

function AnimatedChar({ char, progress, index, total }: AnimatedCharProps) {
  const opacity = useTransform(
    progress,
    [index / total, Math.min((index + 1) / total, 1)],
    [0.2, 1],
  )

  if (char === ' ') {
    return (
      <span style={{ display: 'inline-block', width: '0.28em' }}>&nbsp;</span>
    )
  }

  return (
    <span style={{ position: 'relative', display: 'inline' }}>
      <span style={{ opacity: 0 }}>{char}</span>
      <motion.span
        style={{ opacity, position: 'absolute', right: 0, top: 0 }}
        aria-hidden
      >
        {char}
      </motion.span>
    </span>
  )
}

interface AnimatedTextProps {
  text: string
  className?: string
  style?: CSSProperties
}

export default function AnimatedText({
  text,
  className,
  style,
}: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const chars = text.split('')

  return (
    <p ref={ref} className={className} style={style} aria-label={text}>
      {chars.map((char, i) => (
        <AnimatedChar
          key={i}
          char={char}
          progress={scrollYProgress}
          index={i}
          total={chars.length}
        />
      ))}
    </p>
  )
}
