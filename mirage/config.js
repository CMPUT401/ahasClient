export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

   this.urlPrefix = 'https://ahas.herokuapp.com';    // make this `http://localhost:8080`, for example, if your API is on a different server
   this.namespace = '/api';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

   this.post('/user_token' , { success: false }, 404);
   this.post('/signup', { success: true }, 201);
   this.put('/contacts/:id', { success: true }, 201);
   this.get('/contacts/:id', () => {
     return {
  success: true,
  contact: 
   {
     first_name: "Justin",
     last_name: "Barclay",
     address: "116 St & 85 Ave, Edmonton, AB T6G 2R3",
     email: "fakejustin@ualberta.ca",
     phone_number: "555-555-5555",
     fax_number: "555-555-5556",
     contact_type: "Veterinarian",
     id: 1
   }
};
   }); 

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
