import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | create user');

test('visiting /create-user', function(assert) {
  visit('/create-user');

  andThen(function() {
    assert.equal(currentURL(), '/create-user');
  });
});

test('adding new user valid', function(assert){
  visit('/create-user');
  fillIn("identification-creation", "user@gmail.ca");
  fillIn("password-creation", "password");
  click("create-user-button");
  andThen(function(){
    assert.equal("status", "Account created!");
  });

});
