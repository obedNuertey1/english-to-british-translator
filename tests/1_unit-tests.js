const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();
let [toBritish, toAmerican] = ["american-to-british", "british-to-american"];

suite('Unit Tests', () => {

	suite("Translate to British", function(){

		test("Translate Mangoes are my favorite fruit. to British English", function(){
			assert.isString(translator.translationManager(toBritish, 'Mangoes are my favorite fruit.'));
			assert.equal(translator.translationManager(toBritish, 'Mangoes are my favorite fruit.'), 'Mangoes are my <span class="highlight">favourite</span> fruit.');
		});

		test("Translate I ate yogurt for breakfast. to British English", function(){
			assert.isString(translator.translationManager(toBritish, 'I ate yogurt for breakfast.'));
			assert.equal(translator.translationManager(toBritish, 'I ate yogurt for breakfast.'), 'I ate <span class="highlight">yoghurt</span> for breakfast.');
		});

		test("Translate We had a party at my friend's condo. to British English", function(){
			assert.isString(translator.translationManager(toBritish, "We had a party at my friend's condo."));
			assert.equal(translator.translationManager(toBritish, "We had a party at my friend's condo."), 'We had a party at my friend\'s <span class="highlight">flat</span>.');
		});

		test("Translate Can you toss this in the trashcan for me? to British English", function(){
			assert.isString(translator.translationManager(toBritish, "Can you toss this in the trashcan for me?"));
			assert.equal(translator.translationManager(toBritish, "Can you toss this in the trashcan for me?"), 'Can you toss this in the <span class="highlight">bin</span> for me?');
		});

		test("Translate The parking lot was full. to British English", function(){
			assert.isString(translator.translationManager(toBritish, "The parking lot was full."));
			assert.equal(translator.translationManager(toBritish, "The parking lot was full."), 'The <span class="highlight">car park</span>  was full.');
		});

		test("Translate Like a high tech Rube Goldberg machine. to British English", function(){
			assert.isString(translator.translationManager(toBritish, "Like a high tech Rube Goldberg machine."));
			assert.equal(translator.translationManager(toBritish, "Like a high tech Rube Goldberg machine."), 'Like a high tech <span class="highlight">Heath Robinson device</span>.  ');
		});

		test("Translate To play hooky means to skip class or work. to British English", function(){
			assert.isString(translator.translationManager(toBritish, "To play hooky means to skip class or work."));
			assert.equal(translator.translationManager(toBritish, "To play hooky means to skip class or work."), 'To <span class="highlight">bunk off</span>  means to skip class or work.');
		});

		test("Translate No Mr. Bond, I expect you to die. to British English", function(){
			assert.isString(translator.translationManager(toBritish, "No Mr. Bond, I expect you to die."));
			assert.equal(translator.translationManager(toBritish, "No Mr. Bond, I expect you to die."), 'No <span class="highlight">Mr</span> Bond, I expect you to die.');
		});

		test("Translate Dr. Grosh will see you now. to British English", function(){
			assert.isString(translator.translationManager(toBritish, "Dr. Grosh will see you now."));
			assert.equal(translator.translationManager(toBritish, "Dr. Grosh will see you now."), '<span class="highlight">Dr</span> Grosh will see you now.');
		});

		test("Translate Lunch is at 12:15 today. to British English", function(){
			assert.isString(translator.translationManager(toBritish, "Lunch is at 12:15 today."));
			assert.equal(translator.translationManager(toBritish, "Lunch is at 12:15 today."), 'Lunch is at <span class="highlight">12.15</span> today.');
		});
	});
	
	suite("Translate to American", function(){

		test("Translate We watched the footie match for a while. to American English", function(){
			assert.isString(translator.translationManager(toAmerican, "We watched the footie match for a while."));
			assert.equal(translator.translationManager(toAmerican, "We watched the footie match for a while."), 'We watched the <span class="highlight">soccer</span> match for a while.');
		});
		
		test("Translate Paracetamol takes up to an hour to work. to American English", function(){
			assert.isString(translator.translationManager(toAmerican, "Paracetamol takes up to an hour to work."));
			assert.equal(translator.translationManager(toAmerican, "Paracetamol takes up to an hour to work."), '<span class="highlight">Tylenol</span> takes up to an hour to work.');
		});
		
		test("Translate First, caramelise the onions. to American English", function(){
			assert.isString(translator.translationManager(toAmerican, "First, caramelise the onions."));
			assert.equal(translator.translationManager(toAmerican, "First, caramelise the onions."), 'First, <span class="highlight">caramelize</span> the onions.');
		});
		
		test("Translate I spent the bank holiday at the funfair. to American English", function(){
			assert.isString(translator.translationManager(toAmerican, "I spent the bank holiday at the funfair."));
			assert.equal(translator.translationManager(toAmerican, "I spent the bank holiday at the funfair."), 'I spent the <span class="highlight">public holiday</span>  at the <span class="highlight">carnival</span>.');
		});
		
		test("Translate I had a bicky then went to the chippy. to American English", function(){
			assert.isString(translator.translationManager(toAmerican, "I had a bicky then went to the chippy."));
			assert.equal(translator.translationManager(toAmerican, "I had a bicky then went to the chippy."), 'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.');
		});
		
		test("Translate I've just got bits and bobs in my bum bag. to American English", function(){
			assert.isString(translator.translationManager(toAmerican, "I've just got bits and bobs in my bum bag."));
			assert.equal(translator.translationManager(toAmerican, "I've just got bits and bobs in my bum bag."), 'I\'ve just got <span class="highlight">odds and ends</span>   in my <span class="highlight">fanny pack</span>. ');
		});
		
		test("Translate The car boot sale at Boxted Airfield was called off. to American English", function(){
			assert.isString(translator.translationManager(toAmerican, "The car boot sale at Boxted Airfield was called off."));
			assert.equal(translator.translationManager(toAmerican, "The car boot sale at Boxted Airfield was called off."), 'The <span class="highlight">swap meet</span>   at Boxted Airfield was called off.');
		});
		
		test("Translate Have you met Mrs Kalyani? to American English", function(){
			assert.isString(translator.translationManager(toAmerican, "Have you met Mrs Kalyani?"));
			assert.equal(translator.translationManager(toAmerican, "Have you met Mrs Kalyani?"), 'Have you met <span class="highlight">Mrs.</span> Kalyani?');
		});
		
		test("Translate Prof Joyner of King's College, London. to American English", function(){
			assert.isString(translator.translationManager(toAmerican, "Prof Joyner of King's College, London."));
			assert.equal(translator.translationManager(toAmerican, "Prof Joyner of King's College, London."), '<span class="highlight">Prof.</span> Joyner of King\'s College, London.');
		});
		
		test("Translate Tea time is usually around 4 or 4.30. to American English", function(){
			assert.isString(translator.translationManager(toAmerican, "Tea time is usually around 4 or 4.30."));
			assert.equal(translator.translationManager(toAmerican, "Tea time is usually around 4 or 4.30."), 'Tea time is usually around 4 or <span class="highlight">4:30.</span>');
		});
		
	});

	suite("Highlight translations", function(){

		let myRegex = /<span class="highlight">.+<\/span>/ig;
		test("Highlight translation in Mangoes are my favorite fruit.", function(){
			assert.isString(translator.translationManager(toBritish, "Mangoes are my favorite fruit."));
			assert.match(translator.translationManager(toBritish, "Mangoes are my favorite fruit."), myRegex);
			assert.notMatch(translator.translationManager(toAmerican, "Mangoes are my favorite fruit."), myRegex);
		});

		test("Highlight translation in I ate yogurt for breakfast.", function(){
			assert.isString(translator.translationManager(toBritish, "I ate yogurt for breakfast."));
			assert.match(translator.translationManager(toBritish, "I ate yogurt for breakfast."), myRegex);
			assert.notMatch(translator.translationManager(toAmerican, "I ate yogurt for breakfast."), myRegex);
		});
		
		test("Highlight translation in We watched the footie match for a while.", function(){
			assert.isString(translator.translationManager(toBritish, "We watched the footie match for a while."));
			assert.notMatch(translator.translationManager(toBritish, "We watched the footie match for a while."), myRegex);
			assert.match(translator.translationManager(toAmerican, "We watched the footie match for a while."), myRegex);
		});
		
		test("Highlight translation in Paracetamol takes up to an hour to work.", function(){
			assert.isString(translator.translationManager(toBritish, "Paracetamol takes up to an hour to work."));
			assert.notMatch(translator.translationManager(toBritish, "Paracetamol takes up to an hour to work."), myRegex);
			assert.match(translator.translationManager(toAmerican, "Paracetamol takes up to an hour to work."), myRegex);
		});

	});

});
