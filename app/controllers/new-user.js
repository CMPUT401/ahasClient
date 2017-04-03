import Ember from 'ember';


/**
* Controller for create-user
* @class CreateUserController
*/


export default Ember.Controller.extend({
     
     ajax: Ember.inject.service(),
     actions:{

       /** 
		* handles action called when user clicks create-user-button
        * delegates checking the necessary inputs and then if those are all ok
        * makes the post request to server with user info
        * provides alert feedback on success or fail condition
		* @method createUser
		*/    
     createUser: function() { 
        var password = document.getElementById('password').value;
        var passwordConfirm = document.getElementById('passwordConfirm').value;
        
        let self = this;
        if (checkFormat(password, passwordConfirm)){
         
        var user = this.get('ajax').post('/api/signup', {
        type: 'application/json',
        data: { user: {
          name: this.model.user.name, 
          email: this.model.user.email,
          password: password,
          password_confirmation: passwordConfirm,
          invite_token: this.model.inviteToken
        }
    }
    });

        user.then(function(response){
            if(response.success){
                showAlert("Account created!", true);
                window.setTimeout(self.transitionToRoute('login', 3000));
            }
        //this is error from server condition
        }, function(response) {
            showAlert(response.errors[0].title, false);
        
        });
      }
    }
},

});

 /** 
		* used to check the input fields on the create user page
		* @method  checkFormat
		* @param {string} password The user's password
        * @param {string} email The user's email
        * @param {string} passwordConfirm The user's password confirmation
        * @param {string} name The user's name
		*/

function checkFormat(password, passwordConfirm) {
       
        if (password.length < 7){
            showAlert("Password too short, must be at least 7 characters!", false);
            return false;
        }   
        else if (password !== passwordConfirm){
            showAlert("Password and password confirmation do not match", false);
            return false;
        }
        return true;
    }
 /** 
		* used to provide feedback to user on success condition as well as fail condition
        * only displayed very briefly on success condition however before transition
		* @method  showAlert
		* @param {string} message The message to display in the alert
        * @param {boolean} bool Determines if this is a warning alert or confirmation alert
		*/
 function showAlert(message, bool) {
        if(bool){
            Ember.$('#alert_placeholder').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span  id="statusGood">'+message+'</span></div>');
        }
        else{
             Ember.$('#alert_placeholder').html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">'+message+'</span></div>');
        }
 }

