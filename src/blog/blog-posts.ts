import { Router } from '@vaadin/router';
import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
/* Umgang mit Daten */
// Array von Objekten mit Daten-Typ 'Post'
import { POSTS } from './data';
// Interface mit Daten-Typ Definition 
import { Post } from './post';

/* 
  // synchron einfacher als asynchron ABER nicht sicher dass es rechtzeitig geladen ist 
  import './blog-card' 
*/

@customElement('lit-blog-posts')
export class BlogPosts extends LitElement {
  static styles = css`
    h2 {
      margin: 20px;
    }
  `;

  // Deklaration der Variable 'blogPosts' von typ 'Post[]' 
  @property({ type: Array }) blogPosts?: Post[];
  constructor() {
    super();
  }

  /* 
    um 'block-posts' mit 'block-card's zu abbilden 
  */
  render() {
    // zuerst asynchron importieren 'block-card'
    // ES GEHT AUCH OHNE EXPLIZITE IMPORT ÜBER EXTRA DATEI WIE INDEX.TS ????????
    this.loadBlogCard();
    return html`
      <h2>Blog Posts</h2>
       <!-- Die drei 'blog-card' werden in 'blog-card' gemapt -->
       <!-- im 'blog-card' wird Property 'post' die Wert 'post' zugeweisen, sodass 'blog-card' mit Daten befüllt wird -->
      ${this.blogPosts?.map(
        post => html`<blog-card .post="${post}"></blog-card>`
      )}
    `;
  }

  /* 
    Dient um aus dem Path "/blog/posts" in die Path '/blog/post:id' zu navigieren
  */
  firstUpdated() {
    // Zweisung der 'const' Array 'POSTS' zu Variable 'blogPosts'
    // die jetzt das gesammte 'data.ts' Ihalt beinhaltet
    this.blogPosts = POSTS;
    console.log("this.blogPosts", this.blogPosts)
    // EventListener fürs Navigieren in bestimmte 'post'
    // Auffangen CustomEvent wenn iregendein 'block-card' angeklickt wird
    this.addEventListener('readMore', event => {
      // die konkrete 'post' die im 'blog-card' angeklickt wurde 
      // und die von CustomEvent übergeben wurde 'as' Interface-Typ 'Post'
      const post = (event as CustomEvent).detail as Post;
      console.log("post", post)
      Router.go(`/blog/posts/${post.id}`);
    });
  }

  // zuerst asynchron importieren 'block-card'
  /* Dient um im Path "/blog/posts" die "<blog-card>" zu erstellen  */
  // asynchron laden 'blog-card'
  async loadBlogCard() {
    await import('./blog-card');
  }
}

/* 
 Aufruf Rheinefolge
 1. render 
 2. loadBlogCard (ist async)
 3. render 
 3. firstUpdated
 Warum 
 --> 'Render' wird zuerst gerufen
 --> 'Render' ruft async 'loadBlogCard'
 --> 'loadBlogCard' ist fertig und 'Render' läuft weiter 
 --> zuletzt kommt selbstaufrufende 'firstUpdated'
*/