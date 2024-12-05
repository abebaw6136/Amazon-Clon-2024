import React from 'react'
import LayOut from '../../Components/LayOut/LayOut';
import Carousel from '../../Components/Carousel/Carousel';
import Catagory from '../../Components/Catagory/Catagory';
import Product from '../../Components/Product/Product';


 function Landing() {
  return (
    <div>
       <LayOut>
            <Carousel />
           <Catagory/>
           <Product />
           
           </LayOut>

    </div>
  )
}
export default Landing;