import React from 'react'
import { createSystem, Button, Input } from '@vtex/admin-ui'

const [ThemeProvider] = createSystem({
  key: 'unique-key-in-kebab-case',
})

function GetRequest() {
  const [value, setValue] = React.useState('')

  return (
    <ThemeProvider>
      <div style={{ width: '40%', margin: '30px auto' }}>
        <Input
          id="uuid"
          label="UUID"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <Button style={{ display: 'block', margin: '30px auto' }}>
        Get request
      </Button>
    </ThemeProvider>
  )
}

export default GetRequest
