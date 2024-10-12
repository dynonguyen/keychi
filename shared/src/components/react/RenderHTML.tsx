import React from 'react';

export type RenderHTMLProps = {
  component?: React.ElementType;
  html: string;
} & React.HTMLAttributes<HTMLElement>;

/** Render HTML string. Not safe, make sure your string doesn't contain XSS, or dompurify first */
export const RenderHTML = (props: RenderHTMLProps) => {
  const { component: Component = 'div', html, ...others } = props;

  return <Component {...others} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default RenderHTML;
