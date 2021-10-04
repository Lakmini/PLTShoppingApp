import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, StatusBar, SafeAreaView, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { BasketContext } from "./BasketContextProvider";
import Icon from "react-native-vector-icons/Ionicons";
import Toast from 'react-native-simple-toast';

export function Basket() {

    const { items, getSubTotal, deleteProductFromBasket, addToBasket, decrementItemQuantity } = useContext(BasketContext);

    function calculateTotal() {
        let [total, setTotal] = useState(0);

        useEffect(() => {
            let isMounted = true;
            if (isMounted) setTotal(getSubTotal());
            return () => { isMounted = false };
        });

        return (
            <View style={styles.cartTotalDisplayView}>
                <Text style={[styles.leftText, styles.totText]}>Total</Text>
                <Text style={styles.rightText}>£ {total}</Text>
            </View>
        );
    }

    const onDeleteButtonClick = (e, id) => {
        e.preventDefault();
        deleteProductFromBasket(id);
        Toast.show('Successfully Deleted');
    }

    const onIncrementQuantity = (e, product) => {
        e.preventDefault();
        addToBasket(product);
    }

    const onDecrementQuantity = (e, id) => {
        e.preventDefault();
        decrementItemQuantity(id);
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.listItemView}>
                <View style={styles.listItemImageView}>
                    <Image source={{ uri: item.product.img }} style={[styles.centerElement, styles.listItemImage]} />
                    <View style={styles.listItemDescriptionView}>
                        <Text numberOfLines={1} style={{ fontSize: 15 }}>{item.product.name}</Text>
                        <Text numberOfLines={1} style={{ color: '#8f8f8f' }}>{item.product.color}</Text>
                        <Text numberOfLines={1} style={{ color: '#333333', marginBottom: 10 }}>£ {item.totalAmount}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={(e) => onDecrementQuantity(e, item.id)} style={styles.qutButton}>
                                <Icon name="remove-circle-outline" size={22} color="#cccccc" />
                            </TouchableOpacity>
                            <Text style={styles.itemQutText}>{item.quantity}</Text>
                            <TouchableOpacity onPress={(e) => onIncrementQuantity(e, item.product)} style={styles.qutButton}>
                                <Icon name="add-circle-outline" size={22} color="#cccccc" />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                <View style={[styles.centerElement, { width: 60 }]}>
                    <TouchableOpacity style={[styles.centerElement, { width: 32, height: 32 }]} onPress={(e) => onDeleteButtonClick(e, item.id)}>
                        <Icon name="md-trash" size={25} color="#ee4d2d" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.product.id.toString()}
                ListFooterComponent={calculateTotal}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    cartTotalDisplayView: {
        flexDirection: 'row',
        borderTopColor: '#dddddd',
        borderTopWidth: 1
    },
    leftText: {
        fontSize: 20,
        lineHeight: 40,
        color: '#333333'
    },
    totText: {
        fontWeight: 'bold',
    },
    rightText: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 40,
        color: '#333333',
        textAlign: 'right',
    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    img: {
        aspectRatio: 0.7,
        resizeMode: 'contain',

    },
    itemsList: {
        backgroundColor: '#eeeeee',
    },
    itemsListContainer: {
        backgroundColor: '#eeeeee',
        paddingVertical: 8,
        marginHorizontal: 8,
    },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    centerElement: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    listItemView: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 2,
        height: 120
    },
    listItemImageView: {
        flexDirection: 'row',
        flexGrow: 1,
        flexShrink: 1,
        alignSelf: 'center'
    },
    listItemImage: {
        height: 60,
        width: 60,
        backgroundColor: '#eeeeee'
    },
    listItemDescriptionView: {
        flexGrow: 1,
        flexShrink: 1,
        alignSelf: 'center'
    },
    qutButton: {
        borderWidth: 1,
        borderColor: '#cccccc'
    },
    itemQutText: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#cccccc',
        paddingHorizontal: 7,
        paddingTop: 3,
        color: '#bbbbbb',
        fontSize: 13
    },
});