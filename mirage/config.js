export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

   this.urlPrefix = 'https://ahas.herokuapp.com';    // make this `http://localhost:8080`, for example, if your API is on a different server
   this.namespace = '/api';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

   this.post('/user_token' , {"jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9"});
   this.post('/signup', { success: true }, 201);
   this.get('/contact/1', function(){
     return {
       data: [{
        type: 'person',
         attributes: {
            name: "Joe",
            email: "joe@gmail.ca",
            address: "123 st",
            phoneNumber: 123-123-1234,
            faxNumber: 123-321-1234
         }
       }]
     };
   }); //id for now TODO flexible?

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */
  this.namespace = 'https://ahas.herokuapp.com/api';

  this.get('/client', 'new-client');
  
}
