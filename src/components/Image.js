import React, { useMemo } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

const Image = ({ src, ...rest }) => {
  const data = useStaticQuery(graphql`
    query {
      images: allFile(filter: { internal: { mediaType: { regex: "/image/" } } }) {
        edges {
          node {
            relativePath
            extension
            publicURL
            childImageSharp {
              gatsbyImageData(
                placeholder: BLURRED
              )
            }
          }
        }
      }
    }
  `);

  const match = useMemo(() => data.images.edges.find(({ node }) => src === node.relativePath), [data, src]);

  if (!match) return null;

  const { node: { childImageSharp, publicURL, extension } = {} } = match;

  if (extension === 'svg' || !childImageSharp) {
    return <img src={publicURL} {...rest} />;
  }

  return <GatsbyImage image={childImageSharp.gatsbyImageData} {...rest} />;
};



export default Image;