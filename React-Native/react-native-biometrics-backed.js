// npm i node-rsa
const NodeRSA = require("node-rsa");


const verify = (payload, signature, publicKey) => {
    try {
        const publicKeyBuffer = Buffer.from(publicKey, "base64");
        const buffer = Buffer.from(payload);
        
        const key = new NodeRSA();
        const signer = key.importKey(publicKeyBuffer, "public-der");
        const verified = signer.verify(buffer, signature, "utf8", "base64");
        return verified;
    } catch (error) {
      // handle error
        console.log("error: ", error)
    }
}
