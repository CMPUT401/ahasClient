import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession} from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | view vaccines');

test('checking list added correctly', function(assert) {
  authenticateSession(this.application);
  visit('/view-patient/1');

  click('#vaccine-component-button');

  andThen(function() {
    assert.equal(find('.nameListItem').length(), 2);
  });
});
