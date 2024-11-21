import React from 'react';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel'; // Import the carousel component
import { img } from './img/data'; // Import images data
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
                    img.map((imageItemLink) => (
                        <img key={imageItemLink} src=
                        {imageItemLink} alt="" />
                    ))
                }
            </ResponsiveCarousel>
        </div>
    );
}

export default Carousel;