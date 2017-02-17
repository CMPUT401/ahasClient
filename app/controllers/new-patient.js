import Ember from 'ember';

export default Ember.Controller.extend({
	ajax: Ember.inject.service(),
	action: {
		submitNewPatient(){
			self = this;
			let ajaxPost=this.get('ajax').post('/api/client',{
				type: 'application/json',
				data: {patient:{
					name: this.get('patientName')
				}}
			})
		}
	}
})