import * as React from 'react'
import { defineMessages, FormattedMessage, useIntl } from 'react-intl'
import {
  Button,
  ModalDisclosure,
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  useModalState,
  TextInput,
  useToast,
  PageHeaderButton,
} from '@vtex/admin-ui'

const messages = defineMessages({
  modalTrigger: {
    id: 'admin/admin-example.create.modalTrigger',
  },
  modalHeader: {
    id: 'admin/admin-example.create.modalHeader',
  },
  productName: {
    id: 'admin/admin-example.create.productName',
  },
  adjective: {
    id: 'admin/admin-example.create.adjective',
  },
  price: {
    id: 'admin/admin-example.create.price',
  },
  cancel: {
    id: 'admin/admin-example.create.cancel',
  },
  confirm: {
    id: 'admin/admin-example.create.confirm',
  },
  confirmMessage: {
    id: 'admin/admin-example.create.confirmMessage',
  },
})

function ProductCreation() {
  const { formatMessage } = useIntl()
  const modal = useModalState()
  const [productName, setProductName] = React.useState('')
  const [adjective, setAdjective] = React.useState('')
  const [price, setPrice] = React.useState('')
  const showToast = useToast()

  return (
    <>
      <ModalDisclosure state={modal}>
        <PageHeaderButton css={{}}>
          {/* empty css here is to prevent builder hub's react builder from crashing */}
          <FormattedMessage {...messages.modalTrigger} />
        </PageHeaderButton>
      </ModalDisclosure>
      <Modal aria-label="Product creation modal" state={modal}>
        <ModalHeader title={formatMessage(messages.modalHeader)} />
        <ModalContent>
          <TextInput
            id="productName"
            label={formatMessage(messages.productName)}
            value={productName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProductName(e.target.value)
            }
          />
          <TextInput
            id="adjective"
            label={formatMessage(messages.adjective)}
            value={adjective}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAdjective(e.target.value)
            }
          />
          <TextInput
            id="price"
            label={formatMessage(messages.price)}
            value={price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPrice(e.target.value)
            }
          />
        </ModalContent>
        <ModalFooter>
          <Button onClick={() => modal.hide()} variant="secondary">
            <FormattedMessage {...messages.cancel} />
          </Button>
          <Button
            onClick={() => {
              modal.hide()

              showToast({
                tone: 'positive',
                message: formatMessage(messages.confirmMessage),
                dismissible: true,
              })
            }}
          >
            <FormattedMessage {...messages.confirm} />
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default ProductCreation
