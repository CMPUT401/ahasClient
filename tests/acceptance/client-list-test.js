import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | client list');

test('visiting /client-list', function(assert) {
  visit('/client-list');

  andThen(function() {
    assert.equal(currentURL(), '/client-list');
  });
});
