import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

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
  const handleOpenCheckout = () => {
    progressContext.showCheckout();
  };

  return (
    <Modal
      className="cart"
      open={progressContext.progress === "cart"}
      onClose={progressContext.progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartContext.items.map((item) => {
          return (
            <CartItem
              id={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              onIncrease={() => cartContext.addItem(item)}
              onDecrease={() => cartContext.removeItem(item.id)}
            />
          );
        })}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartContext.items.length > 0 && (
          <Button onClick={handleOpenCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
