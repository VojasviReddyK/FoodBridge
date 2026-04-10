import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

export default function OTPInput({ length = 6, value = '', onChange }) {
  const [shake, setShake] = useState(false)
  const refs = useRef([])

  const digits = useMemo(() => {
    const v = String(value || '').slice(0, length)
    return Array.from({ length }, (_, i) => v[i] || '')
  }, [value, length])

  useEffect(() => {
    refs.current = refs.current.slice(0, length)
  }, [length])

  const setAt = (index, char) => {
    const next = digits.map((d, i) => (i === index ? char : d)).join('')
    onChange?.(next)
  }

  const onKeyDown = (e, idx) => {
    if (e.key === 'Backspace') {
      if (digits[idx]) {
        setAt(idx, '')
      } else if (idx > 0) {
        refs.current[idx - 1]?.focus()
        setAt(idx - 1, '')
      }
    }
  }

  const onPaste = (e) => {
    e.preventDefault()
    const text = (e.clipboardData.getData('text') || '')
      .replace(/\D/g, '')
      .slice(0, length)
    onChange?.(text)
    const nextIndex = Math.min(text.length, length - 1)
    refs.current[nextIndex]?.focus()
  }

  const triggerShake = () => {
    setShake(true)
    setTimeout(() => setShake(false), 520)
  }

  return (
    <motion.div
      animate={shake ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
      transition={{ duration: 0.52 }}
      className="flex items-center justify-center gap-2"
      onPaste={onPaste}
      data-otp
      data-trigger-shake={triggerShake}
    >
      {digits.map((d, idx) => (
        <input
          key={idx}
          ref={(el) => (refs.current[idx] = el)}
          value={d}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          onKeyDown={(e) => onKeyDown(e, idx)}
          onChange={(e) => {
            const char = (e.target.value || '').replace(/\D/g, '').slice(-1)
            setAt(idx, char)
            if (char && idx < length - 1) refs.current[idx + 1]?.focus()
          }}
          className="h-12 w-12 rounded-2xl border border-white/60 bg-white/70 text-center text-lg font-extrabold shadow-glass backdrop-blur focus:border-primary-orange focus:bg-white"
        />
      ))}
    </motion.div>
  )
}

