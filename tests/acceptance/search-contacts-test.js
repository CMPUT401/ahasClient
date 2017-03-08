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

//k wait wont have unique id's for these elements ... mirage wants to access elements based on ids...
//hold off on this for now
test('checking search info rendered before search', function(assert) {
  authenticateSession(this.application);
  visit('/search-contacts');

  andThen(function() {
    assert.equal(find('#contactName').text(), 'Justin Barclay');
   
  });
});

test('checking we can search', function(assert) {
  authenticateSession(this.application);
  visit('/search-contacts');

  andThen(function() {
    assert.equal(find('#contactName').text(), 'Justin Barclay');

  });
});
