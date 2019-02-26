import { path, pipe, pick } from 'ramda';

export const extractUserData = pipe(
  path(['idTokenPayload']),
  pick(['name', 'gender', 'email', 'picture']),
);
