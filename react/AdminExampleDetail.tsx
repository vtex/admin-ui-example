import React from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { createSystem, PageHeader, Card, Button } from '@vtex/admin-ui'

const [ThemeProvider] = createSystem({
  key: 'unique-key-in-kebab-case',
})

function AdminExampleDetail({ params }: Props) {
  const { navigate } = useRuntime()

  return (
    <ThemeProvider>
      <PageHeader>asdsad</PageHeader>

      <Card>params: {JSON.stringify(params, null, 2)}</Card>
      <Button
        size="small"
        onClick={() => {
          navigate({
            page: 'admin.app.example',
          })
        }}
      >
        Back to main
      </Button>
    </ThemeProvider>
  )
}

interface Props {
  params: unknown
}

export default AdminExampleDetail
