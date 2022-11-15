import React from "react"
import { graphql, Link as GatsbyLink, PageProps } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import Layout from "../../components/organisms/Layout"

import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";
import { Breadcrumbs, Link } from "@mui/material";
import { Box } from "@mui/system"
deckDeckGoHighlightElement();

const BlogPost = ({ data: { mdx }, path }: PageProps<Queries.BlogPostQuery>) => {
  const featuredImage = getImage(mdx?.frontmatter?.featuredImage?.childImageSharp?.gatsbyImageData!)

  return (
    <Layout
      pageTitle={mdx?.frontmatter?.title ?? ""}
      preTitle={
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
          {featuredImage && (
          <Box display="flex" justifyContent="center">
            <GatsbyImage
              image={featuredImage}
              alt={mdx?.frontmatter?.featuredImageAlt ?? ""}
            />
          </Box>
          )}
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
        featuredImage {
          childImageSharp {
            gatsbyImageData(width: 800)
          }
        }
        featuredImageAlt
      }
    }
  }
`

export default BlogPost
