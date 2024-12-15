import React from "react";
import { graphql, Link as GatsbyLink, PageProps } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { MDXProvider } from "@mdx-js/react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Layout from "../components/organisms/Layout";

import { Breadcrumbs, Link } from "@mui/material";
import { Box } from "@mui/system";

const mdxComponents = {};

const BlogPost = ({
  data: { mdx },
  path,
  children,
}: PageProps<Queries.BlogPostQuery>) => {
  const featuredImage = getImage(
    mdx?.frontmatter?.featuredImage?.childImageSharp?.gatsbyImageData!
  );

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
      <MDXProvider components={mdxComponents}>{children}</MDXProvider>
    </Layout>
  );
};

export const query = graphql`
  query BlogPost($id: String) {
    mdx(fields: { source: { eq: "posts" } }, id: { eq: $id }) {
      id
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
`;

export default BlogPost;
