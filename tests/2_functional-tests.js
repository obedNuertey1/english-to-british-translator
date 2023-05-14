const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

let translator = new Translator();

let [toBritish, toAmerican, invalidField] = ["american-to-british", "british-to-american", "invalid"];
let [text1, text2, text3, text4] = ["Mangoes are my favorite fruit.", "I ate yogurt for breakfast.", "Paracetamol takes up to an hour to work.", "I am awesome"];

suite('Functional Tests', () => {
	test("Translation with text and locale fields: POST request to /api/translate", function(done){
		chai.request(server)
		.keepOpen()
		.post("/api/translate")
		.set('content-type', 'application/json')
		.send({text: text1, locale: toBritish})
		.end((err, res)=>{
			assert.equal(res.status, 200);
			assert.equal(res.type, 'application/json');
			assert.deepEqual(res.body, {text: text1, translation: translator.translationManager(toBritish, text1)});
			done();
		});
	});
	
	test("Translation with text and invalid locale field: POST request to /api/translate", function(done){
		chai.request(server)
		.keepOpen()
		.post("/api/translate")
		.set('content-type', 'application/json')
		.send({text: text1, locale: invalidField})
		.end((err, res)=>{
			assert.equal(res.status, 200);
			assert.equal(res.type, 'application/json');
			assert.deepEqual(res.body, {error: 'Invalid value for locale field'});
			done();
		});
	});
	
	test("Translation with missing text field: POST request to /api/translate", function(done){
		chai.request(server)
		.keepOpen()
		.post("/api/translate")
		.set('content-type', 'application/json')
		.send({text: "", locale: toBritish})
		.end((err, res)=>{
			assert.equal(res.status, 200);
			assert.equal(res.type, 'application/json');
			assert.deepEqual(res.body, {error: 'No text to translate'});
			done();
		});
	});
	
	test("Translation with missing locale field: POST request to /api/translate", function(done){
		chai.request(server)
		.keepOpen()
		.post("/api/translate")
		.set('content-type', 'application/json')
		.send({text: text2, locale: ""})
		.end((err, res)=>{
			assert.equal(res.status, 200);
			assert.equal(res.type, 'application/json');
			assert.deepEqual(res.body, {error: 'Invalid value for locale field'});
			done();
		});
	});
	
	test("Translation with empty text: POST request to /api/translate", function(done){
		chai.request(server)
		.keepOpen()
		.post("/api/translate")
		.set('content-type', 'application/json')
		.send({text: "", locale: toAmerican})
		.end((err, res)=>{
			assert.equal(res.status, 200);
			assert.equal(res.type, 'application/json');
			assert.deepEqual(res.body, {error: 'No text to translate'});
			done();
		});
	});
	
	test("Translation with text that needs no translation: POST request to /api/translate", function(done){
		chai.request(server)
		.keepOpen()
		.post("/api/translate")
		.set('content-type', 'application/json')
		.send({text: text4, locale: toAmerican})
		.end((err, res)=>{
			assert.equal(res.status, 200);
			assert.equal(res.type, 'application/json');
			assert.deepEqual(res.body, {text: text4, translation: translator.translationManager(toAmerican, text4)});
			done();
		});
	});


});
