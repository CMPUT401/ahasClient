import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession} from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | create patient');

test('visiting /new-patient', function(assert) {
   authenticateSession(this.application);
  visit('/new-patient/1');

  andThen(function() {
    assert.equal(currentURL(), '/new-patient/1');
  });
});

test('adding new user valid', function(assert){
   authenticateSession(this.application);
  visit('/new-patient/1');

  fillIn('#patientName', "Bob");
  fillIn('#patientSpecies', "Fred");
  fillIn('#patientGender', "M");
  fillIn('#patientStatus', "N");
  fillIn('#patientAge', "13");
  fillIn('#patientColor', "Brown");
  fillIn('#patientTatoo', "123");
  fillIn('#patientMicrochip', "111");
  click('#create-patient-button');
  andThen(function(){
    assert.equal(find('#statusGood').text());
  });
});
