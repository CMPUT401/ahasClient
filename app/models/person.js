import DS from 'ember-data';

export default DS.Model.extend({
        name: DS.attr('string'), 
        email: DS.attr('string'),
        address: DS.attr('string'),
        phoneNumber: DS.attr('int'),
});
