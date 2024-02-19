import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";

export default function Cart() {
  const cartContext = useContext(CartContext);
  const progressContext = useContext(UserProgressContext);

  const cartTotal = cartContext.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const handleCloseCart = () => {
    progressContext.hideCart();
  };
  return (
    <Modal className="cart" open={progressContext.progress === "cart"}>
      <h2>Your Cart</h2>
      <ul>
        {cartContext.items.map((item) => {
          return (
            <li key={item.id}>
              {item.name}={item.quantity}
            </li>
          );
        })}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        <Button onClick={handleCloseCart}>Go to Checkout</Button>
      </p>
    </Modal>
  );
}
