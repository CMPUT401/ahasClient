import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin , {
     ajax: Ember.inject.service(),
       model(params) {
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/contacts/' + params.contact_id
			).then(function(data){
				console.log(JSON.stringify(data));
				Ember.run(function() {
       			 resolve({ 
						   first_name: JSON.stringify(data.contact.first_name).replace(/\"/g, ""),
						   last_name: JSON.stringify(data.contact.last_name).replace(/\"/g, ""),
						   phone_number: JSON.stringify(data.contact.phone_number).replace(/\"/g, ""),
						   email: JSON.stringify(data.contact.email).replace(/\"/g, ""),
						   fax_number: JSON.stringify(data.contact.fax_number).replace(/\"/g, ""),
						   address: JSON.stringify(data.contact.address).replace(/\"/g, ""),
						   id: JSON.stringify(data.contact.id).replace(/\"/g, ""),
                           veterinarian: checkVeterinarian(JSON.stringify(data.contact.contact_type).replace(/\"/g, "")),
                           volunteer: checkVolunteer(JSON.stringify(data.contact.contact_type).replace(/\"/g, "")),
                           laboratory: checkLaboratory(JSON.stringify(data.contact.contact_type).replace(/\"/g, "")),
                           technician: checkTechnician(JSON.stringify(data.contact.contact_type).replace(/\"/g, ""))				
				});
    		  });
			
			},
			function(response){
				if (response === false){
					if (self.get('session.isAuthenticated')){
						self.get('session').invalidate();
							}
					self.transitionToRoute('/unauthorized');
            }
		}));
		return(ajaxGet);
       }
});

function checkVeterinarian(contact){

    if(contact === 'Veterinarian'){

        return(true);

    }
    return(false);

}

function checkVolunteer(contact){

    if(contact === 'Volunteer'){

        return(true);

    }
    return(false);

}

function checkLaboratory(contact){

    if(contact === 'Laboratory'){

        return(true);

    }
    return(false);

}

function checkTechnician(contact){

    if(contact === 'Technician'){

        return(true);

    }
    return(false);

}