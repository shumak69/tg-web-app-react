import "./productItem.css";
import Button from "../Button/Button";
import { useState } from "react";
function ProductItem({ product, className, onAdd }) {
  const [isAdded, setIsAdded] = useState(false);
  const onAddHandler = () => {
    setIsAdded((state) => !state);
    onAdd(product);
  };
  return (
    <div className={"product " + className}>
      <div className="img">
        <img src={product.img} alt={product.title} className="img" />
      </div>
      <div className="title">{product.title}</div>
      <div className="description">{product.description}</div>
      <div className="price">
        <span>
          Стоимость: <b>{product.price}</b>
        </span>
      </div>
      <Button className={"add-btn " + (isAdded ? "active" : "")} onClick={onAddHandler}>
        {isAdded ? <span>✓</span> : "Добавить в корзину"}
      </Button>
    </div>
  );
}

export default ProductItem;
