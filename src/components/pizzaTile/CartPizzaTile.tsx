import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    addItem,
    CartItem,
    CartItemProduct,
    deleteStack,
    removeItem,
} from '../../redux/slices/cartSlice';

const CartPizzaTile: React.FC<CartItem> = ({
    id,
    itemsPrice,
    itemsAmount,
    sizes,
    ...sizePizzaItem
}) => {
    const dispatch = useDispatch();
    const [activeSize, setActiveSize] = useState(0);
    const showButtons = sizes.length > 1;

    function onMinusSizeClick() {
        if (activeSize > 0) {
            setActiveSize(activeSize - 1);
        } else if (activeSize === 0) {
            setActiveSize(sizes.length - 1);
        }
    }
    function onPlusSizeClick() {
        if (activeSize < sizes.length - 1) {
            setActiveSize(activeSize + 1);
        } else if (activeSize === sizes.length - 1) {
            setActiveSize(0);
        }
    }

    function onItemRemove() {
        dispatch(
            removeItem({
                size: sizes[activeSize],
                id,
            }),
        );
        if (sizePizzaItem[sizes[activeSize]].count === 1) {
            setActiveSize(sizes.length - 2);
        }
    }

    function onItemAdd() {
        dispatch(
            addItem({
                id,
                size: sizes[activeSize],
            } as CartItemProduct),
        );
    }

    function onRemoveStackClick() {
        dispatch(deleteStack(id));
    }

    return (
        <div className="cart__item">
            <div className="cart__item-img">
                <img
                    className="pizza-block__image"
                    src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
                    alt="Pizza"
                />
            </div>
            <div className="cart__item-info">
                <div className="cart__item-title">
                    {showButtons && (
                        <div
                            onClick={onMinusSizeClick}
                            className="button button--outline button--circle cart__item-count-plus">
                            &#11178;
                        </div>
                    )}
                    <div className="cart__item-description">
                        <h3>{sizePizzaItem[sizes[activeSize]].title}</h3>
                        <p>
                            {sizePizzaItem[sizes[activeSize]].type} тесто, {sizes[activeSize]} см.
                        </p>
                    </div>
                    {showButtons && (
                        <div
                            onClick={onPlusSizeClick}
                            className="button button--outline button--circle cart__item-count-plus">
                            &#11179;
                        </div>
                    )}
                </div>
            </div>
            <div className="cart__item-count">
                <div
                    onClick={onItemRemove}
                    className="button button--outline button--circle cart__item-count-minus">
                    <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                            fill="#EB5A1E"
                        />
                        <path
                            d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                            fill="#EB5A1E"
                        />
                    </svg>
                </div>
                <b>{itemsAmount}</b>
                <div
                    onClick={onItemAdd}
                    className="button button--outline button--circle cart__item-count-plus">
                    <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                            fill="#EB5A1E"
                        />
                        <path
                            d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                            fill="#EB5A1E"
                        />
                    </svg>
                </div>
            </div>
            <div className="cart__item-price">
                <b>{itemsPrice} $</b>
            </div>
            <div className="cart__item-remove">
                <div onClick={onRemoveStackClick} className="button button--outline button--circle">
                    <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                            fill="#EB5A1E"
                        />
                        <path
                            d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                            fill="#EB5A1E"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default CartPizzaTile;
