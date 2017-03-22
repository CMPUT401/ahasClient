import Ember from 'ember';
import Fuse from 'npm:fuse.js';


export default Ember.Controller.extend({
    users: [],
    filterOn: "",
    init() {
        this._super(arguments);
        this.addObserver('model', this, 'modelDidChange');
    },
    modelDidChange() {
        this.set('users', this.get('model.users'));
    },
    actions: {
        filterUsers: function () {
            let results;
            var options = {
                shouldSort: true,
                threshold: 0.6,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                minMatchCharLength: 1,
                keys: [
                    "name",
                    "email"
                ]
            };
            var fuse = new Fuse(this.users, options); // "list" is the item array
            if (this.filterOn == "") {
                results = this.model.users;
            } else {
                results = fuse.search(this.filterOn);
            }
            this.set('users', results);
        }
    }
});
