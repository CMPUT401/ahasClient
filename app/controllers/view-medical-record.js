import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
	    sideNotes(model){
            console.log(model.medID,model.patID);
        }
    }
});
