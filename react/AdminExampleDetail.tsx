import React from 'react'
import { useRuntime } from 'vtex.render-runtime'
import {
  ThemeProvider,
  createSystem,
  PageHeader,
  Card,
  Button,
} from '@vtex/admin-ui'

const system = createSystem('admin-ui-example-details')

function AdminExampleDetail({ params }: Props) {
  const { navigate } = useRuntime()

  return (
    <ThemeProvider system={system}>
      <PageHeader>
        <PageHeader.Title>Details page title</PageHeader.Title>
      </PageHeader>

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
