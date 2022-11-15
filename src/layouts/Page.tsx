import * as React from "react"
import { graphql, PageProps } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/organisms/Layout"

const Page = ({ data: { mdx }, path }: PageProps<Queries.PageQuery>) => (
  <Layout pageTitle={mdx?.frontmatter?.title ?? ""}>
    <MDXRenderer>
      {mdx?.body ?? ""}
    </MDXRenderer>
  </Layout>
)

export const query = graphql`
  query Page($id: String) {
    mdx(fields: { source: { eq: "pages" } }, id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`

export default Page
