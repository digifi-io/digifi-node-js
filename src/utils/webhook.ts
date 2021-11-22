import * as crypto from 'crypto';

const HMAC_ALGORITHM = 'sha256';
const INPUT_ENCODING = 'utf8';
const DIGEST_ENCODING = 'hex';
const DEFAULT_TIMESTAMP_TOLERANCE = 1000 * 60 * 5; // 5 minutes in ms

export const verifyWebhookSignature = (
  payload: string,
  endpointSecret: string,
  timestamp: string,
  signature: string,
) => {
  const expectedSignature = crypto
    .createHmac(HMAC_ALGORITHM, endpointSecret)
    .update(`${timestamp}.${payload}`, INPUT_ENCODING)
    .digest(DIGEST_ENCODING);

  return expectedSignature === signature;
};

export const verifyWebhookTimestamp = (timestamp: string, tolerance = DEFAULT_TIMESTAMP_TOLERANCE) => {
  const timestampAge = Date.now() - new Date(timestamp).getTime();

  return timestampAge <= tolerance;
};
