import React from 'react'
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
  // ------
  // Pull the navigation function from the runtime
  const { navigate } = useRuntime()

  // ------
  // React Intl to retrieve direct strings
  const { formatMessage } = useIntl()

  // ------
  // Toast related config
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
        style={{ marginLeft: '1rem' }}
        onClick={() =>
          showToast({
            type: 'success',
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
