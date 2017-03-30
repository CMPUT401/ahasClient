import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession, invalidateSession } from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | view side note');

//important question: is this how we are going to structure the app's urls ? sure this reflects the structure of what we are posting to but should it be this way on our end? I am open to mulitple answers -Kristy
test('visiting /patients/1/medical_records/1/notes/1', function(assert) {
  authenticateSession(this.application);
  visit('/view-patient/1/view-medical-record/1/notes/1');

  andThen(function() {
    assert.equal(currentURL(), '/view-patient/1/view-medical-record/1/notes/1');
  });
});

/*
test('checking info added correctly', function(assert) {
  authenticateSession(this.application);
  visit('/patients/1/medical_records/1/notes/1');

  andThen(function() {
    assert.equal(find('#contactName').text(), 'hey listen\njjj');
    assert.equal(find('#contactPhoneNumber').text(), 'jb');
  });
});
*/