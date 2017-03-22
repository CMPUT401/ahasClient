import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service(),
    ajax: Ember.inject.service(),
    actions: {
        resetPassword: function () {
            let button = document.getElementById("reset");
            // Empty functions
        },
        deleteUser: function () {
            let deleteButton = document.getElementById("delete");
            deleteButton.disable = true;
            // Empty functions
            self = this;
            var user = this.get('ajax').delete('/api/users/' + this.get('model.user').id);

            user.then(function (response) {
                if (response.success) {
                    showAlert("User deleted!", true);
                    clearFields(self);
                    self.transitionToRoute('search-contacts');
                }
                //this is error from server condition
            }, function (response) {
                if (response === false) {
                    if (self.get('session.isAuthenticated')) {
                        self.get('session').invalidate();
                    }
                    self.transitionToRoute('/login');
                } else {
                    showAlert(response.errors[0].title, false);
                    deleteButton.disable = false;
                }
            });
        }
    }
});

function showAlert(message, bool) {
        if(bool){
            Ember.$('#alert_placeholder').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span  id="statusGood">'+message+'</span></div>');
        }
        else{
             Ember.$('#alert_placeholder').html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">'+message+'</span></div>');
        }
 }
