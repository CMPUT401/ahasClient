import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession} from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | view vaccines');

//the test passes, but visiting this page is problematic, the component starts with inital value patiantId = 0, and 
// this doesnt seem to be a problem when running bc by the time we get o ajax it has taken real value, but in the tests
// this will make some calls with 0 and config does not intercept?
test('checking list added correctly', function(assert) {
  authenticateSession(this.application);
  visit('/view-patient/1');


  click('#vaccine-component-button');

  andThen(function() {
    assert.equal(find('.vaccineList').length, 2);
  });
});
