import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({
	session: Ember.inject.service(),
	ajax: Ember.inject.service(),
	model(param){
		var self = this;
		clearFields(self);//clear the entryfields before setting them
		//ajax get request to populate field
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/client/' + param.clientID
			).then(function(data){
				console.log("data is " + JSON.stringify(data));
				Ember.run(function() {
				resolve({
					firstName: deserialFirstName(data.client),
					lastName: deserialLastName(data.client),
					phoneNumber: deserialPhoneNumber(data.client),
					email: deserialEmail(data.client),
					address: deserialAddress(data.client),

					licos: deserialLICOS(data.client),
					aish: deserialAISH(data.client),
					socialAssistance: deserialSA(data.client),
					
					created_at: deserialCreateAt(data.client),
					updated_at: deserialUpdatedAt(data.client),
					notes: deserialNotes(data.client),

					alternativeContactFirstName: deserialAltFirstName(data.client),
					alternativeContactLastName: deserialAltLastName(data.client),
					alternativeContactPhoneNumber: deserialAltPhoneNumber(data.client),
					alternativeContact2ndPhone: deserialAlt2ndPhone(data.client),
					alternativeContactAddress: deserialAltAddress(data.client),
					alternativeContactEmail: deserialAltEmail(data.client),

					clientID: deserialClientId(data.client),
					patients: deserialPatients(data.client.patients)
				});
			  });
			
			},
			function(data){
				if (data === false){
					if (self.get('session.isAuthenticated')){
					self.get('session').invalidate();
					}
				self.transitionTo('/login');
					console.log("status is " + JSON.stringify(data));
				}
		}));
		return ajaxGet;
	}
});


function clearFields(page){
	page.set('clientFirstName', '');
	page.set('clientLastName', '');
	page.set('clientAddress', '');
	page.set('clientPhone', '');
	page.set('clientEmail', '');
	page.set('clientLICO', '');
	page.set('clientAISH', '');
	page.set('clientAS', '');
	page.set('alternativeFirstName', '');
	page.set('alternativeLastName', '');
	page.set('alternativePrimaryPhone', '');
	page.set('alternativeAddress', '');
	page.set('clientNotes', '');
	page.set('alternativeSecondaryPhone', '');
	page.set('alternativeEmail', '');
}