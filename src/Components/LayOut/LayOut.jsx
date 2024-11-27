import React from 'react'
import Header from '../Header/Header'
import classes from './LayOut.module.css'

function LayOut({ children }) {
  return (
    <div >
      <Header />
      <main >{children}</main>
    </div>
  )
}

export default LayOut