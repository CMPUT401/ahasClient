import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
        this.model = params;
        console.log("the passed val", params);
        console.log("the assigned val", this.model);
    }
});
