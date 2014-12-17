/**  	RSA Text Encryption  	**/
/**   	JAVASCRIPT  LIBRARY   	**/
//
// 	REQUIRED LIBRARIES:
//		- BigInt.js (http://www.leemon.com/crypto/BigInt.js)
//     
//	CURRENT VERSION:             		
//		0.9.1 (17/12/2014)  
//
//	CHANGELOG:			   		
//	* v0.9.1 (17/12/2014):
//  		- simplified code
//  	* v0.9.0 (04/12/2014):
//		- initial version for js
//
/**  	K911 BLOG (C) 2014   	**/

var Cipher = function(o) {
	"use strict";
	var c = this;
	//key 1024 bits can encode 127 long hash
	c.key_public = o.key_public;
	c.key_private = o.key_private;
	c.return_bigint = false;

	/* Convert text to string of numbers */
	/* IN:	                      string */
	/* OUT:	                 string(int,16) */
	c.txt2hex = function(a) {
		var result = new String, i;
		for ( i = 0; i < a.length; i++) {
			result += ('0' + (a.charCodeAt(i) - 32).toString(16)).slice(-2);
		}
		return result;
	};

	/* Convert string of numbers to text */
	/* IN:	                 string(int,16) */
	/* OUT:	                      string */
	c.hex2txt = function(a) {
		var result = new String, i;
		for ( i = 0; i < a.length; ) {
			result += String.fromCharCode(parseInt(a.slice(i, i += 2), 16) + 32);
		}
		return result;
	};

	/* Encrypt string using RSA */
	/* IN:	             string */
	/* OUT:	    hash(bigint,16) */
	c.encrypt = function(string) {
		var result = 0;
		if (c.key_public === undefined)
			console.log('key_public is missing or/and broken');
		else {
			//1 is added to prevent being 0 on top (eg. if first letter is A txt2Int returns 065)
			result = '1' + c.txt2hex(string);
			result = powMod(str2bigInt(result, 16), str2bigInt(c.key_public[0], 16), str2bigInt(c.key_public[1], 16));
			if (!c.return_bigint)
				result = bigInt2str(result, 16);
		}
		return result;
		//hash
	};

	/* Decrypt hash encrypted by RSA */
	/* IN:	         hash(bigint,16) */
	/* OUT:	                  string */
	c.decrypt = function(hash) {
		var result = 0;
		if (c.key_private === undefined)
			console.log('key_private is missing or/and broken');
		else {
			if (!c.return_bigint)
				hash = str2bigInt(hash, 16);
			result = powMod(hash, str2bigInt(c.key_private[0], 16), str2bigInt(c.key_private[1], 16));
			//remove 1 added by encrypt function
			result = bigInt2str(result, 16).substr(1);
			result = c.hex2txt(result);
		}
		return result;
		//string
	};

};
