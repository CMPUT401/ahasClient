import DS from 'ember-data';

export default DS.Model.extend({
        ID: DS.attr('string'),
        name: DS.attr('string'), 
        email: DS.attr('string'),
        address: DS.attr('string'),
        phoneNumber: DS.attr('int'),
        faxNumber: DS.attr('int')
});
