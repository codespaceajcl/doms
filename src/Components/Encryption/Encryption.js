import CryptoJS from 'crypto-js';

export function encryptWithRSA(data) {
    let password = "lazydog";
    let salt = "salt";
    let iterations = 128;

    // let bytes = CryptoJS.PBKDF2(password, salt, { keySize: 48, iterations: iterations });

    // let iv = CryptoJS.enc.Hex.parse(bytes.toString().slice(0, 32));
    // let key = CryptoJS.enc.Hex.parse(bytes.toString().slice(32, 96));

    let key = 'CDAISLAMABAD2023'
    let iv = '3202DABAMALSIADC'

    let ciphertext = CryptoJS.AES.encrypt(data, key, { iv: iv });
    return ciphertext.toString()
};
