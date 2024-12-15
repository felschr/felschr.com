import path from "path";
import slugify from "@sindresorhus/slugify";

/**
 * @typedef {import('gatsby').GatsbyNode} GatsbyNode
 */

/** @type GatsbyNode["onCreateNode"] */
export const onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "Mdx") {
    createNodeField({
      node,
      name: "slug",
      value: slugify(node.frontmatter.title),
    });
  }
};

/** @type GatsbyNode["createPages"] */
export const createPages = async ({
  graphql,
  actions,
  /* createNodeId,
  createContentDigest, */
}) => {
  const { createPage, createRedirect } = actions;

  const results = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
              source
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `);

  /** @type any[] */
  const allEdges = results.data.allMdx.edges;

  const blogEdges = allEdges.filter(
    (edge) => edge.node.fields.source === "posts"
  );
  const pageEdges = allEdges.filter(
    (edge) => edge.node.fields.source === "pages"
  );

  blogEdges.forEach((edge, index) => {
    const previous =
      index === blogEdges.length - 1 ? null : blogEdges[index + 1].node;
    const next = index === 0 ? null : blogEdges[index - 1].node;

    createPage({
      path: `/blog/${edge.node.fields.slug}`,
      component: `${path.resolve("./src/layouts/Post.tsx")}?__contentFilePath=${
        edge.node.internal.contentFilePath
      }`,
      context: {
        id: edge.node.id,
        slug: edge.node.fields.slug,
        previous,
        next,
      },
    });
  });

  pageEdges.forEach((edge, index) => {
    createPage({
      path: `/${edge.node.fields.slug}`,
      component: path.resolve("./src/layouts/Page.tsx"),
      context: {
        id: edge.node.id,
        slug: edge.node.slug,
      },
    });
  });

  // redirects due to changed slugs
  createRedirect({
    fromPath: "/blog/nixos-restic-backups",
    toPath: "/blog/optimised-backups-on-nix-os-with-restic-and-fd/",
    isPermanent: true,
    redirectInBrowser: true,
  });
  createRedirect({
    fromPath: "/blog/nixos-restic-backups/",
    toPath: "/blog/optimised-backups-on-nix-os-with-restic-and-fd/",
    isPermanent: true,
    redirectInBrowser: true,
  });
};
