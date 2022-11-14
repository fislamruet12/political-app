import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '~/../typings/structures';
import { SignInData, SignUpConfirmData, SignUpData } from '~/../typings/form-data';
import client from '~/api/client';

type SignInResponseData = {
  data: {
    access_token: string;
    userDetails: {
      id: number;
      country_code: string;
      phone_number: string;
    };
  };
};

const signInRequest$ = (data: SignInData): Observable<User> => client
  .post<SignInResponseData>('login', {
    country_code: data.countryCode,
    phone_number: data.phoneNumber,
    password: data.password
  })
  .pipe(
    map((response) => {
      const responseData = response.data;
      const user: User = {
        id: responseData.data.userDetails.id,
        countryCode: responseData.data.userDetails.country_code,
        phoneNumber: responseData.data.userDetails.phone_number,
        accessToken: responseData.data.access_token
      };

      return user;
    })
  );

const signUpRequest$ = (data: SignUpData): Observable<any> => client.post('register-request-otp', {
  name: data.name,
  phone_number: data.phoneNumber,
  country_code: data.countryCode,
  password: data.password,
  confirm_password: data.confirmPassword
});

const signUpConfirmRequest$ = (data: SignUpConfirmData): Observable<any> => client.post('confirm-registration-otp', {
  country_code: data.countryCode,
  phone_number: data.phoneNumber,
  otp: data.otp
});

export default {
  signInRequest$,
  signUpRequest$,
  signUpConfirmRequest$
};
