# classes/Router.Location
- https://vaadin.github.io/router/vaadin-router/#/classes/Router.Location
- Type declaration for the `router.location` property.
- Location describes the state of a router at a given point in time

# Location
- It is available for your application code in several ways
  - as the router.location property
  - as the location property set by Vaadin Router on every view Web Component
  - as the location argument passed by Vaadin Router into view Web Component lifecycle callbacks
  - as the event.detail.location of the global Vaadin Router events

# Properties
- baseUrl: string
  - The base URL used in the router. See the baseUrl property in the Router
- hash: !string
  - fragment identifier (including hash character) for the current page.
- params: !IndexedParams
  - A bag of key-value pairs with parameters for the current location. 
  - Named parameters are available by name
  - unnamed by index (/users/:id route :id parameter is available as location.params.id).
- pathname: !string
  - The pathname as entered in browser address bar. It always starts with a / (slash)   
  - /users/42/messages/12/edit. 
- redirectFrom: ?string (optional) 
  - original pathname string in case if this location is a result of a redirect.
- route: ?Route (optional) 
  - The route object associated with this Web Component instance.
- routes: !Array.<!Route>
  - A list of route objects that match the current pathname. 
- search: !string
  - The query string portion of the current url.
- searchParams: URLSearchParams
  - The query search parameters of the current url.

## Methode
- getUrl('params': Params=): string
  - Returns a URL corresponding to the route path and the parameters of this location
  - 'params' 
     - optional object with parameters to override. 

