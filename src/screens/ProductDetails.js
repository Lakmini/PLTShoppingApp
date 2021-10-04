import React, { useEffect, useState, useContext } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, View, Text, Button, Alert } from "react-native";
import Toast from 'react-native-simple-toast';
import { BasketContext } from "./BasketContextProvider";
import { getProductbyID } from "../services/PLTSrevice";

export function ProductDetails({ route }) {

  const [product, setProduct] = useState({});
  const { addToBasket } = useContext(BasketContext);

  useEffect(() => {
    let isMounted = true;
    getProductbyID(route.params.productId).then(data => {
      if (isMounted) setProduct(data);
    });
    return () => { isMounted = false };
  });

  function onAddtoBasket(e) {
    e.preventDefault();
    addToBasket(product);
    Toast.show('Successfully Added');
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Image source={{ uri: product.img }} style={styles.image} />
        <View style={styles.desContainer}>
          <Text style={styles.nameText}>{product.name}</Text>
          <Text style={styles.priceText}>£ {product.price}</Text>
          <Text style={styles.colorText}>{product.color}</Text>
          <Button
            onPress={(e) => onAddtoBasket(e)}
            title="Add to cart"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  image: {
    aspectRatio: 0.7,
    resizeMode: 'contain',
  },
  desContainer: {
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
  },
  colorText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
    marginBottom: 16,
  },
});
