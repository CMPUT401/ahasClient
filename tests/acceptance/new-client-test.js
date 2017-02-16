import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';

import Pretender from 'pretender';

let serv; 

// moduleForAcceptance('Acceptance | new client');

// test('visiting /new-client', function(assert) {
//   visit('/new-client');

//   andThen(function() {
//     assert.equal(currentURL(), '/new-client');
//   });
// });

moduleForAcceptance('ajax-get component', {
	beforeEach(){
		serv = new Pretender();
	},
	afterEach(){
		serv.shutdown();
	}
});

test('waiting for a route with async widget', function (assert){
	// const PAYLOAD = [{name: 'bob',
	// 				address: '123 somewehere st, Edmonton',
	// 				phoneNumber: '780-555-1234',
	// 				email: 'some@email.com',
	// 				licos: '12345',
	// 				socialAssistance: '4313'},
	// 				{name: 'Alice',
	// 				address: '41 somewehere ave, Edmonton',
	// 				phoneNumber: '780-555-2222',
	// 				email: 'some1535@email.com',
	// 				licos: '125235',
	// 				socialAssistance: '5555'}];
	const PAYLOAD = [{ title: 'Foo' }, { title: 'Bar' }, { title: 'Baz' }];
	serv.get('/api/client', function(){
		return [200, {"Content-Type": "application/json"}, JSON.stringyfy(PAYLOAD)];
	}, 300);

	visit('/new-client');

	andThen(function() {
		assert.equal(currentURL(), '/new-client');
		assert.ok($('.ajax-get').length === 1, 'ajax-get component is rendered');
	});

	click('button:contains(Create Client)');

	andThen(function(){
		assert.equal($('.ajax-get li:eq(0)').text(), 'Foo');
		assert.equal($('.ajax-get li:eq(1)').text(), 'Bar');
    	assert.equal($('.ajax-get li:eq(2)').text(), 'Baz');
	});
});
