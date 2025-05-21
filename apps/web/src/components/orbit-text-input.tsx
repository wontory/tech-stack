'use client'

import { Input } from '@tech-stack/ui/components/input'

import { useOrbitState } from '#stores/orbit-context'

export function OrbitTextInput({ id }: { id: string }) {
  const { text, setText } = useOrbitState()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setText(value)
  }

  return (
    <Input
      id={id}
      type="text"
      className="w-full"
      value={text}
      onChange={handleChange}
    />
  )
}
