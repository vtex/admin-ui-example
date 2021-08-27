import React from 'react'
import { useRuntime } from 'vtex.render-runtime'
import {
  ThemeProvider,
  createSystem,
  PageHeader,
  List,
  Button,
} from '@vtex/admin-ui'

const system = createSystem('admin-ui-example')

const AdminExample: React.FC = () => {
  const { navigate } = useRuntime()

  return (
    <ThemeProvider system={system}>
      <PageHeader>
        <PageHeader.Title>An admin-ui powered example app</PageHeader.Title>
      </PageHeader>

      <List>
        <List.Item>
          Item #6745{' '}
          <Button
            size="small"
            onClick={() => {
              navigate({
                page: 'admin.app.example-detail',
                params: { id: 6745 },
              })
            }}
          >
            see details
          </Button>
        </List.Item>
        <List.Item>
          Item #1987{' '}
          <Button
            size="small"
            onClick={() => {
              navigate({
                page: 'admin.app.example-detail',
                params: { id: 1987 },
              })
            }}
          >
            see details
          </Button>
        </List.Item>
      </List>
    </ThemeProvider>
  )
}

export default AdminExample
