const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {DateTime} = require('luxon');
const boom = require('boom');

admin.initializeApp();

const authSecret = functions.config().auth.secret;

exports.wifi = functions.https.onRequest(async (request, response) => {
  console.log('Body:', request.body);

  // Authenticate
  const attemptSecret = request.get('x-auth-secret');
  if (authSecret !== attemptSecret) {
    const error = boom.unauthorized();
    response.status(error.output.statusCode).send(error.output.payload);
    return;
  }

  const {
    method,
    mac,
    email,
    ingoingBytes,
    outgoingBytes,
    sessionStart,
    sessionEnd,
  } = request.body;

  const accessDoc = {};

  if (method !== undefined) {
    accessDoc.method = method;
  }

  if (mac !== undefined) {
    accessDoc.mac = mac;
  }

  if (email !== undefined) {
    try {
      accessDoc.email = decodeURIComponent(email);
    } catch (error) {
      console.log(error);
      accessDoc.email = email;
    }
  }

  if (ingoingBytes !== undefined) {
    accessDoc.ingoingBytes = attemptParseInteger(ingoingBytes);
  }

  if (outgoingBytes !== undefined) {
    accessDoc.outgoingBytes = attemptParseInteger(outgoingBytes);
  }

  // We don't parse the sessionStart or sessionEnd to timestamps since they don't seem to be reliable :-(
  if (sessionStart !== undefined) {
    accessDoc.sessionStart = attemptParseInteger(sessionStart);
  }
  if (sessionEnd !== undefined) {
    accessDoc.sessionEnd = attemptParseInteger(sessionEnd);
  }

  accessDoc.creation = DateTime.local().toJSDate();

  console.log('Writing Doc:', accessDoc);
  await admin.firestore().collection('access').doc().set(accessDoc);

  response.status(200).end();
});

function attemptParseInteger(input) {
  const integer = Number.parseInt(input);
  if (Number.isInteger(integer)) {
    return integer;
  }

  return input;
}