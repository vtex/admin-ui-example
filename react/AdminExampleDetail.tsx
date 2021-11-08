import React from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { defineMessages, FormattedMessage } from 'react-intl'
import {
  createSystem,
  PageHeader,
  PageTitle,
  Card,
  Button,
} from '@vtex/admin-ui'

const [ThemeProvider] = createSystem({
  key: 'unique-key-in-kebab-case',
})

const messages = defineMessages({
  title: {
    id: 'admin/admin-example.details.title',
  },
  params: {
    id: 'admin/admin-example.details.params',
  },
  back: {
    id: 'admin/admin-example.details.back',
  },
})

function AdminExampleDetail({ params }: Props) {
  const { navigate } = useRuntime()

  return (
    <ThemeProvider>
      <PageHeader>
        <PageTitle>
          <FormattedMessage {...messages.title} />
        </PageTitle>
      </PageHeader>

      <Card>
        <h3>
          <FormattedMessage {...messages.params} />
        </h3>
        <pre>{JSON.stringify(params, null, 2)}</pre>
      </Card>
      <Button
        size="small"
        onClick={() => {
          navigate({
            page: 'admin.app.example',
          })
        }}
      >
        <FormattedMessage {...messages.back} />
      </Button>
    </ThemeProvider>
  )
}

interface Props {
  params: unknown
}

export default AdminExampleDetail
