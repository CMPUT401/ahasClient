import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession} from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | search contact');

test('visiting /search-contacts', function(assert) {
  authenticateSession(this.application);
  visit('/search-contacts');

  andThen(function() {
    assert.equal(currentURL(), '/search-contacts');
  });
});

test('checking search info rendered', function(assert) {
  authenticateSession(this.application);
  visit('/search-contacts');

  andThen(function() {
    assert.equal(find('#contactName').text(), 'Justin Barclay');
    assert.equal(find('#contactPhoneNumber').text(), 'Phone Number: 123-123-1234');
    assert.equal(find('#contactEmail').text(), 'Email: joe@gmail.ca');
  });
});
