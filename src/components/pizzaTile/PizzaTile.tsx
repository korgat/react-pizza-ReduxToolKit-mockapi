import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem } from '../../redux/slices/cartSlice';
import { ProductType } from '../../redux/slices/pizzaSlice';

const allSizes = [26, 30, 40];
const allTypes = ['thin', 'traditional'];

const PizzaTile: React.FC<ProductType & { itemsInCart: number }> = ({
    itemsInCart,
    id,
    title,
    prices,
    imageUrl,
    sizes,
    types,
}) => {
    const dispatch = useDispatch();
    let [activeType, setActiveType] = useState(types[0]);
    let [activeSize, setActiveSize] = useState(allSizes.indexOf(sizes[0]));

    function addPizzaToCart() {
        const item = {
            title,
            price: prices[activeSize],
            imageUrl,
            size: allSizes[activeSize],
            type: allTypes[activeType],
            id,
            count: 1,
        };
        dispatch(addItem(item));
    }

    return (
        <div className="pizza-block">
            <Link to={'/react-pizza-ReduxToolKit/product/' + id + '/' + (itemsInCart || 0)}>
                <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
                <h4 className="pizza-block__title">{title}</h4>
            </Link>
            <div className="pizza-block__selector">
                <ul>
                    {types.map((item, i) => {
                        return (
                            <li
                                key={item + i}
                                className={activeType === item ? 'active' : ''}
                                onClick={() => {
                                    setActiveType(item);
                                }}>
                                {allTypes[item]}
                            </li>
                        );
                    })}
                </ul>
                <ul>
                    {allSizes.map((item, i) => {
                        return (
                            <li
                                key={item + i}
                                className={
                                    (activeSize === i ? 'active' : '') +
                                    (!sizes.includes(item) ? 'disabled' : '')
                                }
                                onClick={() => {
                                    setActiveSize(i);
                                }}>
                                {item} sm.
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div onClick={addPizzaToCart} className="pizza-block__bottom">
                <div className="pizza-block__price">от {prices[activeSize]} $</div>
                <button className="button button--outline button--add">
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span> Add </span>
                    {itemsInCart > 0 && <i>{itemsInCart}</i>}
                </button>
            </div>
        </div>
    );
};

export default PizzaTile;
