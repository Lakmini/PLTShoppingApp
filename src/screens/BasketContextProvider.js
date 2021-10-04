import React, { useState, createContext, useEffect } from "react";
export const BasketContext = createContext();

export function BasketContextProvider(props) {

    const [items, setItems] = useState([]);

    function addToBasket(product) {

        setItems((itemList) => {
            const isItemExists = itemList.find((item) => (item.id == product.id));
            if (isItemExists) {
                //item is already in the basket
                return itemList.map((item) => {
                    if (item.id == product.id) {
                        item.quantity++;
                        item.totalAmount += product.price;
                    }
                    return item;
                });

            } else {
                //item is not in the basket
                return [...itemList, {
                    id: product.id,
                    quantity: 1,
                    product,
                    totalAmount: product.price,
                }];

            }
        }
        );
    }

    function deleteProductFromBasket(id) {
        const newProductList = items.filter((item) => (item.id !== id));
        setItems(newProductList);
    }

    function decrementItemQuantity(id) {
        setItems((itemList) => {
            return itemList.map((item) => {
                if (item.id == id && item.quantity > 1) {
                    item.quantity--;
                    item.totalAmount -= item.product.price;
                }
                return item;
            }
            );
        });
    }

    function getBasketItemCount() {
        const itemCount = items.reduce((tot, item) => (tot + item.quantity), 0);
        return itemCount;
    }

    function getSubTotal() {
        const subTotal = items.reduce((tot, item) => (tot + item.totalAmount), 0);
        return subTotal.toFixed(2);
    }

    return (
        <BasketContext.Provider
            value={{ setItems, getBasketItemCount, items, getSubTotal, addToBasket, deleteProductFromBasket, decrementItemQuantity }} >
            {props.children}
        </BasketContext.Provider>
    );
}
