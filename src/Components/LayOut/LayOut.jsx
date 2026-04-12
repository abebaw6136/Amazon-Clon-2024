import React from 'react'
import Footer from '../Footer/Footer.js'

 function LayOut({children}) {
  return (
    <div>
        {children}
        <Footer />
    </div>
  )
}
export default LayOut
