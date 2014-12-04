Cipher is simple rsa text encryption and decryption (mini) library, currently available in javascript and php.

I've created this for personal use: to encrypt data on client side and safely send it to server by ajax.
You can use that for example for submiting forms using ajax.

ATTENTION: [JavaScript] cipher.js library uses bigInt.js library due to support of big int values 
(RSA is safe using >1024bit key), whereas js max int is 52bit.

DOCUMENTATION:

KEYS
- Standart RSA Key Pair structure (http://en.wikipedia.org/wiki/RSA_%28cryptosystem%29#Key_generation)
Key Public = [e,n];
Key Private = [d,n];

FUNCTIONS
- txt2hex() : converts ASCII chars to hex two-digits number (e.g. "l" => "4c", "rsa" => "525341");
Warning: this function supports only chars starting from: " "(space)[char decimal value = 32]
- hex2txt() : convert hex string back to ASCII text; (e.g. "4c" => "l", "525341" => "rsa")
- encrypt() : encrypts string (ASCII text) by RSA using public key and returns hexadecimal hash;
- decrypt() : decrypts hexadecimal hash by RSA using private key and returns string (ASCII text);
