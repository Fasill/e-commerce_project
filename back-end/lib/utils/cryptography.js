import jwt from "jsonwebtoken";
export function sign(payload, privateKey, algorithm) {
  return jwt.sign(JSON.stringify(payload), privateKey, {
    algorithm
  });
}
export function signES256(payload, privateKey) {
  return sign(payload, privateKey, 'ES256');
}