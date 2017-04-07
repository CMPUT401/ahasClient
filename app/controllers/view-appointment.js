import Ember from 'ember';
/**
* Controller for the view appointment page
* Does nothing inc ontroller
* @class view appointment controller
*/
export default Ember.Controller.extend({
	actions: 
	{
		/**
        * Does a post on the backend with the fields passed in
        * @method submitNewCalendar
        */
		editAppointment:function(a_id){
			this.transitionToRoute("edit-appointment/" +a_id);
		}
	}
});
