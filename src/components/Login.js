import React from 'react'
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons'
import firebase from "firebase/app"
import {auth} from "../firebase"

function Login() {
    return (
        <div id='login-page'>
        <div id='login-card'>
          <h2>Welcome to S-Chat!</h2>
          <img src="images/summertime.svg" id="logo-login"/>
          <div
            className='login-button google'
            onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
          >
            <GoogleOutlined /> Sign In with Google
          </div>
        </div>
      </div>
    )
}

export default Login
