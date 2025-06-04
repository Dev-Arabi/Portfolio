"use client"

import { useState, useEffect } from "react"

interface UseTypewriterProps {
  text: string
  speed?: number
  deleteSpeed?: number
  delayBetween?: number
}

export function useTypewriter({
  text,
  speed = 100,
  deleteSpeed = 50,
  delayBetween = 2000,
}: UseTypewriterProps): string {
  const [displayedText, setDisplayedText] = useState("")
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [pause, setPause] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (pause) {
      timeout = setTimeout(() => {
        setPause(false)
        setDeleting(true)
      }, delayBetween)
      return () => clearTimeout(timeout)
    }

    if (deleting) {
      if (displayedText === "") {
        setDeleting(false)
        setIndex(0)
        return
      }

      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1))
      }, deleteSpeed)
      return () => clearTimeout(timeout)
    }

    if (index <= text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, index))
        setIndex((prev) => prev + 1)

        if (index === text.length) {
          setPause(true)
        }
      }, speed)
      return () => clearTimeout(timeout)
    }

    return () => clearTimeout(timeout)
  }, [text, speed, deleteSpeed, delayBetween, displayedText, index, deleting, pause])

  return displayedText
}
