import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession} from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | admin', {
  beforeEach: function() {
    authenticateSession(this.application);
    window.localStorage.setItem('role', 'Admin');
  }
});
test('visiting /admin', function(assert) {
  visit('/admin');

  andThen(function() {
    assert.equal(currentURL(), '/admin');
  });
});


test('visiting /admin displays a list of users', function(assert) {
  visit('/admin');
  andThen(function() {
    assert.equal(currentURL(), '/admin');
    assert.equal(find('.list-group-item').length, 5);
  });
});

test('searching for a user displays that user', function(assert) {
  visit('/admin');
  
  fillIn('#userSearch', "Justin");  
  click('.searchButton');
  andThen(function() {
    assert.equal(find('.list-group-item').length, 1); 
    assert.equal(find('.name').first().text().trim(), 'Justin Barclay');
  });
});

// test('clicking on a user transitions to a new route', function(assert) {
//   visit('/admin');
  
//   click('.list-group-item');
//   andThen(function() {
//     assert.equal(currentURL(), '/admin/users/:id');
//   });
// });