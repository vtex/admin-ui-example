import React from 'react'
import { defineMessages, FormattedMessage, useIntl } from 'react-intl'
import {
  Button,
  ModalDisclosure,
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  useModalState,
  Input,
  useToast,
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
  // ------
  // React Intl to retrieve direct strings
  const { formatMessage } = useIntl()

  // ------
  // Modal related config
  const modal = useModalState()
  const [productName, setProductName] = React.useState('')
  const [adjective, setAdjective] = React.useState('')
  const [price, setPrice] = React.useState('')

  // ------
  // Toast related config
  const showToast = useToast()

  return (
    <>
      <ModalDisclosure state={modal}>
        <Button>
          <FormattedMessage {...messages.modalTrigger} />
        </Button>
      </ModalDisclosure>
      <Modal aria-label="Product creation modal" state={modal}>
        <ModalHeader title={formatMessage(messages.modalHeader)} />
        <ModalContent>
          <Input
            id="productName"
            label={formatMessage(messages.productName)}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <Input
            id="adjective"
            label={formatMessage(messages.adjective)}
            value={adjective}
            onChange={(e) => setAdjective(e.target.value)}
          />
          <Input
            id="price"
            label={formatMessage(messages.price)}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
                type: 'success',
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
