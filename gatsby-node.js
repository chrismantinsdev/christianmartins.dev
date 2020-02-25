const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/post.js`)
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            html
            frontmatter {
              date(formatString: "DD/MM")
              title
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const posts = result.data.allMarkdownRemark.edges
    posts.forEach(({ node }) => {
      const { frontmatter } = node

      createPage({
        path: `${frontmatter.path}`,
        component: blogPostTemplate,
        content: {
          path: `${frontmatter.path}`,
        },
      })
    })
  })
}
