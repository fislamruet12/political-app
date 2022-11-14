
export type SignInData = {
  email:string;
  password: string;
};
export type AccessInData = {
  name:string;
  value: string;
};
export type SignUpData = {
  name: string;
  countryCode: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

export type SignUpConfirmData = {
  countryCode: string;
  phoneNumber: string;
  otp: string;
};



export type ProblemRequestType = {
  deviceIdentityNumber: string;
  roomNumber: string;
  correctionType: string;// (replace, repair,networkIssue)
  description: string;
  issueDate: number;
  phoneNumber: string
  solveStatus: number

};

export type DeviceInfoType = {
  roomNumber: string;
  floorNumber: number;
  buildingName: string;
  sectionName: string;
  deviceName: string;
  deviceIdentityNumber: string;
  deviceInfo: string;
  userRank: string;
  createDate: number
}
export type SolverType = {
  deviceIdentityNumber: string;
  solverbp: [];
  actualIssue: string;
  solveDate: number;
  dateString:string;
}

export type HelperSolverType={
  bp:string;
  helper:string;
  userRank:string;
  phone:string;
  sectionName:string;
  actualIssue:string;
  demo:string

}


export type HelperType={
  bp:string;
  helper:string;
  userRank:string;
  phone:string;
  sectionName:string;
}

export type PersonTyp={
  divisionId:number;
  districtId:number;
  partyId:number;
  podobi:number;
  name:string;
  contact_number:string
  fatherName:string;
  motherName:string;
  nid:string;
  presentAddress:string
  parmanentAddress:string;
  createDate:number;
  active:number;
 
}