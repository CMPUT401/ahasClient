export default function () {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  this.urlPrefix = 'https://ahas.herokuapp.com'; // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = '/api'; // make this `/api`, for example, if your API is namespaced
  //this.timing = 400;      // delay for each request, automatically set to 0 during testing

  // for user creation
  this.post('/signup', {
    success: true
  }, 201);

  this.post('patients/:id/medical_records', {
    success: true
  }, 201);

  //this is for viewing one medical record
  this.get('patients/:id/medical_records/:id', {
    success: true,
    medical_record: {
      id: 15,
      temperature: null,
      exam_notes: null,
      medications: null,
      eyes: null,
      oral: null,
      ears: null,
      glands: null,
      skin: null,
      abdomen: null,
      urogential: null,
      nervousSystem: null,
      musculoskeletal: null,
      cardiovascular: null,
      heart_rate: null,
      respiratory: null,
      respiratory_rate: null,
      attitudeBAR: true,
      attitudeQAR: false,
      attitudeDepressed: false,
      eyesN: false,
      eyesA: false,
      mmN: false,
      mmPale: false,
      mmJaundiced: false,
      mmTacky: false,
      earsN: false,
      earsA: false,
      earsEarMites: false,
      earsAU: false,
      earsAD: false,
      earsAS: false,
      glandsN: false,
      glandsA: false,
      skinN: false,
      skinA: false,
      abdomenN: false,
      abdomenA: false,
      urogentialN: false,
      urogentialA: false,
      nervousSystemN: false,
      nervousSystemA: false,
      musculoskeletalN: false,
      musculoskeletalA: false,
      cardiovascularN: false,
      cardiovascularA: false,
      respiratoryN: true,
      respiratoryA: true,
      created_at: new Date(),
      updated_at: "2017-03-10T06:35:47.841Z",
      patient_id: 1,
      summary: "fake summary",
      signature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAABECAYAAABatSq0AAAFcUlEQVR4Xu2dPasfRRSHn8TEJL6jhID4EQJ+ALVSUllYCaKgSR3sLEUEG0s7Ky3EQiwsFCxELfQDCAHBUlCQNAHF1/jG8e6fm3u9/7u7/9nZnZl9FlLkZubMzHPO/DIzO/fsCXxSCPwDfA88NNLIb8AZ4MTIehaXQFUEDPDd3XUTOJUgEorM7uytWQkBBWZ3R/3diUsKQ0Vmd/7WrIBAyuSoYHhZuxjboz+B04mtbETmCvB2oi2rS6AoAgrMbu74CziZsD063Opl4C0gVkW37dYla0mgPAIKzG4+idXLL8Cdu1XfWivsxqNfJgaruWUIGMjjuYcIxJ9YweR4pjjbydEvbUpgNAEFZhyyqbdG21qPs53YKumfcf6xdGEEDODhDrkGXJxx0vuGabhvLFkoAQVmuGNiWxQrmLj7MtejyMxF2nayEFBghmFd8lxEkRnmI0sVSECB6XdK6o3d/hb6Sygy/YwsUSABBabfKbE1+hm4q79o1hKKTFa8Gs9BQIE5nmqIS0mX3xSZHLNAm9kIKDDb0S557nKcw32FnW06aHhqAgrM0UT/6H7HqFQ+pYrf1PGpvcoJlDqBlsYaW6MQmcjZUupT2vatVE72a0ECCsz/4de0OgiRuQR8smAM2bQEthJQYA6i+RU4O+Nt3dTQ9DwmlaD1sxJQYA7irXHbUdOKK2swa7w8AgrMvk9qnqg1CmN5s8EeTU5AgdlHGpP0OeDdySnPYzD6/wTw6TzN2YoE+gkoMHuMcud46fdEeonazo/SR6yF4gkoMHt5dVvJveJN3+Kn3Lo6uHaBiSTbL3TZ6TbpKmuPAEWmdg821P81C8wHwFMVvZIeE3aRL/hco2Mbw8GyCxNYq8C0LC6bkHIls/Dksvl15nxdg7goMs7uIgiscQUTZy03gPuL8ED+TsyVqDz/SGyhOgJrE5i1XkiLcUdmvturi1A7XDWBNQlMzTd1U4MsMvLd4aFvKkbrjyWwFoFxm7D3JUrfLI2dIZZPIrAGgfkKeNj/vf+LE4U2abpYeSyBNQhMnD/Ebd3TY+E0Wr6FX4to1DXtDat1gXEyHR2zweVL4LH2QtoRlUSgZYFZ86FuX4y5Veoj5L9PQqBVgSk9afckzks04qvrRIBW7yfQosC80+V1aXFs/R4dXuJH4G4Pv4cDs+R4Aq1Nwg+BJ500gwPhp+6Lla3FwWAAFsxLoKXAaimvS16vH7TuecyctFfWVu0C8wXwyC0rltrHs1T4xXnM790XFZbqg+02SKD2CXkNuFjY96NrDJNYxYTInKqx8/a5XAK1C0y5ZOvq2XXgvGdXdTmtht4qMDV4aZ4+/gBcUGTmgb2WVhSYej39BvA08MDEW5u4oOhWqd64KKrnCswy7ngVeBZ4sMvRcrKnG3P5afNtpc+WwWKrrRGYK3Bb47ZtPJFz5U3g0W67cab7JErq+DdfPIg3Pd8CLwPvpxq1vgRyE1BgxhN+HbjaJXAaUnuTRS+SPn0DvAJ8PKSiZSRQOwEFZt+D7wGPA/ce4dQQicPpHuJn8Xo3svd/B3wEvFR7QNh/CUxJoFWBOQu8CDzf5YKJtyMhBvG7N5sn/n5P99G1zc+O+/halP8cuDSlA7QlgZYJtCowcRbyGvBMJyz3dZfxQnhuFZMQjbisdxn4umVHOzYJLEGgVYFZgqVtSkAChwgoMIaEBCSQjYACkw2thiUgAQXGGJCABLIRUGCyodWwBCSgwBgDEpBANgIKTDa0GpaABBQYY0ACEshGQIHJhlbDEpCAAmMMSEAC2QgoMNnQalgCElBgjAEJSCAbAQUmG1oNS0ACCowxIAEJZCOgwGRDq2EJSECBMQYkIIFsBBSYbGg1LAEJ/AsR6ZhFIBvwNwAAAABJRU5ErkJggg==",
      date: new Date(),
    },
    medications: [{
      med_type: "medicine",
      name: "med1",
      reminder: ""
    }, {
      med_type: "vaccine",
      name: "vac1",
      reminder: ""
    }]
  });


  //for the login
  this.post('/user_token', {
    "jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9"
  });

  //ontact creation
  this.post('/contacts', {
    success: true
  }, 201);

  //contact editing
  this.put('/contacts/:id', {
    success: true
  }, 201);

  //for getting one contact
  this.get('/contacts/:id', () => {
    return {
      success: true,
      contact: {
        first_name: "Justin",
        last_name: "Barclay",
        addressLine1: "116 St & 85 Ave",
        addressLine2: "T6G 2R3",
        addressLine3: "Edmonton",
        email: "fakejustin@ualberta.ca",
        phone_number: "555-555-5555",
        fax_number: "555-555-5556",
        contact_type: "Veterinarian",
        id: 1
      }
    };
  });

  //this is for get all contacts
  this.get('/contacts', () => {
    return {
      success: true,
      contacts: [{
        "first_name": "Justin",
        "last_name": "Barclay",
        "id": 1,
        "contact_type": "Volunteer"
      }, {
        "first_name": "Simon",
        "last_name": "Cowell",
        "id": 2,
        "contact_type": "Volunteer"
      }, {
        "first_name": "Tony",
        "last_name": "Stark",
        "id": 3,
        "contact_type": "Veterinarian"
      }]
    };
  });

  //this is for get all patients
  this.get('/patients', () => {
    return {
      success: true,
      patients: [{
        first_name: "Chairman",
        last_name: "Meow",
        id: 1
      }]
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

  // this.get('/client', 'new-client');
  //this is for getting one client
  this.get('/client', () => {
    return {
      success: true,
      clients: [{
        firstName: "Johny",
        lastName: "Bravo",
        id: "1"
      }]
    };
  });


  this.get('client/:id', () => {
    return {
      success: true,
      client: {
        id: 1,
        firstName: "Johny",
        lastName: "Bravo",
        addressLine1: "116 St & 85 Ave",
        addressLine2: "T6G 2R3",
        addressLine3: "Edmonton",
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
        alternativeContactAddressLine1: "4142 Office ave Edmonton, AB V2F 4A1",
        patients: [{
          "id": 40,
          "first_name": "Dinkle",
          "last_name": "Burg"
        }]
      }
    };
  });



  this.get('/patients/:id/medical_records/:id/notes/:id', () => {
    return {
      success: true,
      note: {
        id: 1,
        body: "hey listen\njjj",
        initials: "jb",
        medical_record_id: 1,
        created_at: "2017-03-09T19:43:59.816Z",
        updated_at: "2017-03-09T19:43:59.816Z"
      }
    };
  });

  //for getting all medical records for the chronological comoponent on the view patient page
  this.get('/patients/:id/medical_records', () => {
    return {
      success: true,
      medical_records: []
    };
  });

  //for getting one patient image
  this.get('/patients/:id/images/:id', () => {
    return {
      success: true,
      image: {
        name: "string",
        data: "string",
        picture_type: "lab_result",
        patient_id: "integer",
        date: "unix time",
      }
    };
  });

  //for getting multiple patient images
  this.get('/patients/:id/images', () => {
    return {
      success: true,
      images: [{
        name: "string",
        data: "string",
        picture_type: "lab_result",
        patient_id: "integer",
        date: "unix time",
      }]
    };
  });

  //for vaccine list in the component on view-patient page
  this.get('/patients/:id/medications', () => {
    return {
      success: true,
      medications: [{
          id: 1,
          name: "test vaccine",
          reminder: "",
          med_type: "Vaccine",
          medical_record_id: 1,
          created_at: "2017-02-02"
        },
        {
          id: 2,
          name: "other test vaccine",
          reminder: "",
          med_type: "Vaccine",
          medical_record_id: 2,
          created_at: "2017-02-02"

        },
        {
          id: 3,
          name: "test medicine",
          reminder: "",
          med_type: "Medicine",
          medical_record_id: 3,
          created_at: "2017-02-02"

        }
      ]
    };
  });

  this.get('patients/:id', () => {
    return {
      success: true,
      generalAlerts: [],
      medicationAlerts: [],
      patient: {
        portrait_id: 1,
        id: 1,
        first_name: '',
        last_name: '',
        species: '',
        dateOfBirth: 1,
        colour: '',
        tattoo: 2,
        microchip: 3,
        client_id: 1,
        sex: '',
        client: {
          firstName: 'Fred',
          lastName: 'Bobbertson',
          addressLine1: '',
          addressLine2: '',
          addressLine3: '',
          phoneNumber: '',
          email: '',
          licos: '',
          aish: '',
          socialAssistance: '',
          notes: '',
          alternativeContactFirstName: '',
          alternativeContactEmail: '',
          alternativeContactLastName: '',
          alternativeContactPhoneNumber: '',
          alternativeContact2ndPhone: '',
          alternativeContactAddressLine1: ''

        }
      }
    };
  });

  this.get('/admin/users', () => {
    return {
      success: true,
      users: [{
        id: 1,
        email: "jbarclay@ualberta.ca",
        name: "Justin Barclay"
      }, {
        id: 2,
        email: "knewbury@ualberta.ca",
        name: "Kristy Newbury"
      }, {
        id: 3,
        email: "bligh@ualberta.ca",
        name: "Mackenzie Bligh"
      }, {
        id: 4,
        email: "ehsueh@ualberta.ca",
        name: "Eric Hsueh"
      }, {
        id: 5,
        email: "lajeunesse@ualberta.ca",
        name: "Marc-Oliver Lajenuesse"
      }]
    };
  });

  this.post('/admin/invite', {
    success: true
  }, 201);

  this.delete('/admin/users/:id', {
    success: true
  }, 201);

  this.post('/admin/reset_password', {
    success: true
  }, 201);

this.get('/admin/users/:id', () => {
    return {
      success: true,
      user: {
        id: 3,
        email: "bligh@ualberta.ca",
        name: "Mackenzie Bligh"
      }
    };
  });

}


