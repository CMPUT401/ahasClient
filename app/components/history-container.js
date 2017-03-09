import Ember from 'ember';

export default Ember.Component.extend({
	chronoIsVisible: true,
	medicationIsVisible: false,
	actions: {
		showChronological: function(){
			console.log("show chrono");
			this.set('chronoIsVisible', true);
			this.set('medicationIsVisible', false);
		},
		showMedication: function(){
			console.log("shoe medication");
			this.set('chronoIsVisible', false);
			this.set('medicationIsVisible', true);
		}
	}
});
