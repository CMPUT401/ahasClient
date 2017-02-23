import Ember from 'ember';

export default Ember.Controller.extend({
    ajax: Ember.inject.service(),
    actions: {
    createContact: function(){

    //this is to get the value in the dropdown specifically
    var type= document.getElementById('type');
    var typeval = type.options[type.selectedIndex].text;
    
    var user = this.get('ajax').post('/api/create-contact', {
        type: 'application/json',
        data: { contact: {
          name: this.get('name'),
          phoneNumber: this.get('phoneNumber'),
          faxNumber: this.get('faxNumber'),
          email: this.get('email'),
          address: this.get('address'),
          type: typeval
        }
    }
    });

        user.then(function(response){
            if(response.success){
                showAlert("Contact created!", true);
            }
        //this is error from server condition
        }, function(response) {
            console.log(response.errors[0]);
            showAlert(response.errors[0].title, false);
        
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
