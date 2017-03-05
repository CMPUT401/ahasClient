import DS from 'ember-data';

export default DS.Model.extend({
        ID: DS.attr('string'),
        first_name: DS.attr('string'),
        last_name: DS.attr('string'), 
        email: DS.attr('string'),
        address: DS.attr('string'),
        phone_number: DS.attr('string'),
        fax_number: DS.attr('string'),
        type: DS.attr('string')
});
