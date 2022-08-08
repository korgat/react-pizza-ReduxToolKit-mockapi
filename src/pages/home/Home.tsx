import qs from 'qs';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';

import { Sort, Categories } from '../../components/common';
import Pagination from '../../components/pagination/Pagination';
import PizzaTile from '../../components/pizzaTile/PizzaTile';
import PizzaTileHolder from '../../components/pizzaTile/PizzaTileHolder';
import { setFilters } from '../../redux/slices/filterSlice';
import { fetchPizzas } from '../../redux/actions/pizzaActions';
import ServerError from '../../components/common/ServerError';
import { RootState, useAppDispatch } from '../../redux/store';
import { Status } from '../../redux/slices/pizzaSlice';
import { itemsPerPage, maxPaginationButtons } from '../../config/appConfig';

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { categoryIndex, searchValue, chosenSort, pageIndex } = useSelector(
        (state: RootState) => state.filterSlice,
    );
    const { products, totalAmount, status } = useSelector((state: RootState) => state.pizzaSlice);
    const cartItems = useSelector((state: RootState) => state.cartSlice);

    const isSearch = useRef(false);
    const isFirstPageLoad = useRef(true);

    useEffect(() => {
        if (window.location.search) {
            const filtersParam = qs.parse(window.location.search.replace('?', '')) as Record<
                string,
                string
            >;

            dispatch(setFilters(filtersParam));
            isSearch.current = true;
        }
    }, []);

    useEffect(() => {
        if (!isSearch.current) {
            dispatch(
                fetchPizzas({ searchValue, categoryIndex, chosenSort, pageIndex, itemsPerPage }),
            );
        }
        isSearch.current = false;
    }, [categoryIndex, chosenSort, pageIndex, searchValue]);

    useEffect(() => {
        if (!isFirstPageLoad.current) {
            const querystring = qs.stringify({
                categoryIndex,
                pageIndex,
                type: chosenSort.type,
                direction: chosenSort.direction,
            });

            navigate('?' + querystring);
        }
        isFirstPageLoad.current = false;
    }, [categoryIndex, chosenSort, pageIndex]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items content__items-main">
                {status === Status.PENDING &&
                    [...new Array(itemsPerPage)].map((_, i) => <PizzaTileHolder key={i} />)}
                {status === Status.REJECTED ? (
                    <ServerError />
                ) : (
                    products.map((obj, i) => {
                        const itemsInCart = cartItems.items.find((item) => item.id === obj.id);

                        return (
                            <PizzaTile
                                key={obj.title + i}
                                {...obj}
                                itemsInCart={itemsInCart?.itemsAmount || 0}
                            />
                        );
                    })
                )}
            </div>
            <Pagination
                pageIndex={pageIndex}
                itemsAmount={totalAmount}
                itemsPerPage={itemsPerPage}
                buttonsAmount={maxPaginationButtons}
            />
        </div>
    );
};

export default Home;
