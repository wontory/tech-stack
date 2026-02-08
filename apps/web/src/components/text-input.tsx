'use client'

import { Input } from '@tech-stack/ui/components/input'
import type { Dispatch, SetStateAction } from 'react'

interface TextInputProps {
  id: string
  text: string
  setText: Dispatch<SetStateAction<string>>
}

export function TextInput({ id, text, setText }: TextInputProps) {
  return (
    <Input
      id={id}
      type="text"
      className="w-full"
      value={text}
      onChange={(event) => setText(event.target.value)}
    />
  )
}
