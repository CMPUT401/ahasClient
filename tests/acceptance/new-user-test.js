import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | new user');

test('visiting /new-user', function(assert) {
  visit('/new-user');

  andThen(function() {
    assert.equal(currentURL(), '/new-user');
  });
  
});

test('adding new user valid', function(assert){
  visit('/new-user');

  fillIn('#name', "kristy");
  fillIn('#username', "user@gmail.ca");
  fillIn('#password', "password");
  fillIn('#passwordConfirm', "password");
  click('#create-user-button');
  andThen(function(){
    assert.equal(find('#statusGood').text(), 'Account created!');
    assert.notEqual(find('#statusBad').text(), "Incorrect email format");
  });
});

  test('adding invalid user, too short password', function(assert){
  visit('/new-user');

  var pass = 'pass';
  
  fillIn('#name', "kristy");
  fillIn('#username', "auser@gmail.com");
  fillIn('#password', pass);
  fillIn('#passwordConfirm', pass);
  click('#create-user-button');
  andThen(function(){
    assert.equal(find('#statusBad').text(), "Password too short, must be at least 7 characters!");
    assert.notEqual(find('#statusGood').text(), "Password too short, must be at least 7 characters!");
  });
  });

  test('adding invalid user, incorrect format email', function(assert){
  visit('/new-user');


  fillIn('#name', "kristy");
  fillIn('#username', "usermail.ca");
  fillIn('#password', "password");
  fillIn('#passwordConfirm', "password");
  click('#create-user-button');
  andThen(function(){
    assert.equal(find('#statusBad').text(), "Incorrect email format");
  });
  });


  test('adding invalid user, name is blank', function(assert){
  visit('/new-user');
  
  fillIn('#username', "usermail@gmail.ca");
  fillIn('#password', "password");
  fillIn('#passwordConfirm', "password");
  click('#create-user-button');
  andThen(function(){
    assert.equal(find('#statusBad').text(), "Name cannot be blank");
  });

});
