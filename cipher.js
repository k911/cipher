/**  RSA Text Encryption  **/
/*   JAVA SCRIPT LIBRARY   */
/*   USES:                 */
/*     bigInt.js           */
/*   VERSION:              */
/*     04/12/2014          */
/**  K911 BLOG (C) 2014   **/

var Cipher = function(o) {
	"use strict";
	var c = this;
	//key 1024 bits can encode 127 long hash
	c.key_public = ['0', '0'];
	c.key_private = ['0', '0'];

	if ( typeof o.key_pubic != undefined)
		c.key_public = o.key_public;
	if ( typeof o.key_private != undefined)
		c.key_private = o.key_private;

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
		var key, result;
		key = c.key_public;
		if (key[0] == '0' || key[1] == '0') {
			result = 0;
			console.log('key_public is missing or/and broken');
		} else {
			//1 is added to prevent being 0 on top (eg. if first letter is A txt2Int returns 065)
			result = '1' + c.txt2hex(string);
			result = powMod(str2bigInt(result, 16), str2bigInt(key[0], 16), str2bigInt(key[1], 16));
			result = bigInt2str(result, 16);
		}
		return result;
		//hash
	};

	/* Decrypt hash encrypted by RSA */
	/* IN:	         hash(bigint,16) */
	/* OUT:	                  string */
	c.decrypt = function(hash) {
		var key, result;
		key = c.key_private;
		if (key[0] == '0' || key[1] == '0') {
			result = 0;
			console.log('key_private is missing or/and broken');
		} else {
			result = powMod(str2bigInt(hash, 16), str2bigInt(key[0], 16), str2bigInt(key[1], 16));
			//remove 1 added by encrypt function
			result = bigInt2str(result, 16).substr(1);
			result = c.hex2txt(result);
		}
		return result;
		//string
	};

};
