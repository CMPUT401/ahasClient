import DS from 'ember-data';

export default DS.Model.extend({
	clientName: attr('string');
	clientAddress: attr('string');
	clientPhone: attr('string');
	clientEmail: attr('string');
	clientID: attr('string');

	// TODO
	//add other info
});
