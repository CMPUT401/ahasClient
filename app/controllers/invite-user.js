import Ember from 'ember';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),
  name: "",
  email: "",
  types: ["User", "Admin"],
  userType: "User",
  actions: {
    changeUserType: function () {
      this.set('userType', document.getElementById('userType').value);
    },
    validEmail: function () {
      var emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (emailRegex.test(this.email)) {
        document.getElementById('inviteButton').disabled = false;
      }
    },
    sendInvite: function () {
      let self = this;
      var emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if(!emailRegex.test(this.email)){
        showAlert('Please enter a valid email', false);
        return;
      }
      this.get('ajax').post('/api/admin/invite', {
        type: 'application/json',
        data: {
          user: {
            name: this.name,
            email: this.email,
            type: this.userType
          }
        }
      }).then(function (response) {
        if (response.success) {
          showAlert("Email sent!", true);
          window.setTimeout(self.transitionToRoute('/admin'), 3000);
        }
        //this is error from server condition
      }, function (response) {
        if (response === false) {
          if (self.get('session.isAuthenticated')) {
            self.get('session').invalidate();
          }
          self.transitionToRoute('/login');
        } else {
          showAlert(response.error, false);
        }
      });
    }
  }
});

function showAlert(message, bool) {
  if (bool) {
    Ember.$('#alert_placeholder').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span  id="statusGood">' + message + '</span></div>');
  } else {
    Ember.$('#alert_placeholder').html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">' + message + '</span></div>');
  }
}
