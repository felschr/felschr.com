import React from "react"
import { graphql, Link as GatsbyLink, PageProps } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import Layout from "../../components/organisms/Layout"

import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";
import { Breadcrumbs, Link } from "@mui/material";
deckDeckGoHighlightElement();

const BlogPost = ({ data: { mdx }, path }: PageProps<Queries.BlogPostQuery>) => {
  return (
    <Layout
      pageTitle={
        <>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link
              underline="hover"
              color="inherit"
              to="/blog"
              component={GatsbyLink}
            >
              Blog
            </Link>
            <Link
              underline="hover"
              color="inherit"
              to={path}
              component={GatsbyLink}
            >
              {mdx?.frontmatter?.title}
            </Link>
          </Breadcrumbs>
          {mdx?.frontmatter?.title ?? ""}
        </>
      }
    >
      <MDXRenderer>
        {mdx?.body ?? ""}
      </MDXRenderer>
    </Layout>
  )
}

export const query = graphql`
  query BlogPost($id: String) {
    mdx(fields: { source: { eq: "posts" } }, id: { eq: $id }) {
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
