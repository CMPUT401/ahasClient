import Ember from 'ember';

export default Ember.Component.extend({
	chronoIsVisible: false,
	actions: {
		showChronological: function(){
			console.log("show chrono");
			this.set('chronoIsVisible', true);
		}
	}
});
