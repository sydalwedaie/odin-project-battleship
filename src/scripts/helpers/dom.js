// DOM helpers

export function generateDOM(htmlString) {
  return document.createRange().createContextualFragment(htmlString);
}

export const html = String.raw;

export const $ = (selector, root = document) => {
  return root.querySelector(selector);
};
