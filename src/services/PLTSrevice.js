import { Alert } from "react-native";

const BASE_URL = "https://my-json-server.typicode.com/benirvingplt/products/products";

export async function getProductList() {

    try {
        const response = await fetch(BASE_URL);
        return await response.json();
    } catch (error) {
        console.error(error);
        Alert.alert("Network Error!");
    }
}

export async function getProductbyID(id) {
    try {
        const response = await fetch(BASE_URL + '/' + id);
        return await response.json();
    } catch (error) {
        console.error(error);
        Alert.alert("Network Error!");
    }
}