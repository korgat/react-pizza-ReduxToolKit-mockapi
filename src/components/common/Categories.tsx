import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryIndex } from '../../redux/slices/filterSlice';
import { RootState } from '../../redux/store';

const Categories: React.FC = () => {
    const categoryIndex = useSelector((state: RootState) => state.filterSlice.categoryIndex);
    const dispatch = useDispatch();

    const categoryTitles = ['All', 'Meet', 'Vegetarian', 'grill', 'Spicy', 'Closed'];

    return (
        <div className="categories">
            <ul>
                {categoryTitles.map((item, i) => {
                    return (
                        <li
                            key={i + item}
                            onClick={() => {
                                dispatch(setCategoryIndex(i));
                            }}
                            className={categoryIndex === i ? 'active' : ''}>
                            {item}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Categories;
