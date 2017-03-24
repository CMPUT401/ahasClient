import Ember from 'ember';

export default Ember.Controller.extend({
	 actions: {

}

});

function checkUpdate(date){

    var day = date.getDay() ;
    var month = date.getMonth()  ;
    var year = date.getFullYear();

    var current = new Date();

    var currentDay = current.getDay() ;
    var currentMonth = current.getMonth()  ;
    var currentYear = current.getFullYear();
    var currentHours = current.getHours();

    //exact minute of midnight is when we will autofinalize
    if (currentDay === day && currentMonth === month && currentYear === year && currentHours <= 24 ){
        return(true);
    }
    return(false);
}