/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

export enum ROOT_NAVIGATION {
  APP = 'APP',
  AUTH = 'AUTH',
  FORM='FORM',
  DRAWER='DRAWER',
  ROOT='ROOT'
}

export type RootNavigationParams = {
  [ROOT_NAVIGATION.APP]: undefined;
  [ROOT_NAVIGATION.AUTH]: undefined;
};

export enum APP_NAVIGATION {
  LANDING='LANDING',
  DASHBOARD = 'DASHBOARD',
  HELPER='HELPER',
  COMPLAIN='COMPLAIN',
  DEVICE='DEVICE',
  PROBLEM='PROBLEM',
  PARTY='PARTY',
  DETAILS='DETAILS'
}

export type AppNavigationParams = {
  [APP_NAVIGATION.LANDING]:undefined;
  [APP_NAVIGATION.DASHBOARD]: undefined;
  [APP_NAVIGATION.HELPER]:undefined;
  [APP_NAVIGATION.COMPLAIN]:undefined;
  [APP_NAVIGATION.DEVICE]:undefined;
  [APP_NAVIGATION.PROBLEM]:undefined;
  [APP_NAVIGATION.PARTY]:undefined;
  [APP_NAVIGATION.DETAILS]:undefined;
};

export enum AUTH_NAVIGATION {
  SIGN_IN = 'SIGN_IN',

}

export type AuthNavigationParams = {
  [AUTH_NAVIGATION.SIGN_IN]: undefined;
 
};
export enum COMPLAIN_NAVIGATION{
  SENDCOMPLAIN='SENDCOMPLAIN'
}

export type ComplainNavigation={
  [COMPLAIN_NAVIGATION.SENDCOMPLAIN]:undefined
}

export enum DEVICE_NAVIGATION{
  DEVICEINFO='DEVICEINFO',
  QRCODE='QRCODE',
  BARCODE='BARCODE'
}

export type DeviceNavigation={
  [DEVICE_NAVIGATION.DEVICEINFO]:undefined,
  [DEVICE_NAVIGATION.QRCODE]:undefined,
  [DEVICE_NAVIGATION.BARCODE]:undefined,
}


export enum PROBLEM_NAVIGATION{
  PROBLEMINFO='PROBLEMINFO',
  SOLVER ='SOLVER',
  PRINT='PRINT'
}

export type ProblemNavigation={
  [PROBLEM_NAVIGATION.PROBLEMINFO]:undefined
   [PROBLEM_NAVIGATION.SOLVER]:undefined;
   [PROBLEM_NAVIGATION.PRINT]:undefined
}




export enum FORM_NAVIGATION{
  FORMHOME='FORMHOME',
  DIVISIONHOME='DIVISIONHOME',
  MOHANOGORHOME='MOHANOGORHOME',
  PARTYINPUT='PARTYINPUT',
  ACCESS='ACCESS'
}

export type FormNavigation={
  [FORM_NAVIGATION.FORMHOME]:undefined;
  [FORM_NAVIGATION.DIVISIONHOME]:undefined;
  [FORM_NAVIGATION.MOHANOGORHOME]:undefined;
  [FORM_NAVIGATION.PARTYINPUT]:undefined;
  [FORM_NAVIGATION.ACCESS]:undefined;
}


export enum PARLAMENT_NAVIGATION{
  PARLAMENT='PARLAMENT',
}

export type ParlamentNavigation={
  [PARLAMENT_NAVIGATION.PARLAMENT]:undefined;
  [PARLAMENT_NAVIGATION.EDITPARLAMENT]:undefined;
  
}

export enum EDIT_NAVIGATION{
 
  EDITPARLAMENT='EDITPARLEMENT',
  EDITCOMMITY='EDITCOMMITY'
}

export type EditNavigation={
[EDIT_NAVIGATION.EDITCOMMITY]:undefined;
[EDIT_NAVIGATION.EDITPARLAMENT]:undefined  
}