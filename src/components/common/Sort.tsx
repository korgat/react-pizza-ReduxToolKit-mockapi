import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChosenSort } from '../../redux/slices/filterSlice';
import { RootState } from '../../redux/store';

type SortItem = {
    name: string;
    type: string;
    direction: string;
};

const sortTypes: SortItem[] = [
    { name: 'popularity 🡇', type: 'rating', direction: 'desc' },
    { name: 'popularity 🡅', type: 'rating', direction: 'asc' },
    { name: 'price 🡇', type: 'price', direction: 'desc' },
    { name: 'price 🡅', type: 'price', direction: 'asc' },
    { name: 'alphabet 🡇', type: 'title', direction: 'desc' },
    { name: 'alphabet 🡅', type: 'title', direction: 'asc' },
];

const Sort: React.FC = () => {
    const dispatch = useDispatch();
    const sortEl = useRef<HTMLDivElement>(null);
    const [openedPopup, setOpenedPopup] = useState(false);
    const chosenSort = useSelector((state: RootState) => state.filterSlice.chosenSort);

    const currentSort = sortTypes.find(
        (obj) => obj.type === chosenSort.type && obj.direction === chosenSort.direction,
    );

    const onSortTypeClick = (sortType: SortItem) => {
        dispatch(setChosenSort({ type: sortType.type, direction: sortType.direction }));
        setOpenedPopup(false);
    };

    useEffect(() => {
        function onBodyClick(e: MouseEvent & { path?: Node[] }) {
            if (sortEl.current && !e.path?.includes(sortEl.current)) {
                setOpenedPopup(false);
            }
        }
        document.body.addEventListener('click', onBodyClick);
        return () => document.body.removeEventListener('click', onBodyClick);
    });

    return (
        <div ref={sortEl} className="sort">
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    transform={openedPopup ? 'rotate(180)' : ''}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span
                    onClick={() => {
                        setOpenedPopup(!openedPopup);
                    }}>
                    {currentSort?.name}
                </span>
            </div>
            {openedPopup && (
                <div className="sort__popup">
                    <ul>
                        {sortTypes.map((obj, i) => {
                            return (
                                <li
                                    key={obj.name + i}
                                    onClick={() => {
                                        onSortTypeClick(obj);
                                    }}
                                    className={currentSort?.name === obj.name ? 'active' : ''}>
                                    {obj.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Sort;
