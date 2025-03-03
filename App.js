import React from 'react';
import {
  Image,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { CarrinhoProvider } from './CarrinhoContext';

import TelaInicial from './TelaInicial';
import TelaNarguile from './TelaNarguile';
import TelaEssencias from './TelaEssencias';
import TelaAcessorios from './TelaAcessorios';
import TelaBebidas from './TelaBebidas';
import TelaCarrinho from './TelaCarrinho';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
  <CarrinhoProvider>  
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Início') imageSource = require('./img/home.png');
            else if (route.name === 'Narguile') imageSource = require('./img/narguile.png');
            else if (route.name === 'Bebidas') imageSource = require('./img/bebidas.png');
            else if (route.name === 'Acessórios') imageSource = require('./img/acessorios.png');
            else if (route.name === 'Essências') imageSource = require('./img/essencias.png');
            else if (route.name === 'Carrinho') imageSource = require('./img/carrinho-de-compras.png');

            return (
                <Image
                  source={imageSource}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: color,
                  }}
                />
              );
            },
            tabBarActiveTintColor: '#004aad',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}
        >
        <Tab.Screen name="Início" component={TelaInicial} />
        <Tab.Screen name="Narguile" component={TelaNarguile}/>
        <Tab.Screen name="Bebidas" component={TelaBebidas}/>
        <Tab.Screen name="Acessórios" component={TelaAcessorios}/>
        <Tab.Screen name="Essências" component={TelaEssencias}/>
        <Tab.Screen name="Carrinho" component={TelaCarrinho}/>
        
        
      </Tab.Navigator>
    </NavigationContainer>
  </CarrinhoProvider>  
  );
}
