import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import Layout from "../components/organisms/Layout";

const mdxComponents = {};

const Page = ({
  data: { mdx },
  path,
  children,
}: PageProps<Queries.PageQuery>) => (
  <Layout pageTitle={mdx?.frontmatter?.title ?? ""}>
    <MDXProvider components={mdxComponents}>{children}</MDXProvider>
  </Layout>
);

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
`;

export default Page;
