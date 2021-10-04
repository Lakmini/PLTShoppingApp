import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { BasketContext } from "../screens/BasketContextProvider";
import Icon from "react-native-vector-icons/FontAwesome5";
import { moderateScale } from 'react-native-size-matters';

export function BasketIcon({ navigation }) {
    const { getBasketItemCount } = useContext(BasketContext);

    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            navigation.navigate('Basket');
        }}>
            <Icon name="shopping-basket"
                size={moderateScale(25)}
                color={'red'} />
            <Text style={styles.text}
            >({getBasketItemCount()})</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 8,
        height: 32,
        width: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'red',
        fontWeight: 'bold',
    },
});
