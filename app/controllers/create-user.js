import Ember from 'ember';

export default Ember.Controller.extend({
     ajax: Ember.inject.service(),
     actions:{
     createUser: function() { 

        //reset status displayed on every button press
        document.getElementById('status').value = "";

        var email= document.getElementById('username').value;
        var password = document.getElementById('password').value;
        
        if (checkFormat(password, email) === true ){
         
        //this will need to be actual but otherwise breaks tests at the moment... 
        var user = this.get('ajax').request('/api/user', {
        method: 'POST',
        data: {
          email: email,
          password: password
        }
    });
    
//check return for success key
        user.then(function(err){
            document.getElementById('status').value = "Account created!";
        }, function() {
        document.getElementById('status').value = "Problem encountered creating account on the server end, please try again";
        
        });
      }
    }
},

});

/* 
 * checks the format of the email and password provided on the createUser form
 */
function checkFormat(password, email) {

        var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (password.length < 7){
            document.getElementById('status').value = "Password too short, must be at least 7 characters!";
            return false;
        }   
        
        else if ( re.test(email) !== true ) {
            document.getElementById('status').value += "Incorrect email format";
            return false;
        }

        return true;
    }
