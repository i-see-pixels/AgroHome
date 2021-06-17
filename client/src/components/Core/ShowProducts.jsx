import React from "react";
import { API } from "../../config";

const ShowProducts = ({ item, url }) => {
    return <img src={`${API}/${url}/image/${item._id}`} alt={item.name} />;
};

export default ShowProducts;
