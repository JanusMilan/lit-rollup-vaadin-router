
# 'lit-app' aus 'app.ts'
- 'lit-app' hat 'slot' für Einbindung von von Kindern:
  - 'lit-blog'
  - 'about'
  - 'analytics'
  - 'admin/:section'
- im 'index.ts' wird './app' NICHT asynchron geladen
  - es gibt keine Unterschied auch wenn er asynchron geladen wird
- im 'index.ts' hat er 'path: /' also root
- Schlussfolgerungen
  - 'lit-app' kann aber muss nicht asynchron geladen werden

# 'lit-blog' aus 'blog.ts'
- Kind von 'lit-app'
- 'lit-blog' hat 'slot' für Einbindung von Kindern:
  - 'lit-blog-post'
  - 'lit-blog-posts'
- im 'index.ts' wird './blog' asynchron geladen
  - es gibt keine Unterschied auch wenn er NICHT asynchron geladen wird
  - also gleiche Lage wie 'lit-app'
- 'lit-blog' wird IMMER zuerst in 'lit-blog-posts' weitergeleitet mit Parametarn:
  - path: ''
    - offensichtlich soll hier nichts passieren ausser Weiterleitung 
  - redirect: './blog/posts'
  - Dies ist logisch da zuerst alle Posts im 'lit-blog-posts' zur auswahl stehen
  - Erst nach dem Wahl einer Post wird in gewählte Post bzw. in 'lit-blog-post' navigiert 
- Schlussfolgerungen
  - 'lit-blog' wird IMMER automatisch in Kind 'lit-blog-posts' weitergeleitet
  - Nach Wahl der Post wird 'lit-blog-posts' durch 'lit-blog-post' ausgetauscht
  - 'lit-blog' kann aber muss nicht asynchron geladen werden

# 'lit-app' VS. 'lit-blog'
- beide haben Kinder
- beide könn aber mussen nicht asynchron geladen werden
- 'lit-app' hat kein bevorzugtes Kind und keien 'redirect'
- 'lit-blog' hat bevorzugtes Kind 'lit-blog-posts' und entsprächendes 'redirect'

# 'lit-blog-posts' aus 'blog-posts.ts'
- Kind von 'blog'
- beinhaltet drei 'blog-card' die ohne Routing mit 'map' eingebunden sind
- Wechsel/Verlassen von 'lit-blog-posts' auf 'lit-blog-post'
  - beim Anklicken bestimmte 'blog-card' wird in gewählte 'lit-blog-post' geführt 
  - dabi wird 'lit-blog-posts' verlassen 
    - dann beinhaltet 'lit-blog' statt 'lit-blog-posts' die 'lit-blog-post'
  - Navigation von 'lit-blog-posts' auf 'lit-blog-post' wird innerhalb 'lit-blog-posts' gemacht
    - mit 'Router.go(`/blog/posts/${post.id}`)' wird in bestimmte Post gewechselt
- Im 'index.ts' wird Navigation von 'lit-blog-posts' auf 'lit-blog-post' auch geregelt
- 'lit-blog-posts' MUSS asynchron geladen werden, sonst ist Seiten-Inhalt nicht sichtbar  
  - Grund könnte die interne Rendering drei 'blog-card' sein 
  - Link ist vorhanden aber Seiten-Inhalt ist nicht sichtbar
- Schlussfolgerungen
  - beinhaltet drei 'blog-card' die ohne Routing mit 'map' (keine Routing) eingebunden sind
  - 'lit-blog-posts' MUSS wegen interne Rendering drei 'blog-card' asynchron geladen werden
  - Navigation von 'lit-blog-posts' auf 'lit-blog-post' wird innerhalb 'lit-blog-posts' gemacht
  - 'lit-blog-posts' MUSS asynchron geladen werden, sonst ist Seiten-Inhalt nicht sichtbar  


# 'lit-blog-post' aus 'blog-post.ts'
- Kind von 'blog'
- beinhaltet nur Text
- wird statt 'lit-blog-posts' in 'lit-blog' eingebunden nach dem Wahl bestimmter Post
- wird geroutet 
  - sowohl über 'index.ts' mit path: 'posts/:id', 
  - als auch intern im 'lit-blog-posts' mit 'Router.go()'  
- 'lit-blog-post' MUSS asynchron geladen werden
- hat im 'index.ts' Path: 'path: 'posts/:id'
  - also kein Path 'post' sondern 'posts', da dies im 'lit-blog-posts' so festgelegt ist 
    - Router.go(`/blog/posts/${post.id}`)
    - ${post.id} wird über CustomEvent übergeben 
- Schlussfolgerungen
  -  Routing sowohl über 'index.ts' als auch intern im 'lit-blog-posts' mit 'Router.go()' 
  - 'lit-blog-post' MUSS asynchron geladen werden

# 'lit-blog-posts' VS. 'lit-blog-post'
- 'lit-blog-post' und 'lit-blog-posts' sind im 'index.ts' als Kinder von 'lit-blog' gleich gestellt 
  - sie sind NIE beide gleichzetig im 'lit-blog' 
- 'lit-blog-post' Routing sowohl über 'index.ts' als auch intern im 'lit-blog-posts' mit 'Router.go()'

# 'about' aus 'about.ts'
- Kind von 'lit-app'
- beinhaltet nur Text
- 'lit-blog-post' MUSS asynchron geladen werden

# 'admin' aus 'admin.ts'
- Kind von 'lit-app'
- 'admin' MUSS asynchron geladen werden
- Beispiel Aufruf: http://localhost:8000/admin/profile?username=luixaviles
- Per default wird angeboten die Wechsel nach 'about' im 'html' Tempel
  - <p>Go to <a href="${router.urlForPath('/about')}">About</a></p>
- 'index.ts'  
  - path: 'admin/:section'
    - also ist im 'index.ts'  Begriff 'section' festgelegt
      - so kann man es im 'admin' abrufen mit 'location.params.section'
      - 'section' besteht aus zwei Teilen: 'profile?username=luixaviles' getrennt durch '?'
        - http://localhost:8000/admin/profile?username=luixaviles
        - 'location.params.section' == 'profile'
        - 'new URLSearchParams(location.search).get('username') == username'
- Methoden  
  - Durch Interface WebComponent Methoden wird LifeCycle und Routing inntern in Klasse 'Admin' geregelt
    - Methode 'onBeforeEnter'   
      - Hier wird geprüft ob User berechtigt ist Admin View zu laden
        - wenn NEIN dann wird er umgeleitet/geroutet in Root mit 'resolve(commands.redirect('/')'
    - Methode 'onAfterEnter' nutzt Property 'params' der Klasse 'Router.Location'
      - Hier wird keine Routing/Navigation gemacht nur 'Router.Location' Parametar (name und section) abgefragt
    - Methode 'onBeforeLeave'
      - Hier wird geprüft ob User den Admin View wirklich verlassen will
        - Wenn NEIN dann wird Weiterleitung mit 'resolve(commands.prevent())' unterbrochen 
        - Hier wird keine Routing/Navigation gemacht sondern eventuell verhindert 
    - Methode 'onAfterLeave'     
      - Hier wird User NUR benachrachrichtig dass er View verlassen hat
      - Hier wird keine Routing/Navigation gemacht nur 
- Schlussfolgerungen
  - Wechsel von 'lit-app' in 'admin' geht NICHT über HTML Elemente wie 'a' 
    - sondern ÜBER URL: 'admin/profile?username=luixaviles'
    - im 'index.ts' ist Route 'admin/:section' festgelegt
  - Im 'admin' wird intern Routing gemacht mit
    - Umleitung mit: 'resolve(commands.redirect('/'))'
    - Verhinderung der Umleitung mit: 'resolve(commands.prevent())'


# 'analytics' aus 'analytics.ts'
- Kind von 'lit-app'
- Im 'index.ts' in 'action' wird die Authorization geprüft bzw. ob User 'analytics' sehen darf
  - 'new AuthGuard().pageEnabled(context, commands, '/blog')'
    - Implementierung 'AuthGuard' ist im 'shared\auth'
    - 'AuthGuard' dient für Authorization mit Tokens und 'localStorage'
- 'analytics' hat zwei Kinder
  - 'lit-analytics-home'
  - 'lit-analytics-period'
  - beide Kinder sind gleich gestellt im 'index.ts', Routing ist nicht im 'index.ts' geregelt
- 'analytics' hat 'slot' über den beide Kinder eingebunden sind

# Fragen
- wie weiss 'analytics'  welche von Kindern soll er laden??
- er hat nur 'slot' und importiert keine der Kinder Klassen
- Reihenfolge im 'index.ts' spielt keine Rolle, es wird immer 'analytics-home' eingebunden
- 'analytics-home'  hat im 'index.ts'
  - Path '/' was heißt Root und da 'analytics-home'  im 'analytics' ist 
    - muss mit '/' immer direkte Mutter 'analytics' gedacht werden und nicht 'lit-app'
- 'analytics-period'  hat im 'index.ts'
  - Path ':period'' welsches mit Router.Lokation geregelt werden
    - Also entweder über URL wie beim 'admin': http://localhost:8000/analytics/month
    - ODER mit href="${router.urlForPath(`/analytics/month`)} aus der 'analytics-home' 
- also sucht Router die Kinder die direkt anprächbar sind und bindet diese?!?
  - 'analytics-home' hat keine eigene Path sondern '/' von 'analytics' 
  - 'analytics-period' hat Path ':period' der nur über URL oder Router.Lokation 
     navigierbar ist und deswegen aknn nicht automatisch in 'analytics' eingebunden sein

# 'analytics-home' aus 'analytics-home.ts'
- Kind von 'analytics' 
- 'index.ts'
  - hat path '/'
    - es geht auch leere path '' 
    - Vermutlich ist path der Grund warum 'analytics-home' von 'analytics' eingebunden wird
- 'analytics-home' wird immer als erst gerufen werden und dann kann erst 'analytics-period' geladen werden
- Intern werden die Routen für alle 'analytics-period' definiert mit 
  - 'href="${router.urlForPath(`/analytics/month`)}"     
- Routen von 'analytics-home' und von 'analytics-period' wird im 'index.ts' geregelt 
- Technisch gesehen startet Routing duch anklicken von 'href="${router.urlForPath(`/analytics/month`)}"  
  -  

# 'analytics-period' aus 'analytics-period.ts'
- Kind von 'analytics'
- 'index.ts'
  - Path ':period'' welsches mit Router.Lokation geregelt werden
    - Also entweder über URL wie beim 'admin': http://localhost:8000/analytics/month
    - ODER mit href="${router.urlForPath(`/analytics/month`)} aus der 'analytics-home' 
- Kann nur aus dem 'analytics-home' gerufen werden und dann wird 'analytics-home' ausgeladen   
- ÄHNELT dem 'admin' im Bezug zur Deifinition im 'index.ts'
  - statt ':section' wurde path ':period' Begriff für Path genutz
    - Entsprächend wird dieser so angesprochen: 'location.params.period' 
  - ALLERDINGS hat 'admin' den Path 'admin/:section' UND 'analytics-period' NUR :period
    - weil so im 'analytics-home' festgelegt wurde:  href="${router.urlForPath(`/analytics/month`)}"
 
