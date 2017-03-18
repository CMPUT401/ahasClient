import Ember from 'ember';

export default Ember.Component.extend({
    renderer: {},
    tagName: 'bootstrap-datepicker',
actions: {
    changeDateAction(){
        console.log("handled", document.getElementById('vaccineDiv'));
    }
}
});

