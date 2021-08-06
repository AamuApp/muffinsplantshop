import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout/layout';
import Seo from '../components/seo';

const About = ({ data, location }) => {
  return (
    <Layout location={location}>
      <Seo title="About" />
      <div style={{ display: `flex`, flexDirection: `column`, height: `50vh`, padding: `1rem` }}>
        <div style={{ flex: `1` }}>
          <div
            className="content-container"
            dangerouslySetInnerHTML={{ __html: data.pages.edges[0].node.html }} />
        </div>
      </div>
    </Layout>
  )
}

const query = graphql`
query {
    pages: allMarkdownRemark(filter: {frontmatter: {contentType: {eq: "page"}, page: {eq: "about"}}}) {
      edges {
        node {
          html
        }
      }
    }
  }
`

export { query }
export default About;