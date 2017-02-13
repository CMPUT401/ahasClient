import Ember from 'ember';

export default Ember.Controller.extend({
     actions:{
     createUser: function() { 
        var store = this.get('store');
        var user = store.createRecord('user', {
            email: this.get('identification'),
            password: this.get('password')
        });
        
        user.save().then(function(){
            console.log("twas success");
        }, function() {
            console.log("no such luck");
        });
     }
    }
});
