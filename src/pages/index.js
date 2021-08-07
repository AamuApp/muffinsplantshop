import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout/layout';
import Seo from '../components/seo';
import ProductItem from '../components/product-item/product-item';
import * as styles from  './styles/home.module.css';
import { minPrice as _minPrice } from '../helpers/helpers';

const Home = ({ data, location }) => {
    return (
        <Layout location={location}>
            <Seo title="Shop Demo" />
            <div className={styles.home__cta}>
                <div className={styles.home__ctaText}>
                    <h2>Plants Are Like Muffins</h2>
                    <p>But for your soul</p>
                </div>
                <Link
                    className={styles.home__ctaButton}
                    to="/shop">
                    Shop Plants
                </Link>
            </div>
            <div className="content-container">
                <h2 className="heading-first">Easy to grow</h2>
                <div className={styles.home__contentGrid}>
                    {data.aamu.ProductCollection.map((node) => {
                        return (
                            <ProductItem
                                key={node.id}
                                product={{
                                    slug: node.slug,
                                    image: node.image.image.childImageSharp.gatsbyImageData,
                                    title: node.title,
                                    category: node.category,
                                    minPrice: _minPrice(node.variants)
                                }} />
                        )
                    })}
                </div>
            </div>
            <div className="content-container">
                <div className={styles.home__about}>
                    <div>
                        <h2 className="heading-first">Muffins?</h2>
                        <p>No muffins are available for purchase, but we certainly like to eat muffins here. We deliver plants in the Greater Ottawa Area</p>
                    </div>
                    <div className={styles.home__aboutAdditional}>
                        <h3>About Muffin's Plants</h3>
                        <div 
                            dangerouslySetInnerHTML={{__html: data.about.edges[0].node.html}} />
                    </div>
                </div>
            </div>

        </Layout>
    )
}

const query = graphql`
  query {
    aamu {
        ProductCollection(pagination: {limit: 4}) {
            id
            slug
            created
            updated
            title
            description
            image {
                url
                image {
                  id
                  childImageSharp {
                    gatsbyImageData(layout: CONSTRAINED)
                  }
                }                
            }
            variants {
                id
                created
                updated
                title
                price
                available
            }
            category {
                id
                slug
                created
                updated
                title
            }
            plantCare {
                id
                created
                updated
                light
                water
            }
        }
    }

  about: allMarkdownRemark(filter: {frontmatter: {contentType: {eq: "page"}, page: {eq: "about"}}}) {
    edges {
      node {
        html
      }
    }
  }
}
`

export { query };
export default Home;
