import React from 'react';
import numeral from 'numeral';
import { Link } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from  './product-item.module.css';

const ProductItem = ({ product }) => {
    return (
        <div className={styles.productItem}>
            <Link to={'/'+product.category.slug+'/'+product.slug}>
                <GatsbyImage 
                    image={product.image}
                    alt={product.title}
                    style={{margin: `0 0 0.25rem 0`}}
                />
                <p className={styles.productItem__text}>{product.title}</p>
                <p className={`${styles.productItem__text} ${styles.productItem__textLight}`}>
                    From {numeral(product.minPrice).format('$0,0.00')}
                </p>
            </Link>
        </div>
    )
}

export { ProductItem as default };