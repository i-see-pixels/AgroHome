import React, { useEffect, useState } from "react";
import Body from "../Body";
import "./Search.css";
import { getCategories } from "../../auth/adminAuth";
import Checkbox from "./Checkbox";
import RadioBtn from "./RadioBtn";
import { PRICES_RANGE } from "./filterPrices";
import { getFilteredProducts } from "../Core/apiCore";
import Card from "../Card/Card";
import { useLocation } from "react-router-dom";

const Search = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [searchFilters, setSearchFilters] = useState({
        filters: { category: [], price: [] },
    });
    const [limit, setLimit] = useState(8);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    let location = useLocation();
    const dropFilter = location.pathname.split("/")[2];

    useEffect(() => {
        window.scrollTo(0, 0);
        const loadCategories = () => {
            getCategories().then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setCategories(data);
                }
            });
        };
        loadCategories();
        loadFilteredResult(skip, limit, searchFilters.filters);
    }, []);

    const loadMore = () => {
        const newSkip = skip + limit;
        getFilteredProducts(newSkip, limit, searchFilters).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(newSkip);
            }
        });
    };

    const handlePrices = (value) => {
        const data = PRICES_RANGE;
        let array = [];

        for (let i in data) {
            if (data[i].id === parseInt(value)) {
                array = data[i].array;
            }
        }

        return array;
    };

    const loadFilteredResult = (newFilters) => {
        getFilteredProducts(skip, limit, newFilters).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    const handleFilters = (filters, filterBy) => {
        const newSearchFilters = { ...searchFilters };
        newSearchFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            const priceValues = handlePrices(filters);
            newSearchFilters.filters[filterBy] = priceValues;
        }

        loadFilteredResult(searchFilters.filters);
        setSearchFilters(newSearchFilters);
    };

    console.log(error);

    return (
        <Body>
            <div className="filter-container card">
                <div className="card-heading">Filters</div>
                <div className="filter-heading">Category :</div>
                <ul className="list-group">
                    <Checkbox
                        categories={categories}
                        handleFilters={(filters) =>
                            handleFilters(filters, "category")
                        }
                        appliedFilter={dropFilter}
                    />
                </ul>
                <div className="filter-heading">Price :</div>
                <ul className="list-group">
                    <RadioBtn
                        priceRange={PRICES_RANGE}
                        handleFilters={(filters) =>
                            handleFilters(filters, "price")
                        }
                    />
                </ul>
            </div>

            <div className="products-container">
                {filteredResults.map((item, i) => (
                    <Card key={i} product={item} />
                ))}
            </div>
            {size > 0 && size >= limit && (
                <button onClick={loadMore} className="btn load-more-btn">
                    Load More
                </button>
            )}
        </Body>
    );
};

export default Search;
