import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | login');

test('visiting /login', function(assert) {
  visit('/login');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('login with invalid user', function(assert) {
  visit('/login');

  fillIn('username','invalid@email.ca');
  fillIn('password','invalid');
  click('login-button');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('login with valid user, incorrect password', function(assert) {
  visit('/login');

  fillIn('username','valid@email.ca');
  fillIn('password','invalid');
  click('login-button');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('login with valid user, correct password', function(assert) {
  visit('/login');

  fillIn('username','valid@email.ca');
  fillIn('password','valid');
  click('login-button');

  andThen(function() {
    assert.equal(currentURL(), '/afterlogin');
  });
});
