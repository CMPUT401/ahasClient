import Ember from 'ember';

export default Ember.Controller.extend({
     
     ajax: Ember.inject.service(),
     actions:{
     createUser: function() { 

        //reset status displayed on every button press
        var email= document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var passwordConfirm = document.getElementById('passwordConfirm').value;
        
        if (checkFormat(password, email, passwordConfirm) === true ){
         
        var user = this.get('ajax').request('/api/signup', {
        method: 'POST',
        data: {
          email: email,
          password: password
        }
    });

////http://stackoverflow.com/questions/10082330/dynamically-create-bootstrap-alerts-box-through-javascript

//need to checkup on this.
        user.then(function(){
            showAlert("Account created!", true);
        }, function() {
            showAlert("Problem encountered creating account on the server end, please try again", false);
        
        });
      }
    }
},

});

/* 
 * checks the format of the email and password provided on the createUser form
 */
function checkFormat(password, email, passwordConfirm) {

        var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (password !== passwordConfirm){
            showAlert("Password and password confirmation do not match", false);
            return false;
        }

        else if (password.length < 7){
            showAlert("Password too short, must be at least 7 characters!", false);
            return false;
        }   
        
        else if ( re.test(email) !== true ) {
            showAlert("Incorrect email format", false);
            return false;
        }

        return true;
    }

 function showAlert(message, bool) {
        if(bool){
            Ember.$('#alert_placeholder').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span  id="statusGood">'+message+'</span></div>');
        }
        else{
             Ember.$('#alert_placeholder').html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">'+message+'</span></div>');
        }
 }

