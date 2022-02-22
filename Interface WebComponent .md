
#  WebComponentInterface
https://vaadin.github.io/router/vaadin-router/#/classes/WebComponentInterface

- interface describes the lifecycle callbacks supported by Vaadin Router on view Web Components

## Methoden
- onBeforeEnter
- onBeforeLeave
- onAfterEnter
- onAfterLeave


### onBeforeEnter
- https://vaadin.github.io/router/vaadin-router/#/classes/WebComponentInterface#method-onBeforeEnter
- Method that gets executed before the outlet contents is updated with the new element
- Return values
  - commands.prevent() 
    - navigation is aborted and the outlet contents is not updated
  - commands.redirect(path) 
    - Router ends navigation to the current path
- HIER wird bei fehlenden Admin Rechten umgeleitet auf '/'

### onAfterEnter
- https://vaadin.github.io/router/vaadin-router/#/classes/WebComponentInterface#method-onAfterEnter
- Method that gets executed after the outlet contents is updated with new element.
- Method can be used to process the URL params or initialize the page
- Arguments:
  - location: the RouterLocation object
  - commands: empty object
  - router: the Router instance 
- http://localhost:8000/admin/profile?username=luixaviles
  - location.params.section == profile
  - new URLSearchParams(location.search).get('username') == luixaviles
- HIER wird 'location' genutzt um Path (section) und 'user' zu bestimmen 
  -  bzw. process the URL params 

### onBeforeLeave
- https://vaadin.github.io/router/vaadin-router/#/classes/WebComponentInterface#method-onBeforeLeave
- function will be executed once the current path doesn't match anymore
- hat means the page or component is about to be removed from the DOM.
- WIRD ausgeführt BEVOR Prozes des Entfenerns der aktullen CE angefangen hat
  - Also kann Aktion NOCH rückgängig gemacht werden 
- Arguments:
  - location: the RouterLocation object
  - commands: empty object
  - router: the Router instance 
- HIER wird geprüft ob User die Seite/Komponente verlassen will
  - Erst wenn User bestätgt wird neue Route genehmigt 
  - Andersum wird mit 'return commands.prevent()' ein Komponente Wechsel/Navigation verhindert

### onAfterLeave
- https://vaadin.github.io/router/vaadin-router/#/classes/WebComponentInterface#method-onAfterLeave
- Method that gets executed when user navigates away from the component that had defined the method, just before the element is to be removed from the DOM. 
- WIRD ausgeführt NACHDEM Prozes des Entfenerns der aktullen CE angefangen hat
  - Also kann Aktion NICHT rückgängig gemacht werden 
  - Also gegenteil von 'onBeforeLeave'
- Hier wird User NUR benachrachrichtig dass er View verlassen hat. 

