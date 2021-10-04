import React, { useState, useEffect } from "react";
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { getProductList } from "../services/PLTSrevice";
import { Product } from "../components/Product";

export function ProductList({ navigation }) {
  const renderItem = ({ item: product }) => (
    <Product {...product}
      onPress={
        () => {
          navigation.navigate('ProductDetails', {
            productId: product.id,
          });
        }
      }
    />
  );

  const [productList, setProductList] = useState([]);
  
  useEffect(() => {
    let isMounted = true;
    getProductList().then(data => {
      if (isMounted) setProductList(data);
    });
    return () => { isMounted = false };
  });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={productList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});