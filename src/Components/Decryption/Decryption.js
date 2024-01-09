import CryptoJS from 'crypto-js';

export function decryptWithRSA(ciphertext) {
    let password = "lazydog";
    let salt = "salt";
    let iterations = 128;

    let bytes = CryptoJS.PBKDF2(password, salt, { keySize: 48, iterations: iterations });
    let iv = CryptoJS.enc.Hex.parse(bytes.toString().slice(0, 32));
    let key = CryptoJS.enc.Hex.parse(bytes.toString().slice(32, 96));

    const decryptedBytes = CryptoJS.AES.decrypt(ciphertext, key, { iv: iv });
    const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedText;
}