import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductList } from './screens/ProductList';
import { BasketContextProvider } from './screens/BasketContextProvider';
import { ProductDetails } from './screens/ProductDetails';
import { BasketIcon } from './components/BasketIcon';
import { Basket } from './screens/Basket';

const stackNavigator = createNativeStackNavigator();

const Routes = () => {
    return (
        <BasketContextProvider>
            <NavigationContainer>
                <stackNavigator.Navigator>
                    <stackNavigator.Screen
                        name='ProductList'
                        component={ProductList}
                        options={({ navigation }) => ({
                            title: 'Products',
                            headerRight: () => <BasketIcon navigation={navigation} />,
                        })}
                    />
                    <stackNavigator.Screen
                        name='ProductDetails'
                        component={ProductDetails}
                        options={({ navigation }) => ({
                            title: 'Product Details',
                            headerRight: () => <BasketIcon navigation={navigation} />,
                        })}
                    />
                    <stackNavigator.Screen
                        name='Basket'
                        component={Basket}
                        options={({ navigation }) => ({
                            title: 'Basket',
                            headerRight: () => <BasketIcon navigation={navigation} />,
                        })}
                    />
                </stackNavigator.Navigator>
            </NavigationContainer>
        </BasketContextProvider>
    );
}

export default Routes;