import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession, invalidateSession } from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | patient info');

test('visiting /view-patient/1 before login', function(assert) {
  invalidateSession(this.application);
  visit('view-patient/1');

  andThen(function(){
    assert.notEqual(currentURL(), '/view-patient/1');
  });
});

test('visiting /view-patient/1', function(assert) {
  authenticateSession(this.application);
  visit('/view-patient/1');

  andThen(function() {
    assert.equal(currentURL(), '/view-patient/1');
  });
});

test('adding new user valid', function(assert){
  visit('/create-user');

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
