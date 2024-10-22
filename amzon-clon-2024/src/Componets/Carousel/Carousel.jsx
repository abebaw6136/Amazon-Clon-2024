import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { img } from './img/data'; // Ensure this path is correct

function CarouselEffect() {
    return (
        <div>
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showIndicators={false}
                showThumbs={true}
            >
                {
                    img.map((imageItemLink, index) => {
                        return <img src={imageItemLink} alt={`Slide ${index}`} key={index} />; // Add alt and key
                    })
                }
            </Carousel>
        </div>
    );
}

export default CarouselEffect;