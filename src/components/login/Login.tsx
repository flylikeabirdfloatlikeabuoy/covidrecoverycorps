import React, { useState } from 'react'
import {
  EmailSigninParams,
  LoggedInUserData,
  SignInData,
  SignInDataPhone,
  SignInDataEmail,
  LoginType,
  Response,
  ENDPOINT,
} from '../../types/types'
import { callEndpoint, makePhone } from '../../helpers/utility'

import Button from '@material-ui/core/Button'
import SignInWithCode from './SignInWithCode'
import TextField from '@material-ui/core/TextField/TextField'

import { RouteComponentProps } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert/Alert'
import { Tabs, Tab } from '@material-ui/core'

export interface OwnLoginProps {
  redirectUrl?: string // will redirect here after a successful login. if unset, reload the current page url.
  callbackFn: Function // Callback is invoked after login
  //sessionName: string

  email?: string
  token?: string
  searchParams?: EmailSigninParams
}

export type LoginProps = OwnLoginProps & RouteComponentProps

const STUDY_ID = 'czi-coronavirus'
const EMAIL_SIGN_IN_TRIGGER_ENDPOINT = '/v3/auth/email'
const PHONE_SIGN_IN_TRIGGER_ENDPOINT = '/v3/auth/phone'
const EMAIL_SIGN_IN_ENDPOINT = '/v3/auth/email/signIn'

export const Login: React.FunctionComponent<LoginProps> = ({
  searchParams,
  callbackFn,
  history,
}: LoginProps) => {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const [error, setError] = useState('')
  const [isLinkSent, setIsLinkSent] = useState(false)
  const [loginType, setLoginType] = useState<LoginType>('EMAIL')
  const [isLoading, setIsLoading] = useState(true)

  //detect if they are bck on the page

  const handleLoggedIn = (loggedIn: Response<LoggedInUserData>) => {
    const consented = loggedIn.status !== 412
    if (loggedIn.ok || !consented) {
      callbackFn(loggedIn.data.sessionToken, loggedIn.data.firstName)
      if (consented) {
        history.push('/dashboard')
      } else {
        history.push('/consent')
      }
    } else {
      setError('Error ' + loggedIn.status)
    }
  }

  React.useEffect(() => {
    let isSubscribed = true
    const signInWithEmail = async (email: string, token: string) => {
      const postData = {
        study: STUDY_ID,
        email: email,
        token: token,
      }
      try {
        setError('')
        const loggedIn = await callEndpoint<LoggedInUserData>(
          `${ENDPOINT}${EMAIL_SIGN_IN_ENDPOINT}`,
          'POST',
          postData
        )
        if (isSubscribed) {
          handleLoggedIn(loggedIn)
        }
      } catch (e) {
        //alert(JSON.stringify(e, null, 2))
      } finally {
        setIsLoading(false)
      }
    }

    if (searchParams?.email) {
      const email = decodeURIComponent(searchParams.email)
      const token = decodeURIComponent(searchParams.token)
      signInWithEmail(email, token)
    } else {
      setIsLoading(false)
    }
    return () => {
      isSubscribed = false
    }
  }, [searchParams])

  /**
   * Handle user login on click
   *
   * @param {*} clickEvent Userclick event
   */

  const sendSignInRequest = async (
    _loginType: 'PHONE' | 'EMAIL',
    phoneOrEmail: string,
    endpoint: string
  ): Promise<any> => {
    let postData: SignInData
    setLoginType(_loginType)
    if (_loginType === 'PHONE') {
      postData = {
        study: STUDY_ID,
        phone: makePhone(phoneOrEmail),
      } as SignInDataPhone
    } else {
      postData = {
        study: STUDY_ID,
        email: email,
      } as SignInDataEmail
    }

    try {
      setError('')
      return callEndpoint<LoggedInUserData>(endpoint, 'POST', postData)
    } catch (e) {
      throw e
    }
  }

  const handleLogin = async (
    clickEvent: React.FormEvent<HTMLElement>
  ): Promise<any> => {
    let result
    clickEvent.preventDefault() // avoid page refresh

    try {
      setError('')
      if (loginType === 'PHONE' && phone) {
        result = await sendSignInRequest(
          'PHONE',
          phone,
          `${ENDPOINT}${PHONE_SIGN_IN_TRIGGER_ENDPOINT}`
        )
      } else if (loginType === 'EMAIL' && email) {
        result = await sendSignInRequest(
          'EMAIL',
          email,
          `${ENDPOINT}${EMAIL_SIGN_IN_TRIGGER_ENDPOINT}`
        )
      }
      setIsLinkSent(true)
    } catch (e) {
      setError(e.message)
      console.log('error ', result)
    }
  }

  return (
    <>
      {isLoading && (
        <div className="text-center">
          <span className="spinner"></span>
        </div>
      )}
      {!isLoading && (
        <div>
          {(!isLinkSent || error) && (
            <div>
              <h1 className="text-center margin-top-std">Log in</h1>
              <form onSubmit={handleLogin} className="form-group">
                <div className="form-group">
                  <label htmlFor="registrationType">
                    How would you like to log in?
                  </label>
                  <div className="tabbedField">
                    <Tabs
                      value={loginType}
                      indicatorColor="primary"
                      textColor="primary"
                      variant="fullWidth"
                      onChange={(_e, value) => setLoginType(value)}
                      aria-label="disabled tabs example"
                    >
                      <Tab label="EMAIL" value="EMAIL" />

                      <Tab label="PHONE" value="PHONE" />
                    </Tabs>

                    {loginType === 'EMAIL' && (
                      <div className="input--padded">
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          label="Email"
                          fullWidth
                          autoComplete="email address"
                          placeholder="email address"
                          name="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.currentTarget.value)}
                        />
                      </div>
                    )}

                    {loginType === 'PHONE' && (
                      <div className="input--padded">
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          autoComplete="phone"
                          placeholder="phone"
                          label="Phone"
                          fullWidth
                          name="phone"
                          type="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.currentTarget.value)}
                        />
                      </div>
                    )}
                    <div className="input--padded">
                      <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        type="submit"
                        fullWidth
                        disabled={!loginType}
                        onSubmit={handleLogin}
                      >
                        Log in
                      </Button>
                    </div>
                  </div>
                </div>
                {error && <Alert severity="error">{error}</Alert>}
              </form>
            </div>
          )}

          {isLinkSent && (
            <SignInWithCode
              loggedInByPhoneFn={(result: Response<LoggedInUserData>) =>
                handleLoggedIn(result)
              }
              phoneOrEmail={loginType === 'PHONE' ? phone : email}
              loginType={loginType!}
            ></SignInWithCode>
          )}
        </div>
      )}
    </>
  )
}

export default Login
