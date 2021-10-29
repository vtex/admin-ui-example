import React from 'react'
import {
  Button,
  Input,
  RadioGroup,
  Radio,
  Label,
  useRadioState,
} from '@vtex/admin-ui'

function Make() {
  const [email, setEmail] = React.useState('')
  const [dataOwnerEmail, setDataOwnerEmail] = React.useState('')
  const [vtexAccount, setVtexAccount] = React.useState('')
  const radio = useRadioState()

  const curl = () =>
    fetch('https://user-rights-beta.vtex.systems/createRetrieveUserData', {
      method: 'POST',
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: dataOwnerEmail,
        tenant: vtexAccount,
      }),
    })

  return (
    <div>
      <div style={{ width: '40%', margin: '30px auto' }}>
        <Input
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div style={{ width: '30%', margin: '30px auto' }}>
        <RadioGroup state={radio} id="radio-group">
          <Label>
            <Radio value="Create" state={radio} />
            Create Request
          </Label>
          <Label style={{ marginLeft: 'auto', marginRight: '0' }}>
            <Radio value="Delete" state={radio} />
            Delete Request
          </Label>
        </RadioGroup>
      </div>

      <div style={{ width: '40%', margin: '30px auto' }}>
        <Input
          id="dataOwnerEmail"
          label="Data owner's email"
          value={dataOwnerEmail}
          onChange={(e) => setDataOwnerEmail(e.target.value)}
        />
      </div>

      <div style={{ width: '40%', margin: '30px auto' }}>
        <Input
          id="vtexAccount"
          label="VTEX Account"
          value={vtexAccount}
          onChange={(e) => setVtexAccount(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', width: '20%', margin: '30px auto' }}>
        <Button onClick={curl}>Submit</Button>

        <Button
          style={{
            display: 'inline-block',
            marginLeft: 'auto',
            marginRight: '0',
          }}
          variant="danger"
        >
          Clear
        </Button>
      </div>
    </div>
  )
}

export default Make
