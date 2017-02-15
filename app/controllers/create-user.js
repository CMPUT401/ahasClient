import Ember from 'ember';

export default Ember.Controller.extend({
     ajax: Ember.inject.service(),
     actions:{
     createUser: function() { 

        //reset status displayed on every button press
        document.getElementById('statusgood').value = "";

        var email= document.getElementById('username').value;
        var password = document.getElementById('password').value;
        
        if (checkFormat(password, email) === true ){
         
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
            document.getElementById('statusgood').value = "Account created!";
        }, function(response) {
        document.getElementById('statusbad').value = "Problem" + response + "encountered creating account on the server end, please try again";
        
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
            document.getElementById('statusbad').value = "Password too short, must be at least 7 characters!";
            return false;
        }   
        
        else if ( re.test(email) !== true ) {
            document.getElementById('statusbad').innerHTML = "Incorrect email format";
            return false;
        }

        return true;
    }
