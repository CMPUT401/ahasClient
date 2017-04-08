import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession } from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | user',{
  beforeEach: function() {
    authenticateSession(this.application);
    window.localStorage.setItem('role', 'Admin');
  }
});

test('visiting /user', function(assert) {
  visit('admin/users/:id');

  andThen(function() {
    assert.equal(currentURL(), 'admin/users/:id');
  });
});



test('reset /user password', function(assert) {
  visit('admin/users/:id');
  click('#reset');
  andThen(function() {
    assert.equal(currentURL(), 'admin/users/:id');
    assert.equal(find('#statusGood').text(), "Password Reset!");
  });
});

test('delete /user', function(assert) {
  visit('admin/users/:id');
  click('#delete');
  andThen(function() {
    assert.equal(currentURL(), '/admin');
  });
});