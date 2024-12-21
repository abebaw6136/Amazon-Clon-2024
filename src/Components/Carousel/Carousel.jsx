import React from 'react';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import { img } from './img/data'; // Import images data
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from './Carousel.module.css';

function Carousel() {
    return (
        <div className={classes.carouselContainer}>
            <ResponsiveCarousel
                autoPlay={true}
                infiniteLoop={true}
                showIndicators={true}
                showThumbs={false}
                showStatus={false}
                interval={3000}
            >
                {
                    img.map((imageItemLink) => (
                        <div className={classes.hero_img} key={imageItemLink}>
                            <img
                                src={imageItemLink}
                                alt={`Image description for ${imageItemLink}`}
                                onError={(e) => { e.target.src = 'path/to/fallback/image.jpg'; }}
                            />
                            <div className={classes.overlay}></div>
                        </div>
                    ))
                }
            </ResponsiveCarousel>
        </div>
    );
}

export default Carousel;