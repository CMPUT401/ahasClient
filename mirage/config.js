export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

   this.urlPrefix = 'https://ahas.herokuapp.com';    // make this `http://localhost:8080`, for example, if your API is on a different server
   this.namespace = '/api';    // make this `/api`, for example, if your API is namespaced
  //this.timing = 400;      // delay for each request, automatically set to 0 during testing

   // for user creation
   this.post('/signup', { success: true }, 201);

   //for the login
   this.post('/user_token' , {"jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9"});

   //this is for contact creation
   this.post('/contacts', { success: true }, 201);

   //this is for getting one contact
   this.get('/contacts/1', () => {
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
     contact_type: "Veterinarian"
   }
};
   }); 

   //this is for get all contacts
   this.get('/contacts', () => {
     return {
    success: true, 
    contacts: [ { "first_name": "Justin", "last_name": "Barclay", "id": 1, "contact_type": "Volunteer"}, { "first_name": "Simon", "last_name": "Cowell", "id": 2, "contact_type": "Volunteer"}, { "first_name": "Tony", "last_name": "Stark", "id": 3, "contact_type": "Veterinarian"}]
     };
   });

   //this is for get all patients
   this.get('/patients', () => {
     return {
    success: true, 
  patients: [ { first_name: "Chairman", last_name: "Meow", id: 1}]
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
  // this.namespace = 'https://ahas.herokuapp.com/api';

  // this.get('/client', 'new-client');
  //this is for getting one client
  this.get('/client', () =>{
    return {
      success: true,
      clients: [{
        firstName: "Johny",
        lastName: "Bravo",
        id: "1"
      }]
    };
  });

  this.get('client/1', ()=>{
    return{
      success: true,
      client: {
        id: 1,
        firstName: "Johny",
        lastName: "Bravo",
        address: "123 Office dr Edmonton, AB A6S 1F3",
        phoneNumber: "780-555-1122",
        email: "jbravo@email.ca",
        licos: "123",
        aish: "234",
        socialAssistance: "345",
        pets: "boby",
        notes: "don't say anything about his hair",
        created_at: "017-03-09T02:50:38.757Z",
        updated_at: "017-03-09T02:50:38.757Z",
        alternativeContactFirstName: "Bob",
        alternativeContactLastName: "Mackenzie",
        alternativeContactEmail: "bmackenzie@email.com",
        alternativeContactPhoneNumber: "780-555-2211",
        alternativeContact2ndPhone: "780-555-3321",
        alternativeContactAddress: "4142 Office ave Edmonton, AB V2F 4A1",
        patients: [{"id":40,"first_name":"Dinkle","last_name":"Burg"}]
      }
    };
  });



this.get('/patients/1/medical_records/1/notes/1', ()=>{
    return{
      success: true,
      notes: {
        id:1,
        body:"hey listen\njjj",
        initials:"jb",
        medical_record_id:1,
        created_at:"2017-03-09T19:43:59.816Z",
        updated_at:"2017-03-09T19:43:59.816Z"
      }
    };
});

//this is wrong/broken at the moment/ just wrong format
this.get('patients/1', ()=>{
    return{
      success: true,
       patient: {
         id: 1,
      clientLastName: 'Bobbertson',
	clientFirstName: 'Fred',
	clientAddress: '22554 48th Ave NW Edmonton Alberta, Canada',
	clientPhoneNumber: '666-666-6666',
	clientEmail: '123dd@5d5dd.ca',

	clientDocumentLICO: 'Confirmed',
	clientDocumentAISH: 'Confirmed',
	clientDocumentSA: 'Confirmed',
	clientNotes: 'Smells bad?',

	clientAlternativeCName: 'Jack',
	clientAlternativeCAddress: '12252 92nd Ave Edmonton, Alberta, Canada',
	clientAlternativeCPhone: '123-456-7890',
	clientAlternativeCSPhone: '999-999-9999',
	clientAlternativeCEmail: 'efijo@foji.cdoji'
       }
    };
});
}

