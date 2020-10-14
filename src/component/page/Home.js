import React, { Component } from "react";
import Header from "../container/Header"
import Footer from "../container/Footer"
import ListMusic from "../container/ListMusic"
class Home extends Component {
    render() {
        return (
            <div>
               <Header/>
               <ListMusic/>
               <Footer/>
            </div>
        );
    }
}

export default Home;
