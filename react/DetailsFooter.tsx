import * as React from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { defineMessages, FormattedMessage, useIntl } from 'react-intl'
import { Button, Flex, useToast } from '@vtex/admin-ui'

const messages = defineMessages({
  return: { id: 'admin/admin-example.details.return' },
  save: { id: 'admin/admin-example.details.save' },
  confirmMessage: {
    id: 'admin/admin-example.details.confirmMessage',
  },
})

function DetailsFooter() {
  const { navigate } = useRuntime()
  const { formatMessage } = useIntl()
  const showToast = useToast()

  return (
    <Flex justify="end">
      <Button
        variant="secondary"
        onClick={() =>
          navigate({
            page: 'admin.app.example',
          })
        }
      >
        <FormattedMessage {...messages.return} />
      </Button>
      <Button
        csx={{ marginLeft: '1rem' }}
        onClick={() =>
          showToast({
            tone: 'positive',
            message: formatMessage(messages.confirmMessage),
            dismissible: true,
          })
        }
      >
        <FormattedMessage {...messages.save} />
      </Button>
    </Flex>
  )
}

export default DetailsFooter
