import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
export default function Header() {
  const cartContext = useContext(CartContext);
  const progressContext= useContext(UserProgressContext);

  const total = cartContext.items.reduce((acc, item) => acc + item.quantity, 0);

  const handleShowCart=()=>{
    progressContext.showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A logo" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button onClick={handleShowCart} textOnly>Cart ({total})</Button>
      </nav>
    </header>
  );
}
