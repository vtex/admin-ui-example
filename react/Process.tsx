import React from 'react'
import { createSystem, Button } from '@vtex/admin-ui'

const [ThemeProvider] = createSystem({
  key: 'unique-key-in-kebab-case',
})

function Process() {
  return (
    <ThemeProvider>
      <Button style={{ display: 'block', margin: '30px auto' }}>
        Process access requests
      </Button>
      <Button style={{ display: 'block', margin: '30px auto' }}>
        Process delete requests
      </Button>
    </ThemeProvider>
  )
}

export default Process
