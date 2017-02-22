import { test} from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession, invalidateSession } from '../helpers/ember-simple-auth';


moduleForAcceptance('Acceptance | login');

test('visiting /afterlogin while authenticated', function(assert) {
  authenticateSession(this.application);
  visit('/afterlogin');

  andThen(function() {
    assert.equal(currentURL(), '/afterlogin');
  });
});

test('visiting /afterlogin while not authenticated', function(assert) {
  invalidateSession(this.application);
  visit('/afterlogin');

  andThen(function() {
    assert.equal(currentURL(), '/afterlogin');
  });
});

test('login with invalid user', function(assert) {
  invalidateSession(this.application);
  visit('/login');

  fillIn('#username','invalid@email.ca');
  fillIn('#password','invalid');
  click('#login-button');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('login with valid user, incorrect password', function(assert) {
  invalidateSession(this.application);
  visit('/login');

  fillIn('#username','valid@email.ca');
  fillIn('#password','invalid');
  click('#login-button');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('login with valid user, correct password', function(assert) {
  authenticateSession(this.application);
  
  visit('/login');

  fillIn('#username','valid@email.ca');
  fillIn('#password','validpassword');
  click('#login-button');

  andThen(function() {
    assert.equal(currentURL(), '/afterlogin');
    assert.notEqual(currentURL(), '/login');
  });
});
