import React, { useMemo } from 'react';

const HtmlRenderer = ({ htmlContent }) => {
  const createMarkup = useMemo(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Lặp qua các phần tử và thuộc tính để tạo cấu trúc React
    const elements = Array.from(doc.body.childNodes).map((node, index) => {
      if (node.nodeType === 1) {
        const props = {};
        for (let i = 0; i < node.attributes.length; i++) {
          const attr = node.attributes[i];
          props[attr.name] = attr.value;
        }
        return React.createElement(node.tagName.toLowerCase(), { key: index, ...props });
      } else if (node.nodeType === 3) {
        return node.nodeValue;
      }
      return null;
    });

    return elements;
  }, [htmlContent]);

  return <div>{createMarkup}</div>;
};

export default HtmlRenderer;
