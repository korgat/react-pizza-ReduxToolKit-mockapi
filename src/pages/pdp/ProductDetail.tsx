import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../API/productAPI';
import { PlateLoader } from '../../components/common';
import { addItem } from '../../redux/slices/cartSlice';
import { ProductType } from '../../redux/slices/pizzaSlice';

const allSizes = [
    { name: 'Small', size: 26 },
    { name: 'Medium', size: 30 },
    { name: 'Large', size: 40 },
];

const allTypes = ['thin', 'traditional'];

const ProductDetail: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id, amount } = useParams();
    const [product, setProduct] = useState<ProductType>();
    const [itemsInCart, setItemsInCart] = useState<number>(Number(amount));
    let [activeType, setActiveType] = useState<number>(0);
    let [activeSize, setActiveSize] = useState<number>(0);

    useEffect(() => {
        (async function () {
            try {
                const res = await getProducts({ id: Number(id) });
                const product = res.data[0];

                if (!res.data.length) {
                    navigate('/');
                }
                setProduct(product);
                const sizeIndex = allSizes.findIndex((obj, i) => obj.size === product.sizes[0]);
                setActiveSize(sizeIndex);
                setActiveType(product.types[0]);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    if (!product) {
        return (
            <div className="content__items-main">
                <PlateLoader />
            </div>
        );
    }

    const addPizzaToCart = () => {
        const item = {
            title: product.title,
            price: product.prices[activeSize],
            imageUrl: product.imageUrl,
            size: allSizes[activeSize].size,
            type: allTypes[activeType],
            id: product.id,
            count: 1,
        };
        dispatch(addItem(item));
        setItemsInCart(itemsInCart + 1);
    };

    return (
        <div className="content__items-main">
            <div className="pdp">
                <div className="pdp__main">
                    <div className="pdp__image">
                        <img src={product.imageUrl} alt="pizza" />
                    </div>
                    <div className="pdp__info">
                        <h2>{product.title}</h2>
                        <p>Taste and you'll never forget this deliciousness</p>
                        <ul className="pdp__dough">
                            {product.types.map((item, i) => {
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
                        <ul className="pdp__size">
                            {allSizes.map((item, i) => {
                                return (
                                    <li
                                        key={item.size + i}
                                        className={
                                            (activeSize === i ? 'active' : '') +
                                            (!product.sizes.includes(item.size) ? 'disabled' : '')
                                        }
                                        onClick={() => {
                                            setActiveSize(i);
                                        }}>
                                        {item.name + ' ' + item.size} sm.
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="pdp__info-btn">
                            <div className="pizza-block__price pdp__price">
                                от {product.prices[activeSize]} $
                            </div>
                            <button
                                onClick={addPizzaToCart}
                                className="button button--outline button--add">
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
                </div>
                <div className="pdp__description">
                    <h3>Description</h3>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae cumque,
                        numquam odit, exercitationem, quam vel eius doloremque voluptates laborum
                        sequi quo! Accusantium enim voluptates cumque dolor alias quibusdam
                        consequatur id?
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
