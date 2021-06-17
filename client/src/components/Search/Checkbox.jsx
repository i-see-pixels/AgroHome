import React, { useEffect, useState } from "react";

const Checkbox = ({ categories, handleFilters, appliedFilter }) => {
    const [checked, setChecked] = useState([]);

    useEffect(() => {
        setChecked([appliedFilter]);
        handleFilters([appliedFilter]);
    }, []);

    const handleChecked = (catName) => () => {
        const currentCheckedCat = checked.indexOf(catName);
        const newCheckedCat = [...checked];

        if (currentCheckedCat === -1) {
            newCheckedCat.push(catName);
        } else {
            newCheckedCat.splice(currentCheckedCat, 1);
        }
        setChecked(newCheckedCat);
        handleFilters(newCheckedCat);
    };

    return categories.map((item, i) => (
        <li className="list-unstyled" key={i}>
            <input
                type="checkbox"
                onChange={handleChecked(item._id)}
                value={checked.indexOf(item._id === -1)}
                className="form-checkbox"
            />
            <label className="form-check-label">{item.name}</label>
        </li>
    ));
};

export default Checkbox;
