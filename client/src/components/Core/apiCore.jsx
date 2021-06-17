import { API } from "../../config";

export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=8`, {
        method: "GET",
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => console.log(err));
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = { skip, limit, filters };
    return fetch(`${API}/products/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => console.log(err));
};

export const getProductInfo = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET",
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => console.log(err));
};

export const getRelatedProducts = (productId) => {
    return fetch(`${API}/products/related/${productId}`, {
        method: "GET",
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => console.log(err));
};

export const addItem = (item, next) => {
    let cart = [];

    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.push({ ...item, count: 1 });

        cart = Array.from(new Set(cart.map((p) => p._id))).map((id) =>
            cart.find((p) => p._id === id)
        );

        localStorage.setItem("cart", JSON.stringify(cart));
        next();
    }
};

export const itemTotal = () => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart")).length;
        }
    }

    return 0;
};

export const getCart = () => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"));
        }
    }

    return [];
};

export const updateCartItem = (id, count) => {
    let cart = [];
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.map((product, i) => {
            if (product._id === id) {
                cart[i].count = count;
            }
        });

        localStorage.setItem("cart", JSON.stringify(cart));
    }
};

export const removeCartItem = (id, setItems) => {
    let cart = [];
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.map((product, i) => {
            if (product._id === id) {
                cart.splice(i, 1);
            }
        });
        setItems(cart);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
};
