import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Text, View} from 'native-base';
import React from 'react';
import {Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

import {icons} from '../../../assets/icons';
import {RootState} from '../../../state/reducer';
import { User } from '../../../../typings/structures';
const ContentDrawerScreen = (props: any) => {
  let dispatch = useDispatch();
  const user = useSelector(
    (state: RootState) => state.currentUser.user,
  ) as User;


  return (
    <DrawerContentScrollView {...props}>
      <View flex={1}>
        <View>
          <View alignSelf={'center'} padding={5}>
            <Image source={icons.service} style={{width: 50, height: 50}} />
          </View>
          {user && (
            <View>
              <View
                justifyContent={'center'}
                alignItems="center"
                flexDirection={'row'}
                my={2}>
                {/* <View mr={2}>
           <Image source={icons.user} style={{width: 30, height: 30}} />
         </View> */}
                <View>
                  <Text fontFamily={'Montserrat-SemiBold'} fontSize={20}>
                    {user?.name}
                  </Text>
                  <Text fontFamily={'Montserrat-Regular'}>
                   
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
        {/* {user && (
          <View
            padding={5}
            flexDirection="row"
            justifyContent="space-between"
            borderColor={'coolGray.200'}
            borderWidth={1}>
            <View>
              <Image
                source={icons.sign}
                style={{width: 20, height: 20, tintColor: 'red'}}
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  if (user) {
                    try {
                      dispatch(actions.user.removeUser());
                      api.auth.SignOutRequest$();
                    } catch (error) {}
                  }
                }}>
                {user && user?.name != '' && user?.name != undefined ? (
                  <Text fontFamily={'Montserrat-SemiBold'}>
                    {lan === 2 ? 'SIGN OUT' : 'সাইন আউট'}
                  </Text>
                ) : (
                  <Text fontFamily={'Montserrat-SemiBold'}>SIGN IN</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )} */}
      
     
        {/* <View
          padding={5}
          flexDirection="row"
          justifyContent="space-between"
          borderColor={'coolGray.200'}
          borderWidth={1}>
          <View>
            <Image
              source={icons.info}
              style={{width: 20, height: 20, tintColor: 'red'}}
            />
          </View>
          <View>
            <Text fontFamily={'Montserrat-SemiBold'}>
            ABOUT US
            </Text>
          </View>
        </View> */}
      </View>
    </DrawerContentScrollView>
  );
};
export default ContentDrawerScreen;
