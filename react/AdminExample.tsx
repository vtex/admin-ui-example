import React from 'react'
// import { useRuntime } from 'vtex.render-runtime'
import { defineMessages, FormattedMessage } from 'react-intl'
import {
  createSystem,
  PageHeader,
  PageTitle,
  DataGrid,
  useDataGridState,
  PageActions,
  Button,
  DataView,
  DataViewControls,
  Search,
  useDataViewState,
  useSearchState,
} from '@vtex/admin-ui'

import { items } from './data'

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
  // const { navigate } = useRuntime()

  const view = useDataViewState()
  const search = useSearchState()

  const searchedItems = React.useMemo(() => {
    return items.filter((item) =>
      item.productName.toLowerCase().startsWith(
        // use the search debounced value to
        // filter the collection
        search.debouncedValue.toLocaleLowerCase()
      )
    )
  }, [search])

  const grid = useDataGridState({
    view,
    columns: [
      {
        id: 'productName',
        header: 'Product Name',
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
      },
    ],
    items: searchedItems,
    length: 5,
  })

  return (
    <ThemeProvider>
      <PageHeader>
        <PageTitle>
          <FormattedMessage {...messages.title} />
        </PageTitle>

        <PageActions>
          <Button variant="secondary">Edit</Button>
          <Button>Create</Button>
        </PageActions>
      </PageHeader>

      <div style={{ padding: '0 4rem' }}>
        <DataView state={view}>
          <DataViewControls>
            <Search id="search" placeholder="Search" state={search} />
          </DataViewControls>
          <DataGrid state={grid} />
        </DataView>
      </div>
    </ThemeProvider>
  )
}

export default AdminExample
