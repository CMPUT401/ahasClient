import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession} from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | view contact');

test('visiting /view-contact/1', function(assert) {
  authenticateSession(this.application);
  visit('/view-contact/1');

  andThen(function() {
    assert.equal(currentURL(), '/view-contact/1');
  });
});

test('checking info added correctly', function(assert) {
  authenticateSession(this.application);
  visit('/view-contact/1');

  andThen(function() {
    assert.equal(find('#contactName').text(), 'Contact information for: Justin Barclay');
    assert.equal(find('#contactPhoneNumber').text(), 'Phone Number: 555-555-5555');
    assert.equal(find('#contactEmail').text(), 'Email: fakejustin@ualberta.ca');
    assert.equal(find('#contactFaxNumber').text(), 'Fax Number: 555-555-5556');
    assert.equal(find('#contactAddress').text(), 'Address: 116 St & 85 Ave, Edmonton, AB T6G 2R3');
  });
});
