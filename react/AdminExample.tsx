import React from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { defineMessages, FormattedMessage, useIntl } from 'react-intl'
import {
  createSystem,
  DataGrid,
  DataView,
  DataViewControls,
  Flex,
  FlexSpacer,
  IconArrowDown,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  PageActions,
  PageHeader,
  PageTitle,
  Pagination,
  Search,
  ToastProvider,
  useDataGridState,
  useDataViewState,
  useMenuState,
  usePaginationState,
  useSearchState,
} from '@vtex/admin-ui'
import faker from 'faker'

import ProductCreation from './ProductCreation'

const NUMBER_OF_ITEMS = 45
const ITEMS_PER_PAGE = 10

const [ThemeProvider] = createSystem({
  key: 'admin-ui-example',
})

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

// ------
// Create fake data into an array with Faker
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
  // ------
  // Pull the navigation function from the runtime
  const { navigate } = useRuntime()

  // ------
  // React Intl to retrieve direct strings
  const { formatMessage } = useIntl()

  // ------
  // Datagrid config
  const view = useDataViewState()
  const search = useSearchState()
  const pagination = usePaginationState({
    pageSize: ITEMS_PER_PAGE,
    total: NUMBER_OF_ITEMS,
  })

  const searchedItems = React.useMemo(() => {
    return items.filter((item) => {
      const searchLowerCase = search.debouncedValue.toLocaleLowerCase()

      return item.productName.toLowerCase().includes(searchLowerCase)
    })
  }, [search])

  React.useEffect(() => {
    pagination.paginate({ type: 'setTotal', total: searchedItems.length })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedItems.length])

  const grid = useDataGridState({
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
            const state = useMenuState({})

            return (
              <Menu
                state={state}
                onClick={(
                  event: React.MouseEvent<HTMLDivElement, MouseEvent>
                ) => event.stopPropagation()}
              >
                <MenuButton
                  display="actions"
                  variant="secondary"
                  aria-label={formatMessage(messages.itemActionAriaLabel)}
                />
                <MenuList>
                  <MenuItem onClick={() => state.toggle()}>
                    <FormattedMessage {...messages.itemAction} />
                  </MenuItem>
                  <MenuItem tone="critical" onClick={() => state.toggle()}>
                    <FormattedMessage {...messages.itemDangerousAction} />
                  </MenuItem>
                </MenuList>
              </Menu>
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
        <PageHeader>
          <PageTitle>
            <FormattedMessage {...messages.title} />
          </PageTitle>

          <PageActions>
            <ProductCreation />
          </PageActions>
        </PageHeader>

        <div style={{ padding: '0 4rem' }}>
          <DataView state={view}>
            <DataViewControls>
              <Search id="search" placeholder="Search" state={search} />
              <FlexSpacer />
              <Pagination
                state={pagination}
                preposition="of"
                subject="results"
                prevLabel="Previous"
                nextLabel="Next"
              />
            </DataViewControls>
            <DataGrid state={grid} />
          </DataView>
        </div>
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
