import * as React from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { defineMessages, FormattedMessage, useIntl } from 'react-intl'
import {
  createSystem,
  DataView,
  DataViewControls,
  Flex,
  FlexSpacer,
  IconArrowDown,
  Menu,
  MenuButton,
  MenuItem,
  Pagination,
  Search,
  ToastProvider,
  useDataViewState,
  useMenuState,
  usePaginationState,
  Page,
  PageHeader,
  PageHeaderTop,
  PageHeaderActions,
  PageHeaderTitle,
  PageContent,
  useTableState,
  Table,
  useSearchState,
} from '@vtex/admin-ui'
import * as faker from 'faker'

import ProductCreation from './ProductCreation'

const NUMBER_OF_ITEMS = 45
const ITEMS_PER_PAGE = 10

const [ThemeProvider] = createSystem()

const messages = defineMessages({
  title: {
    id: 'admin/admin-example.title',
  },
  itemId: {
    id: 'admin/admin-example.itemId',
  },
  itemAction: {
    id: 'admin/admin-example.item.action',
  },
  itemActionAriaLabel: {
    id: 'admin/admin-example.item.actions.ariaLabel',
  },
  itemDangerousAction: {
    id: 'admin/admin-example.item.dangerousAction',
  },
})

const items = Array(NUMBER_OF_ITEMS)
  .fill(NUMBER_OF_ITEMS)
  .map(() => {
    return {
      id: faker.unique(() => faker.datatype.number(1000)),
      productName: faker.commerce.productName(),
      productAdjective: faker.commerce.productAdjective(),
      lastSale: faker.date.past().toDateString(),
      price: faker.commerce.price(),
      inStock: faker.datatype.number(1000),
      skus: faker.datatype.number(10000),
    }
  })

function AdminExample() {
  const { navigate } = useRuntime()
  const { formatMessage } = useIntl()
  const state = useMenuState()
  const view = useDataViewState()
  const { getInputProps, debouncedValue } = useSearchState({})
  const pagination = usePaginationState({
    pageSize: ITEMS_PER_PAGE,
    total: NUMBER_OF_ITEMS,
  })

  const searchedItems = React.useMemo(() => {
    return items.filter((item) => {
      const searchLowerCase = debouncedValue.toLocaleLowerCase()

      return item.productName.toLowerCase().includes(searchLowerCase)
    })
  }, [debouncedValue])

  React.useEffect(() => {
    pagination.paginate({ type: 'setTotal', total: searchedItems.length })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedItems.length])

  const table = useTableState({
    view,
    columns: [
      {
        id: 'productName',
        header: 'Product Name',
      },
      {
        id: 'productAdjective',
        header: 'Adjective',
      },
      {
        id: 'lastSale',
        header: 'Last Sale',
      },
      {
        id: 'inStock',
        header: 'In Stock',
        resolver: {
          type: 'root',
          render: function Render({ item }) {
            const isLow = item.inStock < 200

            return (
              <Flex>
                {item.inStock} {isLow && <IconArrowDown />}
              </Flex>
            )
          },
        },
      },
      {
        id: 'skus',
        header: 'SKUs',
      },
      {
        id: 'price',
        header: 'Price',
        resolver: {
          type: 'currency',
          locale: 'en-US',
          currency: 'USD',
        },
      },
      {
        id: 'menu',
        resolver: {
          type: 'root',
          render: function Render(_props) {
            const menuState = useMenuState()

            return (
              <>
                <MenuButton
                  variant="secondary"
                  aria-label={formatMessage(messages.itemActionAriaLabel)}
                  state={menuState}
                  labelHidden
                />
                <Menu
                  state={state}
                  onClick={(
                    event: React.MouseEvent<HTMLDivElement, MouseEvent>
                  ) => event.stopPropagation()}
                >
                  <MenuItem
                    onClick={() => state.toggle()}
                    label={<FormattedMessage {...messages.itemAction} />}
                  />
                  <MenuItem
                    onClick={() => state.toggle()}
                    label={
                      <FormattedMessage {...messages.itemDangerousAction} />
                    }
                  />
                </Menu>
              </>
            )
          },
        },
      },
    ],
    items: searchedItems.slice(pagination.range[0] - 1, pagination.range[1]),
    length: ITEMS_PER_PAGE,
    onRowClick: (el: Item) => {
      navigate({
        page: 'admin.app.example-detail',
        params: { id: el.id },
      })
    },
  })

  return (
    <ThemeProvider>
      <ToastProvider>
        <Page>
          <PageHeader>
            <PageHeaderTop>
              <PageHeaderTitle>
                <FormattedMessage {...messages.title} />
              </PageHeaderTitle>
              <PageHeaderActions>
                <ProductCreation />
              </PageHeaderActions>
            </PageHeaderTop>
          </PageHeader>
          <PageContent>
            <DataView state={view}>
              <DataViewControls>
                <Search {...getInputProps()} />
                <FlexSpacer />
                <Pagination
                  state={pagination}
                  subject="results"
                  prevLabel="Previous"
                  nextLabel="Next"
                />
              </DataViewControls>
              <Table state={table} />
            </DataView>
          </PageContent>
        </Page>
      </ToastProvider>
    </ThemeProvider>
  )
}

interface Item {
  id: number
  inStock: number
  lastSale: string
  price: string
  productName: string
  productAdjective: string
  skus: number
}

export default AdminExample
