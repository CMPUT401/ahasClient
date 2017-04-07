import Ember from 'ember';

/**
 * Controller for reset-password
 * @class UserController
 */
export default Ember.Controller.extend({
  session: Ember.inject.service(),
  ajax: Ember.inject.service(),
  actions: {

     /** 
     * Sends message to the server to generate a resetToken and send an email to the client
     * @method resetPassword
     */
    resetPassword: function () {
      let button = document.getElementById("reset");
      button.disable = true;
      var user = this.get('ajax').post('/api/admin/reset_password', {
        type: 'application/json',
        data: {
          user: this.model.user
        }
      });
      let self = this;
      user.then(function (response) {
        if (response.success) {
          showAlert("Password Reset!", true);
        }
        //this is error from server condition
      }, function (response) {
        showAlert(response.errors[0].title, false);
        button.disable = false;
      });
    },

     /** 
     * Deletes a user from the database
     * @method deleteUser
     */
    deleteUser: function () {
      var self = this;
      let deleteButton = document.getElementById("delete");
      deleteButton.disable = true;
      // Empty functions
      self = this;
      var user = this.get('ajax').delete('/api/admin/users/' + this.get('model.user').id);

      user.then(function (response) {
        if (response.success) {
          showAlert("User deleted!", true);
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
          deleteButton.disable = false;
        }
      });
    }
  }
});


/** 
 * used to provide feedback to user on success condition as well as fail condition
 * only displayed very briefly on success condition however before transition
 * @method  showAlert
 * @param {string} message The message to display in the alert
 * @param {boolean} bool Determines if this is a warning alert or confirmation alert
 */
function showAlert(message, bool) {
  if (bool) {
    Ember.$('#alert_placeholder').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span  id="statusGood">' + message + '</span></div>');
  } else {
    Ember.$('#alert_placeholder').html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">' + message + '</span></div>');
  }
}
