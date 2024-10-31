import React from 'react';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel'; // Import the carousel component
import { img } from './img/data'; // Import images data
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

function Carousel() {
    return (
        <div>
            <ResponsiveCarousel
                autoPlay={true}
                infiniteLoop={true}
                showIndicators={true}
                showThumbs={false}
            >
                {
                    img.map((imageItemLink, index) => (
                        <img src={imageItemLink} alt={`Slide ${index}`} key={index} />
                    ))
                }
            </ResponsiveCarousel>
        </div>
    );
}

export default Carousel;

