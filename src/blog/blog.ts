import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('lit-blog')
export class Blog extends LitElement {
  render() {
    // für Einbindung von: 'lit-blog-post', 'lit-blog-posts'
    return html` <slot></slot> `;
  }
}
