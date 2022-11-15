import path from "path";
import type { GatsbyNode } from "gatsby"

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  /* createNodeId,
  createContentDigest, */
}) => {
  const { createPage } = actions

  const results = await graphql<any>(`
    query {
      allMdx {
        edges {
          node {
            slug
            fields {
              source
            }
          }
        }
      }
    }
  `)

  const allEdges: any[] = results.data.allMdx.edges

  const blogEdges = allEdges.filter(
    (edge) => edge.node.fields.source === "posts"
  )
  const pageEdges = allEdges.filter(
    (edge) => edge.node.fields.source === "pages"
  )

  blogEdges.forEach((edge, index) => {
    const previous =
      index === blogEdges.length - 1 ? null : blogEdges[index + 1].node
    const next = index === 0 ? null : blogEdges[index - 1].node

    createPage({
      path: `/blog/${edge.node.slug}`,
      component: path.resolve("./src/layouts/Post.tsx"),
      context: {
        slug: edge.node.slug,
        previous,
        next
      }
    })
  })

  pageEdges.forEach((edge, index) => {
    createPage({
      path: `/${edge.node.slug}`,
      component: path.resolve("./src/layouts/Page.tsx"),
      context: {
        slug: edge.node.slug
      }
    })
  })
}
