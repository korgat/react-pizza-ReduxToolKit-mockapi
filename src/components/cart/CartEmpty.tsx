import React from 'react';
import { Link } from 'react-router-dom';

const CartEmpty: React.FC = () => {
    return (
        <div className="container container--cart">
            <div className="cart cart--empty">
                <h2>
                    Cart is empty <span>😕</span>
                </h2>
                <p>
                    You probably haven't ordered pizza yet.
                    <br />
                    To order pizza, go to the main page.
                </p>
                <img src="/empty-cart.png" alt="Empty cart" />
                <Link to="/react-pizza-ReduxToolKit-mockapi" className="button button--black">
                    <span>Go Back</span>
                </Link>
            </div>
        </div>
    );
};

export default CartEmpty;
