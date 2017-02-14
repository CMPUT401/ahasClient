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
  fillIn('#id', "user@gmail.ca");
  fillIn('#pass', "password");
  click('#create-user-button');
  andThen(function(){
    assert.equal(find('#status').val(), "Account created!");
  });
});

  test('adding invalid user, too short password', function(assert){
  visit('/create-user');
  fillIn('#id', "user@gmail.ca");
  fillIn('#pass', "pass");
  click('#create-user-button');
  andThen(function(){
    assert.equal(find('#status').val(), "Password too short, must be at least 7 characters!");
  });
  });

  test('adding invalid user, incorrect format email', function(assert){
  visit('/create-user');
  fillIn('#id', "usermail.ca");
  fillIn('#pass', "password");
  click('#create-user-button');
  andThen(function(){
    assert.equal(find('#status').val(), "Incorrect email format");
  });

});
