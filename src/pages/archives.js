import { graphql, Link } from "gatsby";
import React from "react";
import styled from "styled-components";

import Layout from "../components/Layout";
import Seo from "../components/seo";

const currentYear = new Date().getFullYear();
const yearList = [];
for (let year = currentYear; year >= 2019; year -= 1) {
  yearList.push(`${year}`);
}

const Heading = styled.h2`
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
`;
const PostLink = styled(Link)`
  text-decoration: none;
  color: #c1170c;
  &:hover {
    text-decoration: underline;
  }
`;

const Archives = ({ data }) => {
  return (
    <Layout>
      <Seo title="文章歸檔" pathname="archives" />
      <Heading>Archives</Heading>
      <p>目前總共有 {data.allMdx.totalCount} 篇文章 d(`･∀･)b</p>
      {yearList.map((year) => (
        <div key={year}>
          <h3>{year}</h3>
          <ul>
            {data.allMdx.nodes.map(
              (node) =>
                node.frontmatter.year === year && (
                  <li key={node.id} style={{ marginBottom: "0.25rem" }}>
                    <span>{node.frontmatter.month}</span>{" "}
                    <PostLink to={`${node.fields.slug}`}>
                      {node.frontmatter.title}
                    </PostLink>
                  </li>
                ),
            )}
          </ul>
        </div>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          month: date(formatString: "MMM")
          year: date(formatString: "YYYY")
        }
      }
      totalCount
    }
  }
`;

export default Archives;
