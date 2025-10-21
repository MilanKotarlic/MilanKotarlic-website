import React from 'react'
import Header from '../shared/Header/Header'
import Footer from '../shared/Footer/Footer'
import './Layout.scss'

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="layout__content">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout