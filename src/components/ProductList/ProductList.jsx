import { useCallback, useEffect, useState } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import { products } from "../../utils/constant";
import ProductItem from "../ProductItem/ProductItem";
import "./productList.css";

const getTotalPrice = (items) => {
  return items.reduce((acc, item) => {
    return (acc += item.price);
  }, 0);
};

function ProductList() {
  const [addedItems, setAddedItems] = useState([]);
  const { tg, queryId } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId,
    };
    fetch("https://tg-web-bot.glitch.me/web-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // tg.sendData(JSON.stringify(data));
  }, [addedItems]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find((item) => item.id === product.id);
    let newItems = [];

    if (alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }

    setAddedItems(newItems);

    if (!newItems.length) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)}₴`,
      });
    }
  };
  return (
    <div className="list">
      {products.map((item) => (
        <ProductItem product={item} onAdd={onAdd} className="item" key={item.id} />
      ))}
    </div>
  );
}

export default ProductList;
