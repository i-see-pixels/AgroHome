import React, { Component } from "react";
import Body from "../Body";
import "./About.css";

export class About extends Component {
    render() {
        return (
            <Body>
                <div className="header">
                    <div className="main">
                        <h1>
                            <strong>About us...</strong>
                        </h1>
                        <p>
                            AgroHome lets Indian farmers to be a part of the
                            online revolution by taking advantage of the latest
                            ecommerce technoligies for selling their best
                            quality agri products at the most appropriate
                            prices.
                        </p>
                        <p>
                            <strong>WHAT IS AGROHOME?</strong>
                        </p>
                        <p>
                            AgroHome has conceived the idea of bringing
                            high-tech ecommerce system to the service of Indian
                            farmers, even in the very rural areas. We are
                            working hard to make this idea work. Urban India is
                            developing rapidly with the growth of new
                            technologies. Yet, India is an agricultural country.
                            To develop India, we must first see growth in
                            agriculture sector. And AgroHome is facilitating
                            this growth with our e-commerce technology and
                            delivery model.
                        </p>
                        <p>
                            <strong>OUR VISION</strong>
                        </p>
                        <p>
                            We are developing complete solution for the
                            agriculture sector of India. We wish to see the
                            India farmer capable to access and utilize the
                            latest technologies , which can save them time and
                            also a lot of money and effort. We want the Indian
                            farmers to have the latest education and knowledge
                            regarding the sector. We provide all these services
                            and education under one roof – AgroHome
                        </p>
                        <p>
                            <strong>WHAT WE DO?</strong>
                        </p>
                        <p>
                            To achieve our mission, we have developed an
                            high-tech e-commerce platform and a Facility Centre
                            Network (FCN) which is the core part of our project.
                            The FCN is basically to help the customers with
                            their first time selling experience. The FCN is also
                            a core part of our delivery network. Our mission is
                            to fulfill the orders in the least time possible,
                            and also to provide appropriate education and
                            assistance through the FCN.
                        </p>

                        <p id="founders">
                            <strong>Founders</strong>
                        </p>
                        <h1>Sandeep Yadav</h1>
                        <h1>Siddhant Singh</h1>
                    </div>
                </div>
            </Body>
        );
    }
}

export default About;
