import Ember from 'ember';
/**
* Controller for the  new side note page
* This shows all the side notes options for user to post to backend
* @class new side note Controller
*/
export default Ember.Controller.extend({
	
	//currently commented out because backend isn't implemented
	ajax: Ember.inject.service(),
	session: Ember.inject.service(),
	actions: 
	{
				/**
	* Controller for the submitnewnote
	* THis method does a post on the back end to create a new side note
	* @method submitNewNote()
	*/
		submitNewNote()
		{
			var self = this;
				let ajaxPost = this.get('ajax').request('/api/patients/'+this.get('p_ID')+'/medical_records/'+this.get('r_ID')+'/notes',
			{
				method: 'POST',
				type: 'application/json',
				data: { note:
					{
					medical_record_id: this.get('r_ID'),
					body: 	this.get('medNotes'),
					initials: 		this.get('medSignature'),
					is_alert: document.getElementById('isAlert').checked
				
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
				self.transitionTo('/login');
			}
			});
		return ajaxPost;
	}
}
	
});