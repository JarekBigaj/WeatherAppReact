import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import LanguageSelectors from './components/LanguageSelectors'
import Navbar from './components/Navbar'
import { changeLanguage } from 'i18next'
import Status from './components/Status'
import i18n from './i18n'
import { CognitoUserSession } from 'amazon-cognito-identity-js'

const Layout = () => {

  return (
    <main className='App'>
        <Navbar/>
        <Outlet/>
    </main>
  )
}

export default Layout