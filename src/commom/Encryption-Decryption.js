import * as CryptoJS from 'crypto-js';
import * as constants from './constants';
import JSEncrypt from 'jsencrypt';
import config from '../config';
var crypto = require("crypto");
const PK=constants.publickey;
// ************ For New Encryption *********** //


export function encryptionDataWithRandomKey(toEncrypt) {
    var secretPhrase = CryptoJS.lib.WordArray.random(8);
    var salt = CryptoJS.lib.WordArray.random(128 / 8);
    //aes key 128 bits (16 bytes) long
    var aesKey = CryptoJS.PBKDF2(secretPhrase.toString(), salt, {
        keySize: 128 / 32
    });
    //initialization vector - 1st 16 chars of userId
    var iv = CryptoJS.enc.Utf8.parse(config.guid.slice(0, 16));
    var aesOptions = { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: iv };
    var aesEncTrans = CryptoJS.AES.encrypt(JSON.stringify(toEncrypt), aesKey, aesOptions);
    return aesEncTrans;

};


export function encryptHeader(aesEncTrans) {
    var rsaEncrypt = new JSEncrypt();
    rsaEncrypt.setPublicKey(PK);
    console.log(aesEncTrans.key.toString());
    var rsaEncryptedAesKey = rsaEncrypt.encrypt(aesEncTrans.key.toString());
    return rsaEncryptedAesKey;
};

// ************ END *********** //


export function Encrypt(data, temp) {

    var jsonString = JSON.stringify(data);



    var key = CryptoJS.enc.Utf8.parse('MQ8wDQYDVQQHDAZN');
    var iv = CryptoJS.enc.Utf8.parse('MQ8wDQYDVQQHDAZN');
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonString), key,
        {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });


    // return encodeURIComponent(encrypted);
    return temp ? encodeURIComponent(encrypted) : data;

}


export function EncryptNew(data, flag) {


    var key = CryptoJS.enc.Utf8.parse('MQ8wDQYDVQQHDAZN');
    var iv = CryptoJS.enc.Utf8.parse('MQ8wDQYDVQQHDAZN');
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key,
        {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });


    return encodeURIComponent(encrypted);

}

export function decryptData(data) {

    var dataValue = decodeURIComponent(data);
    var key = CryptoJS.enc.Utf8.parse('MQ8wDQYDVQQHDAZN');
    var iv = CryptoJS.enc.Utf8.parse('MQ8wDQYDVQQHDAZN');

    var decrypted = CryptoJS.AES.decrypt(dataValue, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    var jsonString = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));

    return jsonString;

}
export function decryptDataNew(data) {

    var dataValue = decodeURIComponent(data);
    var key = CryptoJS.enc.Utf8.parse('MQ8wDQYDVQQHDAZN');
    var iv = CryptoJS.enc.Utf8.parse('MQ8wDQYDVQQHDAZN');

    var decrypted = CryptoJS.AES.decrypt(dataValue, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    var jsonString = decrypted.toString(CryptoJS.enc.Utf8);

    return jsonString;

}

//added by cc

export function EncryptRandomKeyJson(data, key) {
    var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL

    var cipher = crypto.createCipher(algorithm, key.toString());

    var encrypted = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');

    return encrypted;

}


export function decryptDataRandomKeyJson(data, key1) {

    var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL

    var decipher = crypto.createDecipher(algorithm, key1.toString());

    var decipherText = decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');

    return decipherText;

}


export function EncryptRandomKey(data) {

    var key = "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA1C5anYYOQQoGUFR9vBFpPb0ISAX1nmU6H+gFRrkwLerX4uQzhvwJyqPiAHywO88pc/3DHMo2V08peaNdQR2FaSP6aRSvaP1El9NneIAGAEcGnvfpRk/H1KLKOCwAkUE69HTZLQ220I+TtO8G0JNlIC/K+jXH5AeRp9O7xlJqUP7lULC8dxI2paI0HQTCxZK1+9P9GGqFMbO4KeC/Z4/NWOY60f8Ilqx6oe2S0JadJczA/qOvGypqSEn+fYWzD2ni4bmSlewRXuOa5WVh6Z7liX3ypidLZ6dFVjtRWlJ4qbuPWIT2QlyzdP7FMpJwwXcMRr9H5+e0x/HAwQzuP+4O+V195Jms3IyjmTf0Jq5ek44g+lOi+km5V3oxID9xrCGJ18gTSaJVAigyWCsLRFzC4DWdS+JO/Ho8VpPrEWlpemj+ybiYQnVsSsz4irf88C+Wx+r1T7KRy9bl94lUudbUNHMmtGiyQOAvrNuuFpkHwltgGu/T2Y+m5PhyiE+fUV4VEMQmoj5ps4w+4uI/T7XWGgLQY2frcqBsxZwD5z1XvlnIPBO/Zo3MSZ5jnTspE0euMrsHs348qZJUCuK/ANhQmOIys9ne3HNRPwDPPdjrd0pRHCC6Si3DHwjnbsQ3FmUeMKegEysFX8L+KCMWZGFiPgdHO/VESO/8Ecfc5k2Vkc0CAwEAAQ=="

    // var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL

    // var cipher = crypto.createCipher(algorithm, key.toString()); 

    // var encryptedkey = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');

    // return encryptedkey; 

    //
    var publicKey = key;
    var buffer = new Buffer(data);
    var encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");

    //

}


//

