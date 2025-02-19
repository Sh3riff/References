package main

import (
	"crypto"
	"crypto/rsa"
	"crypto/sha256"
	"crypto/x509"
	"encoding/base64"
	"log/slog"
)


func verifySignaturew(signature, publicKey, payload string) (error) {
	pubKeyBytes, err := base64.StdEncoding.DecodeString(publicKey)
	if err != nil {
		slog.Error("error decoding public key: " + err.Error())
		return err
	}

	pubKey, err := x509.ParsePKIXPublicKey(pubKeyBytes)
	if err != nil {
		slog.Error("error parsing public key: " + err.Error())
		return err
	}

	rsaPubKey, ok := pubKey.(*rsa.PublicKey)
	if !ok {
		slog.Error("error: not an RSA public key")
		return err
	}

	payloadBytes := []byte(payload)
	sigBytes, err := base64.StdEncoding.DecodeString(signature)
	if err != nil {
		slog.Error("error decoding signature: " + err.Error())
		return err
	}

	hashed := sha256.Sum256(payloadBytes)
	if err = rsa.VerifyPKCS1v15(rsaPubKey, crypto.SHA256, hashed[:], sigBytes);err != nil {
		slog.Error("signature verification failed: " + err.Error())
	}

	return nil
}
