import * as React from "react";
import { ReactNode } from "react";
import { GatsbyLinkProps, graphql, Link, PageProps } from "gatsby";
import Layout from "../../components/organisms/Layout";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

type PostProps = {
  size?: "normal" | "highlight";
  post: Queries.BlogQuery["allMdx"]["edges"][0]["node"];
};

const Post = ({ size = "normal", post }: PostProps) => {
  const PostLink = styled((props: { children: ReactNode }) => (
    <Link to={`/blog/${post.fields.slug}`} {...props} />
  ))`
    color: inherit;
    text-decoration: inherit;

    &:hover {
      opacity: 0.8;
    }
  `;

  const featuredImage = getImage(
    post.frontmatter?.featuredImage?.childImageSharp?.gatsbyImageData!
  );
  const isHighlight = size === "highlight";

  return (
    <Grid item xs={12} sm={isHighlight ? 12 : 6} md={isHighlight ? 12 : 4}>
      <Card>
        {featuredImage && (
          <CardMedia
            objectFit="contain"
            component={(props) => (
              <GatsbyImage
                image={featuredImage}
                alt={post.frontmatter?.featuredImageAlt ?? ""}
                {...props}
              />
            )}
          />
        )}
        <CardContent>
          <Typography variant="h5" gutterBottom>
            <PostLink>{post.frontmatter?.title}</PostLink>
          </Typography>

          <Typography fontStyle="normal" color="GrayText">
            <PostLink>{post.excerpt}</PostLink>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

const Blog = ({ data: { allMdx } }: PageProps<Queries.BlogQuery>) => {
  const [highlight, ...posts] = allMdx.edges;

  return (
    <Layout pageTitle="Blog">
      <Grid container spacing={2} alignItems="stretch">
        <Post size="highlight" post={highlight.node} />
        {posts.map(({ node: post }) => (
          <Post post={post} />
        ))}
      </Grid>
    </Layout>
  );
};

export const query = graphql`
  query Blog {
    allMdx(
      sort: { frontmatter: { published: DESC } }
      filter: {
        fields: { source: { eq: "posts" } }
        frontmatter: { published: { ne: "" } }
      }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 400)
          fields {
            slug
          }
          frontmatter {
            title
            published
            featuredImage {
              childImageSharp {
                gatsbyImageData(height: 200)
              }
            }
            featuredImageAlt
          }
        }
      }
    }
  }
`;

export default Blog;
