
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/database';
import { AccessInData, DeviceInfoType, HelperType, PersonTyp, ProblemRequestType, SolverType } from '../../typings/form-data';
import { User } from '../../typings/structures';
import { SignInData } from '../../typings/form-data';

import { DbVersion, firebaseConfig } from "../config";
import { store } from '../state';
import actions from '../state/actions';
import { encryptPassword } from '../utils/encrypt';

export const SbProblem = () => {
 
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
};


export const SetUserInfo = (user: User) => {
  SbProblem()
  let ref = database()
    .ref('political')
    .child('user')
    .child(user.id + '')

  return new Promise((resolve, reject) => {
    ref.set(user, (error) => {
      if (error) {
        reject({
          error: true
        })
      } else {
        resolve({
          error: false
        })
      }
    })
  })

}
export const SetAccesInfo = (access: AccessInData) => {
  SbProblem()
  let indx=new Date().getTime().toString()
  let ref = database()
    .ref('political')
    .child('acceslist')
    .child(indx)

  return new Promise((resolve, reject) => {
    ref.set(access, (error) => {
      if (error) {
        reject({
          error: true
        })
      } else {
        resolve({
          error: false
        })
      }
    })
  })

}

export const GetUserInfo = (user: SignInData) => {
  SbProblem()
  let ref = database()
    .ref('political')
    .child('user')
    .orderByChild('verify')
    .equalTo(user.email + encryptPassword(user.password))

  return new Promise((resolve, reject) => {
    ref.once('value', snapshot => {
      if (snapshot.exists()) {
        //  console.log('exists ',snapshot.val())
        resolve({
          error: false,
          msg: 'Successfully get data',
          data: snapshot.val()
        })

      } else {
        resolve({
          error: true,
          msg: 'User not found',
          data: null
        })
      }
    })

  })
}

export const GetAccessInfo = (accessValue:string) => {
  SbProblem()
  let ref = database()
    .ref('political')
    .child('acceslist')
    .orderByChild('value')
    .equalTo(accessValue)

  return new Promise((resolve, reject) => {
    ref.once('value', snapshot => {
      if (snapshot.exists()) {
        //  console.log('exists ',snapshot.val())
        resolve({
          error: false,
          msg: 'Successfully get data',
          data: snapshot.val()
        })

      } else {
        resolve({
          error: true,
          msg: 'User not found',
          data: null
        })
      }
    })

  })
}

export const setDistrictPartyInfo = (person: PersonTyp) => {
  SbProblem()
  const {divisionId,districtId,partyId,createDate}=person
  let ref = database()
    .ref('political')
    .child('person')
    .child(divisionId.toString())
    .child(districtId.toString())
    .child(partyId.toString())
    .child(createDate.toString())

  return new Promise((resolve, reject) => {
    ref.set(person, (error) => { 
      if (error) {
        reject({
          error: true
        })
      } else {
        resolve({
          error: false
        })
      }
    })
  })

}
export const getDistrictPartyInfo = (person: any) => {
  SbProblem()
  const {id,division_id}=person
  let ref = database()
    .ref(DbVersion)
    .child('person')
    .child("_"+division_id.toString())
    .child("_"+id.toString())
    
    return new Promise((resolve, reject) => {
      ref.once('value', snapshot => {
        if (snapshot.exists()) {
           // console.log('exists ',snapshot.val())
          resolve({
            error: false,
            msg: 'Successfully get data',
            data: snapshot.toJSON()
          })
  
        } else {
          resolve({
            error: true,
            msg: 'Data is not found',
            data: null
          })
        }
      })
  
    })

}