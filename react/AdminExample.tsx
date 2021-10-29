import React from 'react'
import {
  createSystem,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  useTabState,
} from '@vtex/admin-ui'

import Make from './Make'
import GetRequest from './GetRequest'

const [ThemeProvider] = createSystem({
  key: 'unique-key-in-kebab-case',
})

function AdminExample() {
  const state = useTabState()

  return (
    <ThemeProvider>
      <Tabs state={state}>
        <TabList aria-label="Usage Tabs">
          <Tab id="1">Make Request</Tab>
          <Tab id="2">Get Request</Tab>
        </TabList>
        <TabPanel id="1" csx={{ padding: 3 }}>
          <Make />
        </TabPanel>
        <TabPanel id="2" csx={{ padding: 3 }}>
          <GetRequest />
        </TabPanel>
      </Tabs>
    </ThemeProvider>
  )
}

export default AdminExample
