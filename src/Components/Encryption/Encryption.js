import forge from 'node-forge';

let publicKey = '$2b$14$MHowX8pTIf/fdWvGVxBem.2am3a2i0csLswI1O39TztsETB38HDdy';

export function encryptWithRSA(data) {
    const encrypted = forge.pki.publicKeyFromPem(publicKey).encrypt(data, "RSA-OAEP");
    return forge.util.encode64(encrypted);
};

// , {
//     md: forge.md.sha256.create(),
//     mgf1: forge.mgf1.create()
// }