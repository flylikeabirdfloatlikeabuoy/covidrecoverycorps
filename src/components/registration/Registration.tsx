import React from 'react'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

import useForm from '../useForm'
import {
  STUDY_ID,
  ENDPOINT,
  RegistrationData,
  LoginType,
} from '../../types/types'
import {
  callEndpoint,
  makePhone,
  sendSignInRequest,
} from '../../helpers/utility'
import Button from '@material-ui/core/Button/Button'
import TextField from '@material-ui/core/TextField/TextField'
import { Tabs, Tab } from '@material-ui/core'

type RegistrationProps = {
  onSuccessFn: Function
  onErrorFn: Function
}

const EMAIL_SIGN_IN_TRIGGER_ENDPOINT = '/v3/auth/email'
const PHONE_SIGN_IN_TRIGGER_ENDPOINT = '/v3/auth/phone'

export const Registration: React.FunctionComponent<RegistrationProps> = ({
  onSuccessFn,
  onErrorFn,
}: RegistrationProps) => {
  const stateSchema = {
 
    email: { value: '', error: '' },
    phone: { value: '', error: '' },
    registrationType: { value: 'EMAIL', error: '' },
  }

  const validationStateSchema = {
    //https://www.w3resource.com/javascript/form/email-validation.php
    email: {},
    phone: {
      validator: {
        regEx: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        error: 'Invalid Phone',
      },
    },
    registrationType: {},

  }

  const submitRegistration = async (registrationData: RegistrationData) => {
    const result = await callEndpoint(
      `${ENDPOINT}/v3/auth/signUp`,
      'POST',
      registrationData
    )
    //alert(JSON.stringify(result, null, 2))
    return result
  }

  async function onSubmitForm(state: any) {
    //alert(JSON.stringify(state, null, 2))

    //register
    const data: RegistrationData = {

      email: state.email.value,
      phone: state.phone.value ? makePhone(state.phone.value) : undefined,
      clientData: {},
      study: STUDY_ID,
      substudyIds: ["columbia"],
    }
    let loginType: LoginType = 'EMAIL'
    const endPoint = {
      PHONE: `${ENDPOINT}${PHONE_SIGN_IN_TRIGGER_ENDPOINT}`,
      EMAIL: `${ENDPOINT}${EMAIL_SIGN_IN_TRIGGER_ENDPOINT}`,
    }
    if (state.registrationType === 'EMAIL') {
      delete data.phone
      loginType = 'EMAIL'
    }
    if (!data.email) {
      delete data.email
      loginType = 'PHONE'
    }
    //send signinRequest
    const phoneOrEmail = data.email || data.phone?.number || ''
    const result = await submitRegistration(data)
    if (result.status === 201) {
      console.log('registered')
      const sentSigninRequest = await sendSignInRequest(
        loginType,
        phoneOrEmail,
        endPoint[loginType]
      )
      console.log('sent request')
      onSuccessFn(
        loginType,
        sentSigninRequest.status,
        sentSigninRequest.data,
        phoneOrEmail
      )
    } else {
      onErrorFn(result.status)
    }
  }

  const { state, handleOnChange, handleOnSubmit, disable } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm
  )
  const errorStyle = {
    color: 'red',
    fontSize: '13px',
  }

  return (
    <>
      <div id="Questions">
        <h1>We could use your help! </h1>
        <p>
          We are looking to build our community in New York first. Looks like
          you fit the bill. Now, let’s get you set up.
        </p>
        <hr></hr>
        <form className="demoForm" onSubmit={handleOnSubmit}>
        
      

          <div className="form-group">
            <label htmlFor="registrationType">
              How do you want to create your account?
            </label>

            <div className="tabbedField">
              <Tabs
                value={state.registrationType.value}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                onChange={(_e, value) =>
                  handleOnChange({
                    target: { name: 'registrationType', value: value },
                  })
                }
                aria-label="disabled tabs example"
              >
                <Tab label="EMAIL" value="EMAIL" />

                <Tab label="PHONE" value="PHONE" />
              </Tabs>

              {state.registrationType.value === 'EMAIL' && (
                <div className="input--padded">
                  <TextField
                    name="email"
                    type="email"
                    value={state.email.value}
                    aria-label="email"
                    onChange={handleOnChange}
                    variant="outlined"
                    label="Email"
                    fullWidth
                    autoComplete="email address"
                    placeholder="email address"
                  />
                </div>
              )}

              {state.registrationType.value === 'PHONE' && (
                <div className="input--padded">
                  <label htmlFor="phone">Phone</label>
                  <TextField
                    name="phone"
                    type="phone"
                    value={state.phone.value}
                    placeholder="phone"
                    aria-label="phone"
                    label="phone"
                    variant="outlined"
                    fullWidth
                    onChange={handleOnChange}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="text-center">
            <Button
              color="primary"
              variant="contained"
              size="large"
              type="submit"
              disabled={disable || (!state.email.value && !state.phone.value)}
            >
              Submit
            </Button>
          </div>
        </form>
        {Object.keys(state).map(
          (key) =>
            state[key].error && <p style={errorStyle}>{state[key].error}</p>
        )}
      </div>
    </>
  )
}

export default Registration
