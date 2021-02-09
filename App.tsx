import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import IMP from 'iamport-react-native';

declare const global: {HermesInternal: null | {}};

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Buy" component={BuyScene} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="PaymentResult" component={PaymentResult} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;

const BuyScene = () => {
  const data = {
    pg: 'html5_inicis',
    pay_method: 'trans',
    name: '결제 테스트용 상품',
    merchant_uid: Date.now().toString(),
    amount: 1000,
    buyer_name: '길동홍',
    buyer_tel: '01011111111',
    buyer_email: '',
    app_scheme: 'myapp',
  };
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        title="구매하기"
        onPress={() => {
          navigation.navigate('Payment', {data});
        }}
      />
    </SafeAreaView>
  );
};

const Payment = () => {
  const {data} = useRoute().params;
  const navigation = useNavigation();
  return (
    <IMP.Payment
      userCode="imp12403246"
      data={data}
      callback={(rsp) => {
        console.log('CallBackExacitve', rsp);
        navigation.replace('PaymentResult', {rsp});
      }}
    />
  );
};

const PaymentResult = () => {
  const {rsp} = useRoute().params;
  console.log(rsp);
  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{`imp_uid:${rsp.imp_uid}`}</Text>
      <Text>{`imp_uid:${rsp.merchant_uid}`}</Text>
    </SafeAreaView>
  );
};
