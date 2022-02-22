# CustomEvent 
- https://blog.logrocket.com/custom-events-in-javascript-a-complete-guide/

## CustomEvent constructor
- custom event can be created using the CustomEvent constructor
- new CustomEvent('myevent', {  bubbles: true,   cancelable: true,   composed: false})    
- 

## Dispatching custom events 
- this.dispatchEvent(new CustomEvent('readMore', { detail: this.post, composed: true }) );
- document.querySelector("#someElement").dispatchEvent(myEvent);

## listen for the custom event
- this.addEventListener('readMore', event => {
      const post = (event as CustomEvent).detail as Post;
      Router.go(`/blog/posts/${post.id}`);
    });
- document.querySelector("#someElement").addEventListener("myevent", (event) => {
     console.log("I'm listening on a custom event");
   }); 

 ## verankern Event Funktion in 'a' Element 
 - <a class="blog-link" @click="${this.handleClick}">Read More</a>