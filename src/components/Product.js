import React from "react";
import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";

export function Product({ name, price, img, onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image style={styles.img} source={{ uri: img }}>
            </Image>
            <View style={styles.viewcontainer}>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={styles.priceText}>£{price}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowColor: 'black',
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 1,
        marginVertical: 20,
    },
    img: {
        aspectRatio: 0.7,
        resizeMode: 'contain',
    },
    viewcontainer: {
        padding: 16,
    },
    nameText: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    priceText: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    }
});


