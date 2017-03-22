import Ember from 'ember';
 
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