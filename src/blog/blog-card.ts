import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
// Interface mit Daten-Typ Definition 
import { Post } from './post';

@customElement('blog-card')
export class BlogCard extends LitElement {
  static styles = css`
    .blog-card {
      margin: 20px;
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
      background: white;
      border-radius: 5px;
      overflow: hidden;
      border-radius: 10px;
    }

    .blog-description {
      padding: 20px;
      background: white;
    }

    .blog-footer {
      text-align: right;
    }

    .blog-link {
      color: #008cba;
    }

    h1 {
      margin: 0;
      font-size: 1.5rem;
    }
    h2 {
      font-size: 1rem;
      font-weight: 300;
      color: #5e5e5e;
      margin-top: 5px;
    }
  `;

  // @property({ type: String }) postTitle?: string;
  // @property({ type: String }) author?: string;
  // @property({ type: String }) description?: string;

  // Dies passiert in 'blog-posts': 
  // im 'blog-card' wird Property 'post' die Wert 'post' zugeweisen
  @property({ type: Object }) post?: Post;

  render() {
    return html`
      <div class="blog-card">
        <div class="blog-description">
          <!-- daten werden aus 'post.ts' bezogen -->
          <!-- statt mit Variablen wird mit 'post?.title' gearbeitet  -->
          <h1>${this.post?.title}</h1>
          <h2>${this.post?.author}</h2>
          <p>${this.post?.description}</p>
          <p class="blog-footer">
            <!-- verankern Event Funktion in 'a' Element  -->
            <a class="blog-link" @click="${this.handleClick}">Read More</a>
          </p>
        </div>
      </div>
    `;
  }

  // Event Funktion fürs Navigieren in bestimmte 'post'
  public handleClick() {
    // dispachen (erstellen) CustomEvent, übergeben lokale Argument 'this.post'
    console.log("post:id", this.post?.id)
    this.dispatchEvent(
      // Definieren CustomEvent(readMore) und addEventListener('readMore') muss diesen übernehmen
      // es wird übergeben konkret angeklickte 'post:id' über 'detail: this.post'
      new CustomEvent('readMore', { detail: this.post, composed: true })
    );
  }
}
