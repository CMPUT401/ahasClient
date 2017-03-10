import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession} from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | view medical record');

test('visiting /view-medical-record', function(assert) {
  authenticateSession(this.application);
  visit('/view-medical-record');

  andThen(function() {
    assert.equal(currentURL(), '/view-medical-record');
  });
});

test('medical record info shows up', function(assert) {
  authenticateSession(this.application);
  visit('/view-medical-record');

  andThen(function() {
    assert.equal(find('#summary').text(), 'fake summary');
    assert.equal(find('#attitudeBAR').checked, true);
    assert.equal(find('#attitudeDepressed').checked, false);
  });
});