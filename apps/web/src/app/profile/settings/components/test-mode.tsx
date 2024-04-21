"use client";
import { Switch } from '@/src/components/ui/switch'
import React from 'react'

function TestModeSwitch() {
  return (
    <Switch  onCheckedChange={() => {
        console.log("checked")
    }} />
  )
}

export default TestModeSwitch