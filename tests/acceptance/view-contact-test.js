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
    assert.equal(find('#contactName').text(), 'Contact information for: Joe');
    assert.equal(find('#contactPhoneNumber').text(), 'Phone Number: 123-123-1234');
    assert.equal(find('#contactEmail').text(), 'Email: joe@gmail.ca');
    assert.equal(find('#contactFaxNumber').text(), 'Fax Number: 123-321-1234');
    assert.equal(find('#contactAddress').text(), 'Address: 123 st');
  });
});
