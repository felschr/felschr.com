import * as React from "react"
import { graphql, PageProps } from "gatsby"
import Layout from "../../components/organisms/Layout"

const Blog = ({ data: { allMdx } }: PageProps<Queries.BlogQuery>) => {
  console.log("allMdx", allMdx)
  return (
    <Layout pageTitle="Blog">
      {allMdx.edges.map(({ node: post }) => (
        <a href={`//${location.host}/blog/${post.slug}`}>
          <h2>{post.frontmatter?.title}</h2>
        </a>
      ))}
    </Layout>
  )
}

export const query = graphql`
  query Blog {
    allMdx {
      edges {
        node {
          id
          slug
          frontmatter {
            title
            published
          }
        }
      }
    }
  }
`

export default Blog
