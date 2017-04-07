import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession} from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | view medical record');

/*test('visiting /view-patient/1/view-medical-record/1', function(assert) {
  authenticateSession(this.application);
  visit('/view-patient/1/view-medical-record/1');

  andThen(function() {
    assert.equal(currentURL(), '/view-patient/1/view-medical-record/1');
  });
});*/

/*test('visiting /view-patient/1/view-medical-record-editable/1', function(assert) {
  authenticateSession(this.application);
  visit('/view-patient/1/view-medical-record-editable/1');

  andThen(function() {
    assert.equal(currentURL(), '/view-patient/1/view-medical-record-editable/1');
  });
});*/

/*test('medical record info shows up', function(assert) {
  authenticateSession(this.application);
  visit('/view-patient/1/view-medical-record/1');

  andThen(function() {
    assert.equal(find('#summary')[0].value, 'fake summary');
    assert.equal(find('#attitudeBAR')[0].checked, true);
    assert.equal(find('#attitudeDepressed')[0].checked, false);
  });
});*/