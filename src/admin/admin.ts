
// http://localhost:8000/admin/profile?username=luixaviles

// Importieren 
import {
  PreventAndRedirectCommands,
  PreventResult,
  RedirectResult,
  Router,
  RouterLocation,
} from '@vaadin/router';
import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

// Vaadim Router 
import { router } from '../index';

/* 
  CE für Abwicklung der Router Life Cycle
*/
@customElement('lit-admin')
export class Admin extends LitElement {
  @property({ type: String }) username!: string;

  render() {

    return html`
      <h2>Admin</h2>
      <p>Welcome ${this.username}</p>
      <p>Only for authorized users</p>
      <!-- Navigation nach 'about', keine Einbinden -->
      <p>Go to <a href="${router.urlForPath('/about')}">About</a></p>
    `;
  }

  /* 
     Prüfen ob Admin Rechte vorhanden sind 
  */
  public onBeforeEnter(
    location: RouterLocation,
    commands: PreventAndRedirectCommands,
    router: Router
    // onBeforeEnter function returns a RedirectResult as a router command 
  ): Promise<unknown> | RedirectResult | undefined { // async action
    console.log('onBeforeEnter');
    // man kommt nie rein da 'isAuthorized()' immer true ist 
    if (!this.isAuthorized()) {
      // sync operation
        // return commands.redirect('/');
      // async operation
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('Not authorized, redirect to home page');
          //  Methode 'resolve' der Klasse Resolver
          //  'commands' Object und 'redirect' Methode des Routing config OBJEKTS (Array) 
          resolve(commands.redirect('/'));
        }, 2000);
      });
    }
    // console.log('You can see this page');
  }

  /* 
     Hier wird der 'name' und 'section' aus dem Path abgefangen und genutzt
     - process the URL params
     - http://localhost:8000/admin/profile?username=luixaviles
     - section = profile
     - username = luixaviles
  */
  public onAfterEnter(
    location: RouterLocation,
    commands: PreventAndRedirectCommands,
    router: Router
  ): void {
    console.log('onAfterEnter');
    // Read params from URL
    // Property 'params' der Klasse 'Router.Location'
    const section = location.params.section; // path: 'admin/:section'
    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/get
    // Property 'search' der Klasse 'Router.Location' 
    const username = new URLSearchParams(location.search).get('username');
    console.log('section', section);
    console.log('username', username);
    // Assign the username value from the URL
    this.username = username || 'user';
    // No need to return a result.
  }

  /* 
   Hier User abgefragt ob er sicher ist dass er Admin View verlassen will
   - function will be executed once the current path doesn't match anymore
   - hat means the page or component is about to be removed from the DOM.
   - wenn User nicht Admin verlassen will, 
     dann wird mit 'resolve(commands.prevent())' Navigation verhoindert  
   - http://localhost:8000/admin/profile?username=luixaviles   
  */
  public onBeforeLeave(
    location: RouterLocation,
    commands: PreventAndRedirectCommands,
    router: Router
  ): PreventResult | Promise<unknown> | undefined {
    console.log('onBeforeLeave');
    const leave = window.confirm('Are you sure to leave this page?');
    if (!leave) {
      // sync operation
        // return commands.prevent();
      // async operation
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('Ich bleibe doch im Admin Komponente');
          // 'resolve' Methode der Klasse Resolver 
          // 'commands' Object des routing config OBJEKTs (Klasse Router)
          //  Methode prevent() verhindert Komponenten Wechsel 
          resolve(commands.prevent());
        }, 2000);
      });
    }
  }

  /*
    Hier wird User NUR benachrachrichtig dass er View verlassen hat. 
    - http://localhost:8000/admin/profile?username=luixaviles
  */
  public onAfterLeave(
    location: RouterLocation,
    commands: PreventAndRedirectCommands,
    router: Router
  ): void {
    // es ist schon neue Route geladen
    console.log('neue View: ', location.route?.path); 
    // 'username' ist 'nul' da neue View geladen ist und alte ausgeladen
    // somit sind URL Parametars 'username=luixaviles' nicht mehr vorhanden
    console.log('URLSearchParams', new URLSearchParams(location.search).get('username')); // null
    console.log('onAfterLeave');
    alert('Just wanted to say goodbye!');
  }

  /* 
    Für 'onBeforeEnter' Funktion
  */
  private isAuthorized() {
    // Logic to determine if the current user can see this page
    return true;
  }
}
