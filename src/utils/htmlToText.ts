import React from 'react';
import parse from 'html-react-parser';

const collectText = (node: React.ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(collectText).join('');
  }

  if (React.isValidElement(node)) {
    return collectText(node.props.children);
  }

  return '';
};

export default function htmlToText(html: string): string {
  if (!html) {
    return '';
  }

  return collectText(parse(html));
}