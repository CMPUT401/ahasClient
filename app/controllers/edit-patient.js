import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
	submitNewPatient: function()
		{
			var self = this;
			var value= document.getElementById('value');
            var val = value.options[value.selectedIndex].text;
			let ajaxPost = this.get('ajax').request('/api/patients',
			{
				method: 'PATCH',
				type: 'application/json',
				data: { patient:
					{

					client: this.get('c_ID'),
					species: 	this.get('patientSpecies'),
					first_name: this.get('patientFirstName'),
					age: 		formatDate(document.getElementById('patientAge').value),
					colour: 	this.get('patientColor'),
					tattoo: 	this.get('patientTatoo'),
					microchip: 	this.get('patientMicrochip'),
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
