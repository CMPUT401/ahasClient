import Ember from 'ember';
 
export default Ember.Controller.extend({
	actions: {
        clicked(event, jsEvent, view){
            console.log(`${event.id} was clicked!`)
            // Prints: Hackathon was clicked! 
        }
    }
});