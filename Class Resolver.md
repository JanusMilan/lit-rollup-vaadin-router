# classes/Resolver
- https://vaadin.github.io/router/vaadin-router/#/classes/Resolver

## Methoden
- getRoutes
- removeRoutes
- resolve: HIER genutzt 
- setRoutes

## Methode getRoutes(): !Array.<!Router.Route>
- Returns the current list of routes (as a shallow copy). 
- Adding / removing routes to / from returned array does not affect the routing config,  
- but modifying the 'route objects' does affect the routing config. 

## Methode removeRoutes(): void  
- Removes all existing routes from the routing config.

## Methode resolve(pathnameOrContext: (!string | !{pathname: !string})): !Promise.<any>
- Asynchronously resolves the given pathname, 
- i.e. finds all routes matching the pathname 
- tries resolving them one after another in the order they are listed 
- in the routes config until the first non-null result   

## Methode  setRoutes(routes: (!Array.<!Router.Route> | !Router.Route)): void
- Sets the routing config (replacing the existing one).
  - routes
    - a single route or an array of those (the array is shallow copied) 