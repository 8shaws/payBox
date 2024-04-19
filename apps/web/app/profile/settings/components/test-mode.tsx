"use client";
import { Switch } from '@/components/ui/switch'
import React from 'react'

function TestModeSwitch() {
  return (
    <Switch  onCheckedChange={() => {
        console.log("checked")
    }} />
  )
}

export default TestModeSwitch