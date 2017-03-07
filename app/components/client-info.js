import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['clientInfo'],
	actions: {
		showInfo: function(fName, lName, id){
			console.log(lName + ", "+ fName + ", " + id);
		}
	}
});
