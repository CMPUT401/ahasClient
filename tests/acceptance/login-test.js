import { test} from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession, invalidateSession } from '../helpers/ember-simple-auth';


moduleForAcceptance('Acceptance | login');

test('visiting /search-patient while authenticated', function(assert) {
  authenticateSession(this.application);
  visit('/search-patient');

  andThen(function() {
    assert.equal(currentURL(), '/search-patient');
  });
});

test('visiting /search-patient while not authenticated', function(assert) {
  invalidateSession(this.application);
  visit('/search-patient');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});


test('login with valid user, correct password', function(assert) {
  invalidateSession(this.application);
  visit('/login');

  fillIn('#username','valid@email.ca');
  fillIn('#password','validpassword');
  click('#login-button');

  andThen(function() {
    assert.notEqual(currentURL(), '/login');
    assert.equal(currentURL(), '/search-contact');
  });
});