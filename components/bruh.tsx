'use client'

import * as React from "react"

export default function BatteryLevel() {
  const [level, setLevel] = React.useState(0)

  React.useEffect(() => {
    console.log("Getting battery level...")
    navigator.getBattery().then(battery => {
      const newLevel = Math.round(battery.level * 100)

      if (newLevel !== level) {
        setLevel(newLevel)
      }
    })
  })

  console.log("Rendering")
  return (
    <p>{level}%</p>
  )
}
