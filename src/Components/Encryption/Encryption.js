import forge from 'node-forge';
// import { JSEncrypt } from "jsencrypt";

// var encrypt = new JSEncrypt();

// var crypt = new JSEncrypt({ default_key_size: 1024 });
// var PublicPrivateKey = {
//     PublicKey: crypt.getPublicKey(),
//     PrivateKey: crypt.getPrivateKey()
// };

const publicKey = '-----BEGIN PUBLIC KEY-----MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgG6hXRHzWXL+mPBQg4WQNnB6e6gZqqcH9vg5Rl226+xrCeGmihELm1n7RVL+I6S3hYPwj4UkAg1lSuB55vMYadzgfBgA3xARwuxmtUot5Pj+IFmw9tUdb/RNl+6jFCS63/aPOyragO+/avGrx16Cltlp593iqMR6AGibckCEiKS3AgMBAAE=-----END PUBLIC KEY-----'
const privateKey = '-----BEGIN RSA PRIVATE KEY-----MIICXAIBAAKBgG6hXRHzWXL+mPBQg4WQNnB6e6gZqqcH9vg5Rl226+xrCeGmihELm1n7RVL+I6S3hYPwj4UkAg1lSuB55vMYadzgfBgA3xARwuxmtUot5Pj+IFmw9tUdb/RNl+6jFCS63/aPOyragO+/avGrx16Cltlp593iqMR6AGibckCEiKS3AgMBAAECgYA5EsJDCnoxGyunfsH7W8TaDjZRKLyjYzaEJHgqzL21wBre8N31oTlKGJlREY8t4QfeY3KHS2ZLpuAUIo+FBilGfTskr1y/9wRrjocOg4dXdKsnhBVOTuVw5UvAPo5/VtjirCTf48HhEw6ITRomUN1QY08d0zNBfyBCzlWRAtR2QQJBALyksDDvqiemnw9O6cdmNkjJ7pG7WqqPN7g94PT4pzVO5k3LGsxsukwp20u/OcrGoFAmu/FhXVjcOjWao/qn6rECQQCWIb7OulsO859Z5NjFbjdrOI3d6ZRfb4K615DZr0LJB22nEaC+8Ocyabjd+fk7xrQXSi/2gqdlNoU9sbJ+W4/nAkABh0gSLW7wgU4anqYQQojAEDrJnX3/kcd+y6mN8pHQQcJl8PZXn63mvhQTygna1b8oxxeQvhw2gxpJouYfOssRAkEAkb60w2/6UiuDuPsGzbNPrZE7eAD3/yX73XLDtfAEf6/sbVIZoQOxDinARA4WPEeMMUfeBAuWghVJiDjntO8iZQJBAIe/rX1DVBrko/93lMpUJRrJEKfqWlZnosKE/U2hgXLLljJYl6qd00WRa97Q2CrSmRfrnWInJJreaYSmtSbE84Q=-----END RSA PRIVATE KEY-----'

export function encryptWithRSA(data) {
    const encrypted = forge.pki.publicKeyFromPem(publicKey).encrypt(data, "RSA-OAEP");
    return forge.util.encode64(encrypted);
};