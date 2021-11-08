import React from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { defineMessages, FormattedMessage } from 'react-intl'
import {
  createSystem,
  PageHeader,
  PageTitle,
  List,
  Button,
} from '@vtex/admin-ui'

const [ThemeProvider] = createSystem({
  key: 'admin-ui-example',
})

const messages = defineMessages({
  title: {
    id: 'admin/admin-example.title',
  },
  buttonLabel: {
    id: 'admin/admin-example.buttonLabel',
  },
  itemId: {
    id: 'admin/admin-example.itemId',
  },
})

function AdminExample() {
  const { navigate } = useRuntime()

  return (
    <ThemeProvider>
      <PageHeader>
        <PageTitle>
          <FormattedMessage {...messages.title} />
        </PageTitle>
      </PageHeader>

      <List>
        <List.Item>
          <FormattedMessage {...messages.itemId} values={{ refId: '123' }} />{' '}
          <Button
            size="small"
            onClick={() => {
              navigate({
                page: 'admin.app.example-detail',
                params: { id: 6745 },
              })
            }}
          >
            <FormattedMessage {...messages.buttonLabel} />
          </Button>
        </List.Item>
        <List.Item>
          <FormattedMessage {...messages.itemId} values={{ refId: '456' }} />{' '}
          <Button
            size="small"
            onClick={() => {
              navigate({
                page: 'admin.app.example-detail',
                params: { id: 1987 },
              })
            }}
          >
            <FormattedMessage {...messages.buttonLabel} />
          </Button>
        </List.Item>
      </List>
    </ThemeProvider>
  )
}

export default AdminExample
