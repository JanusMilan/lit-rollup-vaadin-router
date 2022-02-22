
# class Router
- https://vaadin.github.io/router/vaadin-router/#/classes/Router
- JavaScript class that renders different DOM content depending on a given path. 
- It can re-render when triggered or automatically on 'popstate' and / or 'click' events.
- simple client-side router for SPA.
- It uses express-style middleware and 
  has a first-class support for Web Components and lazy-loading. 
- Use 'new Router(outlet, options)' to create a new Router instance.
  - 'outlet' parameter is a reference to the DOM node to render the content into
  - 'options' (optional) mit parameter 'baseUrl' (initial value for the baseUrl property) 

## Properties
- baseUrl: 
  - The base URL for all routes in the router instance. 
- location:
  - Contains read-only information about the current router location: 
  - pathname, active routes, parameters
- ready: 
  - promise that is settled after the current render cycle completes  

## methoden
- go: HIER genutzt 
- setTriggers
- render: HIER genutzt 
- setRoutes: HIER genutzt 
- subscribe
- unsubscribe
- urlForPath

### Methode 'go(path)'
- Triggers navigation to a new path. 
- Returns true if at least one Router has handled the navigation (was subscribed and had baseUrl matching the path argument)
- HIER wird im 'blog-posts.ts' angewandt um dynamisch die gewählte Post zu navigieren 
  - Router.go(`/blog/posts/${post.id}`);

### Methode 'setRoutes(routes: (!Array.<!Route> | !Route),  skipRender: ?boolean)'
- Sets the routing config OBJEKT Array 'routes' (replacing the existing one) and 
- triggers a navigation event so that the router outlet is refreshed according 
  to the current window.location and the new routing config.
- corresponding route object is available inside the callback through 'this' reference  

#### routing config OBJEKT kann beinhalten Properties
  - 'path' 
    - the route path (relative to the parent route if any) in the express.js syntax.
    - Genutzt bei 'Index'
  - 'children' 
    - an array of nested routes that provides this array at the render time. 
    - Genutzt bei 'Index' 
  - 'action' 
    - action (synchronous or asynchronous) that is executed before the route is resolved. 
    - Genutzt bei 'Index'
  - 'redirect' 
    - other route's path to redirect to. 
    - GENUTZT bei 'Admin' und 'Index'context' object
    -  that is passed to action function holds the following properties
  - 'component' 
    - the tag name of the Web Component to resolve the route to. 
    - Genutzt bei 'Index'
- routing config OBJEKT kann beinhalten Objekte
  - '
       - pathname, search,..  
  - 'commands' object 
    - that is passed to action function has the following methods:
      - redirect(path)
        - Genutzt bei 'Admin' bei nicht Authorisierten Zugriff
      - routes
      - skipRender 

### subscribe(): void
- Subscribes this instance to navigation events on the window.
- beware of resource leaks: 
  - For as long as a router instance is subscribed to navigation events, 
    it won't be garbage collected.

### unsubscribe(): void
- Removes the subscription to navigation events created in the subscribe() method.

### urlForPath(path: !string, params: Params=): string
- Generates a URL for the given route path, 
  optionally performing substitution of parameters
  - path
    - string route path declared in express.js syntax.
  - params
    - Optional object with route path parameters   


## Beispiele
https://vaadin.github.io/router/vaadin-router/#/classes/Router/demos/demo/index.html



