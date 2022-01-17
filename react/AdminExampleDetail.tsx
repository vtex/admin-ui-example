import React from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { defineMessages, FormattedMessage } from 'react-intl'
import {
  ToastProvider,
  Card,
  Checkbox,
  createSystem,
  Dropdown,
  Flex,
  Input,
  PageHeader,
  PageTitle,
  useCheckboxState,
  useDropdownState,
  FlexSpacer,
  Text,
  Label,
} from '@vtex/admin-ui'

import DetailsFooter from './DetailsFooter'

const [ThemeProvider] = createSystem({
  key: 'admin-ui-example-details',
})

const messages = defineMessages({
  title: {
    id: 'admin/admin-example.details.title',
  },
  params: {
    id: 'admin/admin-example.details.params',
  },
})

const cardStyles = { marginBottom: '2rem' }
const propContainerStyles = { marginBottom: '1.4rem' }

function AdminExampleDetail({ params: { id } }: Props) {
  // ------
  // Pull the navigation function from the runtime
  const { navigate } = useRuntime()

  // ------
  // Dropdowns config
  const recipes = ['Latte', 'Espresso', 'Irish Coffee']
  const recipesState = useDropdownState({
    items: recipes,
    initialSelectedItem: 'Chemex',
  })

  const units = ['un', 'kg', 'g', 'mg', 'm', 'm²', 'm³', 'cm', 'cm²', 'cm³']
  const unitsState = useDropdownState({
    items: units,
    initialSelectedItem: 'un',
  })

  // ------
  // Checkbox config
  const state = useCheckboxState({ state: false })

  // ------
  // Input config
  const [value, setValue] = React.useState('')
  const [eanupc, setEanupc] = React.useState('')

  return (
    <ThemeProvider>
      <ToastProvider>
        <Flex
          direction="column"
          justify="center"
          csx={{ backgroundColor: 'rgb(248, 249, 250)' }}
        >
          <PageHeader
            onPopNavigation={() =>
              navigate({
                page: 'admin.app.example',
              })
            }
          >
            <PageTitle>
              <FormattedMessage {...messages.title} values={{ id }} />
            </PageTitle>
          </PageHeader>

          <Flex justify="center">
            <div
              style={{
                padding: '4rem',
                maxWidth: '900px',
                width: '100%',
              }}
            >
              <Card csx={cardStyles}>
                <Flex csx={propContainerStyles}>
                  <Text>Name</Text>
                  <FlexSpacer />
                  <Text>TALK CADEIRA</Text>
                </Flex>
                <Flex csx={propContainerStyles}>
                  <Text>Reference Code</Text>
                  <FlexSpacer />
                  <Text>1397</Text>
                </Flex>
                <Flex>
                  <Text>EAN/UPC</Text>
                  <FlexSpacer />
                  <Input
                    id="EANUPC"
                    label="EAN/UPC"
                    value={eanupc}
                    onChange={(e) => setEanupc(e.target.value)}
                  />
                </Flex>
              </Card>

              <Card csx={cardStyles}>
                <Flex csx={propContainerStyles}>
                  <Text>Shipment weight*:</Text>
                  <FlexSpacer />
                  <Text>5,62</Text>
                </Flex>
                <Flex csx={propContainerStyles}>
                  <Text>Shipment height*:</Text>
                  <FlexSpacer />
                  <Text>81,00</Text>
                </Flex>
                <Flex csx={propContainerStyles}>
                  <Text>Shipment width*:</Text>
                  <FlexSpacer />
                  <Text>52,00</Text>
                </Flex>
                <Flex csx={propContainerStyles}>
                  <Text>Shipment length*:</Text>
                  <FlexSpacer />
                  <Text>50,00</Text>
                </Flex>
                <Flex csx={propContainerStyles}>
                  <Text>Real weight: </Text>
                  <FlexSpacer />
                  <Text>5,62</Text>
                </Flex>
                <Flex csx={propContainerStyles}>
                  <Text>Real height: </Text>
                  <FlexSpacer />
                  <Text>81,00</Text>
                </Flex>
                <Flex csx={propContainerStyles}>
                  <Text>Real width: </Text>
                  <FlexSpacer />
                  <Text>52,00</Text>
                </Flex>
                <Flex>
                  <Text>Real length: </Text>
                  <FlexSpacer />
                  <Text>50,00</Text>
                </Flex>
              </Card>

              <Card csx={cardStyles}>
                <Flex csx={propContainerStyles}>
                  <Text>Commercial Condition Code:</Text>
                  <FlexSpacer />
                  <Dropdown
                    variant="tertiary"
                    items={recipes}
                    state={recipesState}
                    label="Recipes"
                  />
                </Flex>

                <Flex csx={propContainerStyles}>
                  <Text>Measurement Unit</Text>
                  <FlexSpacer />
                  <Dropdown
                    variant="tertiary"
                    items={units}
                    state={unitsState}
                    label="Recipes"
                  />
                </Flex>

                <Flex csx={propContainerStyles}>
                  <Label csx={{ width: '100%' }}>
                    <Flex>
                      <span>Activate SKU if possible?</span>
                      <FlexSpacer />
                      <Checkbox aria-label="activate sku?" state={state} />
                    </Flex>
                  </Label>
                </Flex>

                <Flex csx={propContainerStyles}>
                  <Label csx={{ width: '100%' }}>
                    <Flex>
                      <span>SKU Activated?</span>
                      <FlexSpacer />
                      <Checkbox
                        aria-label="sku activated?"
                        state={{ state: true }}
                        disabled
                      />
                    </Flex>
                  </Label>
                </Flex>

                <Flex>
                  <Text>Manufacturer Code</Text>
                  <FlexSpacer />
                  <Input
                    id="manufacturerCode"
                    label="Meaningful label"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </Flex>
              </Card>

              <DetailsFooter />
            </div>
          </Flex>
        </Flex>
      </ToastProvider>
    </ThemeProvider>
  )
}

interface Props {
  params: ProductParams
}

interface ProductParams {
  id: string
}

export default AdminExampleDetail
