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
  server.create('user');
  fillIn('#username', "user@gmail.ca");
  fillIn('#password', "password");
  click('#create-user-button');
  var checkup = server.db.users.find(1);
  andThen(function(){
    assert.equal(checkup.email, "user@gmail.ca");
  });
});

  test('adding invalid user, too short password', function(assert){
  visit('/create-user');
  fillIn('#username', "user@gmail.ca");
  fillIn('#password', "pass");
  click('#create-user-button');
  andThen(function(){
    assert.equal(find('#status').val(), "Password too short, must be at least 7 characters!");
  });
  });

  test('adding invalid user, incorrect format email', function(assert){
  visit('/create-user');
  fillIn('#username', "usermail.ca");
  fillIn('#password', "password");
  click('#create-user-button');
  andThen(function(){
    assert.equal(find('#status').val(), "Incorrect email format");
  });

});
