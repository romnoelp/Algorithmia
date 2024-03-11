import { createContext, useContext, useState } from "react";

const DeliveryContext = createContext();

export const DeliveryProvider = ({ children }) => {
  const [deliveries, setDeliveries] = useState([]);

  const addDelivery = (newDelivery) =>
    setDeliveries((prevDelivery) => [...prevDelivery, newDelivery]);

  const updateDelivery = (deliveryID, attribute) => {
    setDeliveries((prevDelivery) =>
      prevDelivery.map((deliveryElement) =>
        deliveryID === deliveryElement
          ? { ...deliveryElement, ...attribute }
          : deliveryElement
      )
    );
  };
  const setDeliveryList = (newDeliveryList) => {
    setDeliveries(newDeliveryList);
  };

  return (
    <DeliveryContext.Provider
      value={{ deliveries, addDelivery, updateDelivery, setDeliveryList }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};

export const useDeliveryContext = () => {
  const context = useContext(DeliveryContext);
  if (!context) {
    throw new Error("useDeliveryContext must be use within a DeliveryProvider");
  }
  return context;
};
