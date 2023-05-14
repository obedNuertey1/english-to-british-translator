const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  constructor(){
	this.americanOnly = americanOnly;
	this.americanToBritishSpelling = americanToBritishSpelling;
	this.americanToBritishTitles = americanToBritishTitles;
	this.britishOnly = britishOnly;
	this.britishToAmericanSpelling = this.swapRoles(americanToBritishSpelling);
	this.britishToAmericanTitles = this.swapRoles(americanToBritishTitles);
	this.updated = false;
  }

	//  this function swap the roles of elements of the objects
	// values become properties and properties becomes values
	// It returns an object with the swap roles
	swapRoles(obj){
		const props = Object.keys(obj);
		const vals = Object.values(obj);

		const newObj = {};
		vals.forEach((elem, index, arr)=>{
			newObj[elem] = props[index];
		});

		return newObj;
	}

	//  converts first letter that preceeds a fullstop or that starts the sentence to uppercase
	letterToUpper(sentence){
		let regex = /^([a-z]).*\s?/i;
		let matchStrArr = sentence.match(regex);
		let firstLetter = "";
		let sentenceArr = sentence.split('');
		try{
			if(Array.isArray(matchStrArr)){
				if(matchStrArr.length > 1){
					if(matchStrArr[1] != matchStrArr[1].toUpperCase()){
						this.updated = true;
					}
				}
			}
			if(Array.isArray(matchStrArr)){
				if(matchStrArr[1]){
					firstLetter = matchStrArr[1].toUpperCase();
					sentenceArr[0] = firstLetter;
					return sentenceArr.join('');
				}
			}else{
				return sentence;
			}
		}catch(err){
			return err;
		}
	}

	exclusiveToLang(sentence, obj){
		if(!Boolean(sentence) === true) return 'false';
		const objProps = Object.keys(obj);

		const sentenceArr = sentence.split(" ");
		sentenceArr.forEach((elem, index, arr)=>{
			let elemLowerCase = (elem.toLowerCase()).match(/[a-z]+/gi);
			if(Boolean(elemLowerCase)){
				elemLowerCase = elemLowerCase[0];
			}
			let phrase = "";

			if(Boolean(arr[index+1]) == true){
				phrase = elem.concat(" " + (arr[index+1]).match(/[a-z]+/gi)).toLowerCase();
			}

			let phrase2 = "";
			if(Boolean(arr[index+1]) == true && Boolean(arr[index+2]) == true){
				phrase2 = elem.concat(" " + (arr[index+1]) + " " + (arr[index+2]).match(/[a-z]+/gi)).toLowerCase();
			}

			if(objProps.includes(phrase2)){
				this.updated = true;

				let fullstopRegex = /\.$/ig;
				if(fullstopRegex.test(arr[index+2])){
					sentenceArr[index] = `<span class="highlight">${obj[phrase2]}</span>.`;
				}else{
					sentenceArr[index] = `<span class="highlight">${obj[phrase2]}</span>`;
				}

				sentenceArr[index+1] = "";
				sentenceArr[index+2] = "";
			}else if(objProps.includes(phrase)){
				this.updated = true;

				let fullstopRegex = /\.$/ig;
				if(fullstopRegex.test(arr[index+1])){
					sentenceArr[index] = `<span class="highlight">${obj[phrase]}</span>.`;
				}else{
					sentenceArr[index] = `<span class="highlight">${obj[phrase]}</span>`;
				}

				sentenceArr[index+1] = "";
			}else if(objProps.includes(elemLowerCase)){
				this.updated = true;

				let fullstopRegex = /\.$/ig;
				if(fullstopRegex.test(arr[index])){
					sentenceArr[index] = `<span class="highlight">${obj[elemLowerCase]}</span>.`;
				}else{
					sentenceArr[index] = `<span class="highlight">${obj[elemLowerCase]}</span>`;
				}
			}
		});

		return sentenceArr.join(" ");
	}

	//Returns a sentence if locale is equal to american-to-british
	//  else it returns false
	convertAmericanOnly(locale, sentence){
		if(locale != "american-to-british") return 'false';

		return this.exclusiveToLang(sentence, this.americanOnly);
	}


	//  Returns a sentence if Locale is equal to british-to-american
	//else it returns false
	convertBritishOnly(locale, sentence){
		if(locale != "british-to-american") return 'false';

		return this.exclusiveToLang(sentence, this.britishOnly);
	}

	titlesSuperConverter(sentence, titlesObj){
		const titleProps = Object.keys(titlesObj);
		const sentenceArr = sentence.split(" ");
		sentenceArr.forEach((elem, index, arr)=>{
			let elemLowerCase = elem.toLowerCase();

			if(titleProps.includes(elemLowerCase)){
				this.updated = true;
				let capFirstLetter = titlesObj[elemLowerCase];
				capFirstLetter = capFirstLetter.split("");
				capFirstLetter[0] = capFirstLetter[0].toUpperCase();
				capFirstLetter = capFirstLetter.join("");
				sentenceArr[index] = `<span class="highlight">${capFirstLetter}</span>`;
			}
		});
		return sentenceArr.join(" ");
	}
	
	convertToBritishTitles(locale, sentence){
		if(locale != 'american-to-british') return 'false';

		return this.titlesSuperConverter(sentence, this.americanToBritishTitles);
	}

	//  converts" british to american" titles and returns a string else false
	convertToAmericanTitles(locale, sentence){
		if(locale != 'british-to-american') return 'false';

		return this.titlesSuperConverter(sentence, this.britishToAmericanTitles);
	}

	spellingSuperConverter(sentence, spellingObj){

		const ObjProps = Object.keys(spellingObj);
		const sentenceArr = sentence.split(" ");

		sentenceArr.forEach((elem, index, arr)=>{
			let elemLowerCase = elem.toLowerCase();
			let phrase = elem.concat(" " + arr[index+1]).toLowerCase();

			if(ObjProps.includes(phrase)){
				this.updated = true;
				sentenceArr[index] = `<span class="highlight">${spellingObj[phrase]}</span>`;
				sentenceArr[index+1] = "\b";
			}else if(ObjProps.includes(elemLowerCase)){
				this.updated = true;
				sentenceArr[index] = `<span class="highlight">${spellingObj[elemLowerCase]}</span>`;
			}
		});

		return sentenceArr.join(" ");
	}

		//  Returns a sentence if locale is equal to british-to-american
	//If locale is not equal to british-to-american returns "{error: "Invalid value for locale field"}" or false
	convertBritishToAmerican(locale, sentence){
		if(locale != 'british-to-american') return 'false';

		return this.spellingSuperConverter(sentence, this.britishToAmericanSpelling);
	}

		//Returns a sentence if locale is equal to american-to-british
	//If locale is not equal to american-to-british returns "{error: "Invalid value for locale field"}" or false
	convertAmericanToBritish(locale, sentence){
		if(locale != "american-to-british") return 'false';
		
		return this.spellingSuperConverter(sentence, this.americanToBritishSpelling);
	}

	timeSuperConverter(locale, sentence, target, replaceWith){
		
		const sentenceArr = sentence.split(" ");
		
		for(let i = 0; i < sentenceArr.length; i++){
			
			let timeRegex;
			if(locale == "british-to-american"){
				timeRegex = /\d{1,2}\.\d{1,2}.*/g;
			}else if(locale == "american-to-british"){
				timeRegex = /\d{1,2}:\d{1,2}.*/g;
			}
			
			if(timeRegex.test(sentenceArr[i])){
				this.updated = true;
				let elem = sentenceArr[i];

				elem = this.timeStrToArrFormater(elem);

				let elemArr = elem[0].split("");
				elemArr[elemArr.indexOf(target)] = replaceWith;
				elem[0] = elemArr.join("");
				sentenceArr[i] = `<span class="highlight">${elem[0]}</span>${elem[1]}`;
			}
		}

		return sentenceArr.join(" ");
	}

	timeStrToArrFormater(str){
		return str.split('').reduce((accum, elem)=>{
			if((/[\d\.:]/ig).test(elem)){
				accum[0] = accum[0] + elem;
			}else{
				accum[1] = accum[1] + elem;
			}
			return accum;
		}, ["", ""]);
	}



    //  Converts british time to american time
	convertToAmericanTime(locale, sentence){
		if(locale != 'british-to-american') return 'false';
  
		const timeRegex = /\d{1,2}\.\d{1,2}|.+/ig;
		return this.timeSuperConverter(locale, sentence, ".", ":");
	}

	//  Converts british time to american time
	convertToBritishTime(locale, sentence){
		if(locale != 'american-to-british') return 'false';

		const timeRegex = /\d{1,2}:\d{1,2}|.+/ig;
		return this.timeSuperConverter(locale, sentence, ":", ".");
	}


	getTime(func){
		return func;
	}

	convertAllToAmerican(locale, sentence){
		if(locale != 'british-to-american') return 'false';

		//sentence = this.convertAmericanOnly(locale, sentence);
		sentence = this.convertBritishOnly(locale, sentence);
		sentence = this.convertToAmericanTitles(locale, sentence);
		sentence = this.convertBritishToAmerican(locale, sentence);
		sentence = this.getTime(this.convertToAmericanTime(locale, sentence));
		sentence = this.letterToUpper(sentence);
		if(this.updated === true){
			this.updated = false;
			return sentence;
		}

		return "Everything looks good to me!";
	}

	convertAllToBritish(locale, sentence){
		if(locale != 'american-to-british') return 'false';

		sentence = this.convertAmericanOnly(locale, sentence);
		//sentence = this.convertBritishOnly(locale, sentence);
		sentence = this.convertToBritishTitles(locale, sentence);
		sentence = this.convertAmericanToBritish(locale, sentence);
		sentence = this.getTime(this.convertToBritishTime(locale, sentence));
		sentence = this.letterToUpper(sentence);
		if(this.updated === true){
			this.updated = false;
			return sentence;
		}
		return "Everything looks good to me!";
	}

	translationManager(locale, sentence){
		if(locale == "british-to-american"){
			return this.convertAllToAmerican(locale, sentence);
		}
		if(locale == "american-to-british"){
			return this.convertAllToBritish(locale, sentence);
		}
		return false;
	}

}

const translator = new Translator();

console.log(translator.convertBritishOnly('british-to-american', ' car boot sale '));
//console.log(translator.britishToAmericanSpelling);
//console.log(translator.translationManager('british-to-american', 'Loba 10.24am 10.24 10.35am 10.24pmkj'));

//console.log(translator.letterToUpper("ikjh am dishrag going certified mail to church. ikjhkj cell phone Will be back.Tommorrow"));

//console.log(translator.convertToBritishTitles('american-to-british', "mr. A mr. b. Dr. A dr. C"));

//console.log(translator.convertAmericanToBritish("american-to-british", "I am a acclimatizing" ));

//console.log(translator.updated);

//console.log(translator.convertAmericanOnly("american-to-british" , "ikjh am dishrag going certified mail to church. ikjhkj cell phone Will be back.Tommorrow"));

//console.log(translator.convertBritishOnly("british-to-american" , "ikjh am dishrag going certified black pudding mail biro to church. ikjhkj cell phone Will be back.Tommorrow"));

// console.log(americanOnly);


module.exports = Translator;