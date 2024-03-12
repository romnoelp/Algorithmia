import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const addProduct = (newDelivery) =>
    setProducts((prevDelivery) => [...prevDelivery, newDelivery]);

  const updateProduct = (deliveryID, attribute) => {
    setProducts((prevDelivery) =>
      prevDelivery.map((deliveryElement) =>
        deliveryID === deliveryElement
          ? { ...deliveryElement, ...attribute }
          : deliveryElement
      )
    );
  };
  const setProductList = (newDeliveryList) => {
    setProducts(newDeliveryList);
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, setProductList }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("userProductContext must be use within a ProductProvider");
  }
  return context;
};
