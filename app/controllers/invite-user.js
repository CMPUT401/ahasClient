import Ember from 'ember';

export default Ember.Controller.extend({
  name: "",
  email: "",
  actions: {
    validEmail: function () {
        var emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(emailRegex.test(this.email)){
            document.getElementById('inviteButton').disabled = false;
        }
    },
    sendInvite: function () {
      document.getElementById('inviteButton').disable = false;
      var user = this.get('ajax').post('/api/invite', {
        type: 'application/json',
        data: {
          user: {
            name: this.name,
            email: this.email,
          }
        }
      });
    }
  }
});
