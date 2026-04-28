'use client'

import * as React from 'react'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

interface AIChatToggleProps {
  enabled: boolean
  onChange: (enabled: boolean) => void
  disabled?: boolean
}

export function AIChatToggle({ enabled, onChange, disabled }: AIChatToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={enabled}
        onCheckedChange={onChange}
        disabled={disabled}
        className={cn(enabled && 'data-[state=checked]:bg-whatsapp-green')}
      />
      <span className="text-xs text-muted-foreground">
        {enabled ? 'AI Active' : 'AI Off'}
      </span>
    </div>
  )
}