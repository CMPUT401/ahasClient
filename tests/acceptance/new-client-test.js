import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | new client');

test('visiting /new-client', function(assert) {
  visit('/new-client');

  andThen(function() {
    assert.equal(currentURL(), '/new-client');
  });
});
