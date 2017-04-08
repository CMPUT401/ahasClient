import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession, invalidateSession } from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | new-patient-test');

test('visiting /new-patient', function(assert) {
   authenticateSession(this.application);
  visit('/new-patient');

  andThen(function() {
    assert.equal(currentURL(), '/new-patient');
  });
});


test('visiting /new-patient/ before login', function(assert) {
  invalidateSession(this.application);
  visit('/new-patient');

  andThen(function(){
    assert.notEqual(currentURL(), '/new-patient');
  });
});


test('adding new patient valid', function(assert){
   authenticateSession(this.application);
  visit('/new-patient');

  fillIn('#patientFirstName', "Bob");
  fillIn('#patientSpecies', "Fred");
  fillIn('#patientAge', "13");
  fillIn('#patientColor', "Brown");
  fillIn('#patientTatoo', "123");
  fillIn('#patientMicrochip', "111");
  click('#create-patient-button');
  andThen(function(){
    assert.equal(currentURL(), '/search-patient');
  });
});
