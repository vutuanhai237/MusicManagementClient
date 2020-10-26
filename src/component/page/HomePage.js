import React, { Component } from "react";
import Header from "../container/Header"
import Footer from "../container/Footer"
import { ListMusic } from "../container/ListMusic"
export const HomePage = () => {

    return (
        <div>
            <Header />
            <ListMusic />
            <Footer />
        </div>
    );

}

