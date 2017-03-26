import Ember from 'ember';
 /**
* Controller for the new calendar page
* This shows all of the appointments scheduled and if one clicks on a 
* appointment, it will transition them to a view appointment page
* @class new-calendar Controller
*/
export default Ember.Controller.extend({
	actions: {
        clicked(event, jsEvent, view){
            //console.log(`${event.id} was clicked!`);
            //console.log(`${event.id}`);
            var appointmentid = `${event.id}`;
            //console.log(appointmentid);
			this.transitionToRoute("/view-appointment/" + appointmentid);
        }
    }
});