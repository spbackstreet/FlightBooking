import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const MyImage = ( {image} ) => {
    return(
    <div className="img_pic">
        <LazyLoadImage
            effect="blur"
            // alt={image.alt}
            // height={image.height}
            src={image.src}
            width="92"
        />
        <span>{image.caption}</span>
    </div>
    )
}
export default React.memo(MyImage);