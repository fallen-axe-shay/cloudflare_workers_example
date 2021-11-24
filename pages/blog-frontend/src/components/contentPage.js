import React, { useEffect, useState, Component } from "react";
import { Link } from "@reach/router";
import Button from 'react-bootstrap/Button';
import { FormControl } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Redirect } from '@reach/router';
import Cookies from 'universal-cookie';
import Posts from "./posts";
import WritePost from "./writePost";

class ContentPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username : null,
      password: null,
      error: null,
      redirect: false
  };
    this.logOut = this.logOut.bind(this);
    this.cookies = new Cookies();
    if(!this.cookies.get('username')) {
      var temp = this.state;
      temp.redirect = true;
      this.setState(temp);
    }  
  }
  logOut = () => {
    //   const getLogin = async () => {
    //     const host = "https://workers.jerry-allan-akshay3096.workers.dev"
    //     const url = host + "/login"
    //     const body = {
    //       username: this.state.username,
    //       password: this.state.password
    //     }
    //     const init = {
    //       body: JSON.stringify(body),
    //       method: "POST"
    //     }
    //     const resp = await fetch(url, init);
    //     const results = await resp.json();
    //     temp = this.state;
    //     if(results.code === '100') {
    //       temp.error = <div className="errorText"><span>Invalid username or password.</span></div>;
    //     } else if (results.code === '105') {
    //       temp.error = <div className="errorText"><span>An error occured. Please try again later.</span></div>;
    //     } else {
    //       temp.error = null;
    //       temp.redirect = true;
    //     }
    //     this.setState(temp);
    //     this.cookies.set('username', '@' + this.state.username, { path: '/' });
    //   }
    //   getLogin();
    this.cookies.remove("username");
    var temp = this.state;
    temp.redirect = true;
    this.setState(temp);
  }
render() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{'backgroundColor': '#0028ba'}}>
            <a className="navbar-brand flex-grow-1" href="#">CloudflareBook</a>
            <span className="username">{this.cookies.get('username')}</span>
            <span className="username log-out-button" onClick={()=>{this.logOut()}}>Log Out</span>
        </nav>
        <div className="container-posts">
            <Posts />
        </div>
        <div className="write-post">
            <WritePost />
        </div>
        { this.state.redirect ? (<Redirect noThrow={true} to="/"/>) : null }
    </div>  
);
}
}

export default ContentPage;