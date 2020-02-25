import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const DefaultPostPage = ({ data }) => {
  const { html, frontmatter } = data.markdownRemark

  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.date}</p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Link to="/">Home</Link>
    </Layout>
  )
}
export const pageQuery = graphql`
  query PostPage($path: String) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "DD/MM/YYYY", locale: "pt-BR")
        path
        title
      }
    }
  }
`

export default DefaultPostPage
