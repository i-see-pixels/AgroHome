import React, { Component } from "react";
import Body from "../Body";
import "./Contact.css";

export class Contact extends Component {
    render() {
        return (
            <Body>
                <section id="contact-section">
                    <div class="container">
                        <h2>Contact Us</h2>
                        <p>
                            Email us and keep up to date with our latest
                            products
                        </p>
                        <div class="contact-form">
                            <div class="contact-info">
                                <i class="fa fa-map-marker"></i>
                                <span class="form-info">
                                    666 Lonavala India #15126
                                </span>
                                <i class="fa fa-phone"></i>
                                <span class="form-info">
                                    Phone no 011 0006482645
                                </span>
                                <i class="fa fa-envelope"></i>
                                <span class="form-info">
                                    agrohomelsnf@gmail.com
                                </span>
                            </div>
                            <div>
                                <form>
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        required
                                    />
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Subject of this message"
                                        required
                                    />
                                    <textarea
                                        name="message"
                                        rows="5"
                                        placeholder="Message"
                                        required
                                    ></textarea>
                                    <button class="submit">Send message</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </Body>
        );
    }
}

export default Contact;
