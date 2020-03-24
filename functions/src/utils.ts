import * as admin from 'firebase-admin';

export const authenticate = async (req: any) => {
  console.log('Check if request is authorized with Firebase ID token');

  if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
    !(req.cookies && req.cookies.__session)) {
    console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
      'Make sure you authorize your request by providing the following HTTP header:',
      'Authorization: Bearer <Firebase ID Token>',
      'or by passing a "__session" cookie.');
    return Promise.reject(new Error('Unauthorized'));
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    console.log('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else if (req.cookies) {
    console.log('Found "__session" cookie');
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    // No cookie
    return Promise.reject(new Error('Unauthorized'));
  }

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    console.log('ID Token correctly decoded', decodedIdToken);
    req.user = decodedIdToken;
    return Promise.resolve();
  } catch (error) {
    console.error('Error while verifying Firebase ID token:', error);
    return Promise.reject(new Error('Unauthorized'));
  }
};

export const successResponse = (data?: object) => {
  return JSON.stringify({
      data,
      status: true
  });
}

export const errorResponse = (error: string) => {
  return JSON.stringify({
      error,
      status: false
  });
}