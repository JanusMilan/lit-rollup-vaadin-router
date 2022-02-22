import { LitElement, html, customElement, css } from 'lit-element';

/* 
  Haupt CE
  Aufruf mit: http://localhost:8000/analytics
*/

@customElement('lit-analytics')
export class Analytics extends LitElement {
  static styles = css`
    .container {
      margin: 20px;
    }
  `;

  render() {
    return html`
      <div class="container">
        <h2>Analytics</h2>
        <slot></slot>
      </div>
    `;
  }
}
