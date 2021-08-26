import React from 'react'
import { withRuntimeContext } from 'vtex.render-runtime'
import {
  ThemeProvider,
  createSystem,
  PageHeader,
  Card,
  Button,
} from '@vtex/admin-ui'

const system = createSystem('admin-ui-example-details')

const AdminExampleDetail: React.FC<Props> = ({
  params,
  runtime: { navigate },
}) => {
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

interface NavigateArgs {
  page: string
  params?: unknown
}

interface Runtime {
  navigate: (args: NavigateArgs) => void
}

interface Props {
  runtime: Runtime
  params: unknown
}

export default withRuntimeContext(AdminExampleDetail)
