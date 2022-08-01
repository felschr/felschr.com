import * as React from "react"
import { graphql, PageProps } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../../components/organisms/Layout"

import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";
deckDeckGoHighlightElement();

const BlogPost = ({ data: { mdx } }: PageProps<Queries.BlogPostQuery>) => {
  return (
    <Layout pageTitle={mdx?.frontmatter?.title ?? ""}>
      <MDXRenderer>
        {mdx?.body ?? ""}
      </MDXRenderer>
    </Layout>
  )
}

export const query = graphql`
  query BlogPost($id: String) {
    mdx(id: {eq: $id}) {
      id
      body
      frontmatter {
        title
        published
        updated
      }
    }
  }
`

export default BlogPost
