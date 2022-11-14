import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store, persistor} from './state';
import Navigation from './modules';
import {NativeBaseProvider} from 'native-base';

const Main = () => (
  <NavigationContainer>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NativeBaseProvider>
            <Navigation />
          </NativeBaseProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  </NavigationContainer>
);

export default Main;
