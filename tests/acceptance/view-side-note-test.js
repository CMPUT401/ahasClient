import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession, invalidateSession } from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | view contact');

test('visiting /patients/1/medical_records/1/notes/1', function(assert) {
  authenticateSession(this.application);
  visit('/patients/1/medical_records/1/notes/1');

  andThen(function() {
    assert.equal(currentURL(), '/patients/1/medical_records/1/notes/1');
  });
});
