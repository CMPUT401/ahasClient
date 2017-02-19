import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | view contact');

test('visiting /view-contact', function(assert) {
  visit('/view-contact');

  andThen(function() {
    assert.equal(currentURL(), '/view-contact');
  });
});

test('checking info added correctly', function(assert) {
  visit('/view-contact');

  andThen(function() {
    assert.equal(find('#contactName').text(), 'Contact information for: Joe');
    assert.equal(find('#contactPhoneNumber').text(), 'Phone Number: 123-123-1234');
    assert.equal(find('#contactEmail').text(), 'Email: joe@gmail.ca');
    assert.equal(find('#contactFaxNumber').text(), 'Fax Number: 123-321-1234');
    assert.equal(find('#contactAddress').text(), 'Address: 123 st');
  });
});
