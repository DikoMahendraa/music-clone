import {create} from 'apisauce';

const baseURL = 'https://api.music.apple.com/v1';

export const apisauceInstance = create({
  baseURL,
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjlLNlc3QzM4UlUifQ.eyJpYXQiOjE3MDc5OTg4NTMsImV4cCI6MTcyMzU1MDg1MywiaXNzIjoiRENUU1k0MlQyTiJ9.kcLtnMuGlSqH1qWfEWRDJd79zpFC0onC9LFPOWqVBuNiwAtmJHqlTPbWB4MEmWeJmtRcxfE2KP0qy6LBeRFMYw',
  },
});
