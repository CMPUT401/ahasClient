import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession} from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | create medical record');

test('visiting /view-patient/1/medical-record', function(assert) {
  authenticateSession(this.application);
  visit('/view-patient/1/medical-record');

  andThen(function() {
    assert.equal(currentURL(), '/view-patient/1/medical-record');
  });
});


test('create medical record success', function(assert) {
  authenticateSession(this.application);
  visit('/view-patient/1/medical-record');

 //any touch to the signature pad should count as signature....
 //also dont really need to fill in any of the fields just for this test
  click('#signature');
  click('#create-medical-button');

  andThen(function() {
    assert.equal(find('#statusGood').text(), 'Record created, record is editable until 12pm tonight');
  });
});

test('create medical record without signature', function(assert) {
  authenticateSession(this.application);
  visit('/view-patient/1/medical-record');

 click('#create-medical-button');

  andThen(function() {
    assert.equal(find('#statusBad').text(),'Record cannot be created without a signature');
  });
});