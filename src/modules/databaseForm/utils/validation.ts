
import * as Yup from "yup";
import { PersonTyp } from "../../../../typings/form-data";

export const validationSchema = Yup.object().shape({
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
    partyId: Yup.number().test(
      "selection",
      "Party Name is Required",
      (number) => number !== 0
    ),
    organ: Yup.number().test(
      "selection",
      "Organization Name is Required",
      (number) => number !== 0
    ),
    podobi: Yup.number().test(
      "selection",
      "Designation is Required",
      (number) => number !== 0
    ),
    status:Yup.number(),
    name: Yup.string().required("Name is Required"),
    contact_number: Yup.string().required("Phone number is Required"),
    fatherName: Yup.string(),
    motherName: Yup.string(),
    nid: Yup.string(),
    presentAddress: Yup.string(),
    parmanentAddress: Yup.string(),
    createDate: Yup.number(),
  });

  export const initialValues: PersonTyp = {
    divisionId: 0,
    districtId: 0,
    partyId: 0,
    organ:0,
    podobi: 0,
    status:0,
    name: "",
    contact_number: "",
    fatherName: "",
    motherName: "",
    nid: "",
    presentAddress: "",
    parmanentAddress: "",
    createDate: new Date().getTime(),
    active: 1,
  };