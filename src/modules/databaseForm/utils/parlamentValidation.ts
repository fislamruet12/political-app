
import * as Yup from "yup";
import { MemberType } from "../../../../typings/form-data";

export const validationSchema = Yup.object().shape({
  zone: Yup.number().test(
    "selection",
    "Zone is Required",
    (number) => number !== 0
  ), 
    parlament_seat: Yup.number().test(
      "selection",
      "Parlamentry seat is Required",
      (number) => number !== 0
    ), 
     divisionId: Yup.number().test(
      "selection",
      "Division is Required",
      (number) => number !== 0
    ),
    districtId: Yup.number().test(
      "selection",
      "District is Required",
      (number) => number !== 0
    ),
    districtOrder: Yup.number().test(
        "selection",
        "District order is Required",
        (number) => number !== 0
      ),
    partyId: Yup.number().test(
      "selection",
      "Party Name is Required",
      (number) => number !== 0
    ),
    elakaName:Yup.string().required("Field is Required"),
    name: Yup.string().required("Field is Required"),
    contact_number: Yup.string().required("Phone number is Required"),
    nid: Yup.string().required("NID number is Required"),
    createDate: Yup.number(),
  });

  export const initialValues: MemberType = {
    zone:0,
    parlament_seat:0,
    divisionId: 0,
    districtId:0,
    districtOrder:0,
    partyId:0,
    elakaName:"",
    name:"",
    contact_number:"",
    nid:"",
    createDate: new Date().getTime(),
    active: 1,
  };