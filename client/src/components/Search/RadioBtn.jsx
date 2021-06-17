import React, { useState } from "react";

const RadioBtn = ({ priceRange, handleFilters }) => {
    const [checked, setChecked] = useState([]);

    const handleChange = (e) => {
        handleFilters(e.target.value);
        setChecked(e.target.value);
    };

    return priceRange.map((item, i) => (
        <div key={i} className="list-unstyled">
            <input
                type="radio"
                onChange={handleChange}
                value={`${item.id}`}
                name={item}
                className="mr-2"
            />
            <label className="form-check-label">{item.name}</label>
        </div>
    ));
};

export default RadioBtn;
