
/*
Import an AES secret key from an ArrayBuffer containing the raw bytes.
Takes an ArrayBuffer string containing the bytes, and returns a Promise
that will resolve to a CryptoKey representing the secret key.
*/
async function secretKey() {
    var keyData = (new TextEncoder).encode(process.env.NEXT_PUBLIC_CRYPTO_KEY);
    return window.crypto.subtle.importKey(
        "raw",
        keyData,
        {
            name: "AES-CBC"
        },
        true,
        ["encrypt", "decrypt"]
    );
}

async function encrypt(message) {
    const TE = new TextEncoder();
    const encoded = TE.encode(message);
 
    return window.crypto.subtle.encrypt({
            name: process.env.NEXT_PUBLIC_CIPHER,
            iv: TE.encode(process.env.NEXT_PUBLIC_CRYPTO_IV),
        },
        await secretKey(),
        encoded,
    );
}

async function decrypt(encoded) {
    const TE = new TextEncoder();
    const text = await window.crypto.subtle.decrypt({
            name: process.env.NEXT_PUBLIC_CIPHER,
            iv: TE.encode(process.env.NEXT_PUBLIC_CRYPTO_IV),
        },
        await secretKey(),
        encoded,
    );
    return (new TextDecoder())
    .decode(text);

}

export {encrypt, decrypt};