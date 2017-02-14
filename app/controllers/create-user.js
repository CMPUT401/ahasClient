import Ember from 'ember';

export default Ember.Controller.extend({
     actions:{
     createUser: function() { 

        document.getElementById('status').value = "";
    
        var store = this.get('store');
        var email= document.getElementById('id').value;
        var password = document.getElementById('pass').value;
        var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
         // /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i //couldnt get this one to work for some reason...
        
        if (password.length < 7){
            document.getElementById('status').value = "Password too short, must be at least 7 characters!";
        }   
        
        else if ( re.test(email) !== true ) {
            document.getElementById('status').value += "Incorrect email format";
        }

        else {
        var user = store.createRecord('user', {
            email,
            password
        });
    

        user.save().then(function(){
            console.log("twas success");
            document.getElementById('status').value = "Account created!";
        }, function() {
        console.log("no such luck", password, email); 
        document.getElementById('status').value = "Problem encountered creating account on the server end, please try again";
        
        });
        }
      }
    }
});
