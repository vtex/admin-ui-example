import React from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { defineMessages, FormattedMessage } from 'react-intl'
import {
  createSystem,
  PageHeader,
  PageTitle,
  DataGrid,
  useDataGridState,
  PageActions,
  DataView,
  DataViewControls,
  Search,
  useDataViewState,
  useSearchState,
  usePaginationState,
  FlexSpacer,
  Pagination,
  ToastProvider,
} from '@vtex/admin-ui'
import faker from 'faker'

import ProductCreation from './ProductCreation'

interface Item {
  id: number
  inStock: number
  lastSale: string
  price: string
  productName: string
  productAdjective: string
  skus: number
}

const NUMBER_OF_ITEMS = 45
const ITEMS_PER_PAGE = 10

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
    ],
    items: searchedItems.slice(pagination.range[0] - 1, pagination.range[1]),
    length: ITEMS_PER_PAGE,
    onRowClick: (el: Item) => {
      navigate({
        page: 'admin.app.example-detail',
        params: { ...el },
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

export default AdminExample
