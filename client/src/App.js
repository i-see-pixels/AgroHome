import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

//components
import Navbar from "./components/Navbar/Navbar.js";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Contact from "./components/Info/Contact";
import About from "./components/Info/About";
import Cart from "./components/Cart/Cart";
import SignUp from "./components/SignUp/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import AddCategory from "./components/Admin/AddCategory";
import AddProduct from "./components/Admin/AddProduct";
import Search from "./components/Search/Search";
import Product from "./components/Product/Product";

import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/contactus" exact component={Contact} />
                    <Route path="/about" exact component={About} />
                    <Route path="/cart" exact component={Cart} />
                    <Route path="/signup" exact component={SignUp} />
                    <PrivateRoute
                        path="/user/dashboard"
                        exact
                        component={Dashboard}
                    />
                    <AdminRoute
                        path="/admin/dashboard"
                        exact
                        component={AdminDashboard}
                    />
                    <AdminRoute
                        path="/create/category"
                        exact
                        component={AddCategory}
                    />
                    <AdminRoute
                        path="/create/product"
                        exact
                        component={AddProduct}
                    />
                    <Route path="/search" exact component={Search} />
                    <Route
                        path="/search/:categoryId"
                        exact
                        component={Search}
                    />
                    <Route
                        path="/product/:productId"
                        exact
                        component={Product}
                    />
                </Switch>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
