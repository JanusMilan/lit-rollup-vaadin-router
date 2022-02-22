
# Aufbau 
- Klasse 'AuthGuard' in 'auth-guards' ist für Authorization gemacht
- Klasse 'AuthorizationService' 


# Ablauf
- Aufruf mit http://localhost:8000/analytics
- Es wird 'analytics' gerendert und innerhalb diesen wird 'analytics-home' gerendert
- Im 'analytics-home' sind Anker 'a' 
  - Diesen enthalten die 'urlForPath' Methode um dynamisch einen PAth zum Auswahl zu erzeugen
  - <a href="${router.urlForPath(`/analytics/day`)}">Last Day</a>
  - Durch anklicken diesen Paths wird ein bestimmter 'analytics-period' geladen 
    - also statt 'analytics-home' wird gewählter 'analytics-period' geladen 


## Klasse 'AuthGuard'
- ist Klasse die im Router 'indet.ts' genutzt wird zu prüfen ob jemand in 'Analytics' darf  


## Klasse 'AuthorizationService' 
- Methode 'isAuthorized'  
  - für Zwecke der Authorization 
  - mit Promise.resolve() Methode nicht vertauschen mit 'Resolver.resolve()' Methode
    - returns a Promise object that is resolved with a given value. 
- getter und setter für Token
  - es wird 'localStorage' genutzt
- Die Klasse ist nicht fertig, es werden keine Tokens ins 'localStorage' gespeichert
- Da Authorization für 'Analytics' genutzt wird, 
  sollte DORT die Handhabe mit den Tokens geregelt werden???  