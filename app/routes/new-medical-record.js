import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

/**
* Route for new medical record
* @class NewMedicalRecordRoute
*/

export default Ember.Route.extend(AuthenticatedRouteMixin , {
    model(params) {
        return {
        patientID: params.patientID,
        date: parseDate()
        };
    }
});

/**  
  * returns new Date parsed in a nice way to display at the top of the medical record
  * format example: Monday January 21, 2017 5:12
  * where time is in twenty four hour clock
  * @method parseDate
  */ 

function parseDate(){
        var date = new Date();
        var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        var months = ["January","February","March","April","May","June","July", "August", "September", "October", "November", "December"];
        var day = date.getDay() ;
        var month = date.getMonth()  ;
        var year = date.getFullYear();
        var hours = date.getHours();
        var mins = (date.getMinutes()<10?'0':'') + date.getMinutes();
        var whole = days[day] + " " + months[month] + " " + date.getDate().toString() +", "+ year.toString() + " "+ hours.toString() + ":" + mins.toString();
        return(whole);
}