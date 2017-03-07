import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['clientInfo'],
	actions: {
		showInfo(fName, lName, id){
			console.log(lName + ", "+ fName + ", " + id);
		}
	}
});
