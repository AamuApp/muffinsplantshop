import React, { useRef } from 'react';
import { Link } from 'gatsby';
import numeral from 'numeral';
import { useCartContext } from '../../../wrap-with-provider';
import { cartQuantityTotal, cartAmountTotal } from '../../selectors/cartQuantity';
import styles from './shopping-cart.module.css';

const AddToCart = ({ title, price, sku, variant, imageSrc }) => {
    const { cartDispatch } = useCartContext();
    const notification = useRef(null);

    const add = () => {
        cartDispatch({
            type: 'ADD_TO_CART',
            product: { title, price, sku, variant, quantity: 1, imageSrc }
        });

        // console.log({ title, price, sku, variant, imageSrc });

        notification.current.textContent = `${title} - ${variant.title} added to cart`;
        notification.current.style.display = 'block';
        setTimeout(() => {
            if (notification.current) {
                notification.current.textContent = '';
                notification.current.style.display = 'none';
            }
        }, 5000);
    }
    return (
        <>
            <p
                className={styles.shoppingCart__cartNotification}
                ref={notification}></p>
            <button
                className={styles.shoppingCart__addToCartButton}
                onClick={add}>
                Add to cart
            </button>
        </>
    )
}


const CartItem = ({ product }) => {
    const { cartDispatch } = useCartContext();

    const updateQuantity = (product, quantity) => {
        cartDispatch({
            type: 'UPDATE_QUANTITY',
            product,
            quantity
        })
    }

    const handleUpdateQuantity = (product) => (e) => {
        const quantity = e.target.value;
        if (quantity === '' || parseInt(quantity, 10) > 0) {
            updateQuantity(product, quantity)
        }
    }

    const handleDecreaseQuantity = (product) => () => {
        const quantity = product.quantity;

        const newQuantity = parseInt(quantity, 10) - 1;
        updateQuantity(product, newQuantity < 1 ? 1 : newQuantity);
    }

    const handleIncreaseQuantity = (product) => () => {
        const quantity = product.quantity;

        updateQuantity(product, parseInt(quantity, 10) + 1);
    }

    const handleDeleteProduct = (product) => () => {
        cartDispatch({
            type: 'REMOVE_FROM_CART',
            product
        })
    }
    return (
        <div className={styles.shoppingCart__cartItem}>
            <img
                alt=""
                className={styles.shoppingCart__cartItemImage}
                src={product.imageSrc} />
            <div className={styles.shoppingCart__cartItemDetails}>
                <p>{`${product.title} - ${product.variant.title}`}</p>
                <p className="text-light">{numeral(parseFloat(product.price)).format('$0,0.00')}</p>
                <div className={styles.shoppingCart__quantity}>
                    <button
                        aria-label="decrease quantity"
                        className={styles.shoppingCart__quantityButton}
                        onClick={handleDecreaseQuantity(product)}>
                        —
                    </button>
                    <input
                        className={styles.shoppingCart__quantityInput}
                        onChange={handleUpdateQuantity(product)}
                        type="number"
                        step="any"
                        value={product.quantity} />
                    <button
                        aria-label="decrease quantity"
                        className={styles.shoppingCart__quantityButton}
                        onClick={handleIncreaseQuantity(product)}>
                        +
                    </button>
                </div>

                <button
                    className={styles.shoppingCart__deleteCartItemButton}
                    type="button"
                    onClick={handleDeleteProduct(product)}>
                    Remove
                        </button>
            </div>

        </div>
    )
}

const Cart = () => {
    const { cart, isOpenCart, setIsOpenCart } = useCartContext();
    const toggleCart = () => setIsOpenCart(!isOpenCart);
    return (
        <div style={{ padding: `1rem` }}>
            <button
                aria-label="close cart"
                className={styles.shoppingCart__closeCartButton}
                onClick={toggleCart}></button>
            <h1 className="heading-first">Cart ({cartQuantityTotal(cart)})</h1>
            {cart.length > 0 ? (<div>
                {cart.map((product, index) => {
                    return (
                        <CartItem
                            key={index}
                            product={product} />
                    )
                })}

                <CancelCart />
                <div className={styles.shoppingCart__cartFooter}>
                    <p className={styles.shoppingCart__cartTotal}>
                        <span>Total</span>
                        <span>{numeral(cartAmountTotal(cart)).format('$0,0.00')}</span>
                    </p>
                    <CheckoutCart />
                    <div>
                        <button
                            className="link-with-arrow"
                            onClick={toggleCart}>Continue shopping</button>
                    </div>
                </div>
            </div>) : (
                    <div>
                        <p>Cart is empty</p>
                        <div>
                            <button
                                className="link-with-arrow"
                                onClick={toggleCart}>Continue shopping</button>
                        </div>
                    </div>
                )}
        </div>
    )
}

const CartButton = () => {
    const { cart, isOpenCart, setIsOpenCart } = useCartContext();
    return (
        <button
            className={styles.shoppingCart__cartButton}
            onClick={() => setIsOpenCart(!isOpenCart)}>
            Cart ({cartQuantityTotal(cart)})
        </button>
    )
}

const CancelCart = () => {
    const { cartDispatch } = useCartContext();
    return (
        <button
            className={styles.shoppingCart__cancelButton}
            onClick={() => cartDispatch({ type: 'CLEAR_CART' })}>
            Cancel order
        </button>
    )
}

const CheckoutCart = () => {
    const { setIsOpenCart } = useCartContext();
    return (
        <Link
            className={styles.shoppingCart__checkoutButton}
            onClick={() => setIsOpenCart(false)}
            to="/checkout">
            Check out
        </Link>
    )
}

export { AddToCart, Cart, CartButton, CancelCart, CheckoutCart };