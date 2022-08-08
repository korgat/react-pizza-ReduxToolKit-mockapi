import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageIndex } from '../../redux/slices/filterSlice';
import { RootState } from '../../redux/store';
import style from './pagination.module.scss';

type PaginationProps = {
    pageIndex: number;
    itemsPerPage: number;
    itemsAmount: number;
    buttonsAmount: number;
};

const Pagination: React.FC<PaginationProps> = ({
    pageIndex,
    itemsPerPage,
    itemsAmount,
    buttonsAmount,
}) => {
    const dispatch = useDispatch();
    const { categoryIndex } = useSelector((state: RootState) => state.filterSlice);
    let [portion, setPortion] = useState(0);
    useEffect(() => {
        setPortion(0);
    }, [categoryIndex]);

    const maxPortions = Math.floor(itemsAmount / (itemsPerPage * buttonsAmount));
    const buttonsLeft = Math.ceil(
        (itemsAmount - portion * itemsPerPage * buttonsAmount) / itemsPerPage,
    );
    const numberOfButtons = buttonsLeft > buttonsAmount ? buttonsAmount : buttonsLeft;

    function onArrowClick(isNextArrow: boolean) {
        if (isNextArrow && portion < maxPortions) {
            setPortion(++portion);
            dispatch(setPageIndex(portion * buttonsAmount));
        } else if (!isNextArrow && portion > 0) {
            setPortion(--portion);
            dispatch(setPageIndex(portion * buttonsAmount + buttonsAmount - 1));
        }
    }

    return (
        <div className={style.root}>
            <button
                onClick={() => {
                    onArrowClick(false);
                }}
                className={style.arrow + (portion === 0 ? ' ' + style.disabled : '')}>
                &#8656;
            </button>
            <ul>
                {[...new Array(numberOfButtons)].map((_, i) => {
                    return (
                        <li
                            key={i}
                            className={
                                style.button +
                                (pageIndex === portion * buttonsAmount + i
                                    ? ' ' + style.active
                                    : '')
                            }
                            onClick={() => {
                                dispatch(setPageIndex(portion * buttonsAmount + i));
                            }}>
                            {portion * buttonsAmount + i + 1}
                        </li>
                    );
                })}
            </ul>
            <button
                onClick={() => {
                    onArrowClick(true);
                }}
                className={style.arrow + (portion === maxPortions ? ' ' + style.disabled : '')}>
                &#8658;
            </button>
        </div>
    );
};

export default Pagination;
