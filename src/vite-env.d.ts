/// <reference types="vite/client" />

// Add global declaration for the custom element
declare namespace JSX {
  interface IntrinsicElements {
    'rssapp-wall': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &amp; { id?: string };
  }
}
