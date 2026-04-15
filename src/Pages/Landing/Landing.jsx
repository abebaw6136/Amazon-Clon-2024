import React from 'react'
import LayOut from '../../Components/LayOut/LayOut';
import Carousel from '../../Components/Carousel/Carousel';
import Catagory from '../../Components/Catagory/Catagory';
import ProductList from '../../Components/Product/ProductList';


 function Landing() {
  return (
    <div>
       <LayOut>
            <Carousel />
           <Catagory/>
<ProductList title="Featured Products" limit={12} />
           
           </LayOut>

    </div>
  )
}
export default Landing;