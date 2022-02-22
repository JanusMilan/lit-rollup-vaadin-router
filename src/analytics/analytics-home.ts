import { LitElement, html, customElement, css } from 'lit-element';
import { router } from '../index';

@customElement('lit-analytics-home')
export class AnalyticsHome extends LitElement {
  render() {
    return html`
      <h3>Select a period</h3>
      <ul>
        <!-- Methode 'urlForPath' des Klasse Router generates a URL for the given route path -->
        <!-- So kann man Routen definieren vor Ort -->
        <li>
          <a href="${router.urlForPath(`/analytics/day`)}">Last Day</a>
        </li>
        <li>
          <a href="${router.urlForPath(`/analytics/week`)}">Last Week</a>
        </li>
        <li>
          <a href="${router.urlForPath(`/analytics/month`)}">Last Month</a>
        </li>
        <li>
          <a href="${router.urlForPath(`/analytics/year`)}">Last Year</a>
        </li>
      </ul>
    `;
  }
}
