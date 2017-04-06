import Ember from 'ember';

export default Ember.Controller.extend({
	ajax: Ember.inject.service(),
	//queryParams: ['clientID'],
	session: Ember.inject.service(),
	actions: {
	submitNewPatient: function(model)
		{
			var self = this;
			console.log(model.id);
			var value= document.getElementById('value');
            var val = value.options[value.selectedIndex].text;
			let ajaxPost = this.get('ajax').request('/api/patients/'+model.id,
			{
				method: 'PATCH',
				type: 'application/json',
				data: { patient:
					{

					client: this.get('c_ID'),
					species: 	document.getElementById('patientSpecies').value,
					first_name: document.getElementById('patientFirstName').value,
					age: 		formatDate(document.getElementById('patientAge').value),
					colour: 	document.getElementById('patientColor').value,
					tattoo: 	document.getElementById('patientTatoo').value,
					microchip: 	document.getElementById('patientMicrochip').value,
					gender: 	val
				}
			}, 
		
			});
			ajaxPost.then(function(data){
				//console.log(this.c_ID);
				self.transitionToRoute('search-patient');
			},
			function(response){
				if (response === false){
					if (self.get('session.isAuthenticated')){
						self.get('session').invalidate();
					}
				self.transitionToRoute('/login');
			}
			});
		return ajaxPost;
	}
}
	
});

 /** 
		* used to format the date to we will send in request
        * converts from format in datepicker to unix time in seconds
		* @method   formatDate
        * @param {date} date the date to be formatted
		*/   

function formatDate(date){
  var half = new Date(date);
  var formatted = Math.floor(half.getTime() / 1000);
  return(formatted);
}
