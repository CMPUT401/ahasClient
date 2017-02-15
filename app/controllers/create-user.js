import Ember from 'ember';

export default Ember.Controller.extend({
     actions:{
     createUser: function() { 

        document.getElementById('status').value = "";
    
        var store = this.get('store');
        var email= document.getElementById('username').value;
        var password = document.getElementById('password').value;
        
        if (checkFormat(password, email) === true ){
         
        var user = store.createRecord('user', {
            email,
            password
        });
    
//check return for success key
        user.save().then(function(){
            console.log("twas success");
            document.getElementById('status').value = "Account created!";
        }, function() {
        console.log("no such luck", password, email); 
        document.getElementById('status').value = "Problem encountered creating account on the server end, please try again";
        
        });
      }
    }
},

});

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
