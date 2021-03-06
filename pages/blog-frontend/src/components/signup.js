import React, { Component } from "react";
import { Link } from "@reach/router";
import Button from 'react-bootstrap/Button';
import { FormControl } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Redirect } from '@reach/router';
import Cookies from 'universal-cookie';

class Signup extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username : null,
      password: null,
      passwordVerify: null,
      error: null,
      redirect: false
  };
    this.cookies = new Cookies();
    if(this.cookies.get('username')) {
      var temp = this.state;
      temp.redirect = true;
      this.setState(temp);
    }  
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    var temp;
    try {
      if(this.state.password!==this.state.passwordVerify) {
        temp = this.state;
        temp.error = <div className="errorText"><span>The passwords do not match. Kindly check the passwords and try again!</span></div>;
        this.setState(temp);
      } else if(this.state.password.trim() === "" || this.state.passwordVerify.trim() === "" || this.state.username.trim() === "") {
        temp = this.state;
        temp.error = <div className="errorText"><span>Invalid input data.</span></div>;
        this.setState(temp);
      } else {
        temp = this.state;
        temp.error = null;
        this.setState(temp);

        //Signup with API call
        const postSignup = async () => {
          const host = "https://workers.jerry-allan-akshay3096.workers.dev"
          const url = host + "/signup"
          const body = {
            username: this.state.username,
            password: this.state.password
          }
          const init = {
            body: JSON.stringify(body),
            method: "POST"
          }
          const resp = await fetch(url, init);
          const results = await resp.json();
          temp = this.state;
          if(results.code === '100') {
            temp.error = <div className="errorText"><span>User already exists. Please <a href="/">login</a> instead.</span></div>;
          } else if (results.code === '105') {
            temp.error = <div className="errorText"><span>An error occured. Please try again later.</span></div>;
          } else {
            temp.error = null;
            this.cookies.set('username', '@' + this.state.username, { path: '/' });
            temp.redirect = true;
          }
          this.setState(temp);
        }
        postSignup();
      }
    } catch(ex) {
      temp = this.state;
      temp.error = <div className="errorText"><span>Invalid input data.</span></div>;
      this.setState(temp);
    }
  } 
  
  render() {
    return (
        <div className="d-flex justify-content-center login-component"> 
            <div className="d-flex flex-column justify-content-center" style={{ height: '100%', width: '400px'}}>
            <h2 className="text-center p-3">Sign Up</h2>
              <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                  <FormControl
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={event => {
                    var temp = this.state;
                    temp.username = event.target.value;
                    this.setState({
                       temp
                    });
                }} 
                value={this.state.username ? this.state.username : ""}
                  />
              </InputGroup>
              <InputGroup className="mb-3">
                  <FormControl
                      placeholder="Password"
                      aria-label="Password"
                      type="password"
                      onChange={event => {
                        var temp = this.state;
                        temp.password = event.target.value;
                        this.setState({
                          temp
                        });
            
                    }} 
                    value={this.state.password ? this.state.password : ""}
                  />
              </InputGroup>
              <InputGroup className="mb-3">
                  <FormControl
                      placeholder="Retype Password"
                      aria-label="Password"
                      type="password"
                      onChange={event => {
                        var temp = this.state;
                        temp.passwordVerify = event.target.value;
                        this.setState({
                          temp
                        });
            
                    }} 
                    value={this.state.passwordVerify ? this.state.passwordVerify : ""}
                  />
              </InputGroup>
          <Button onClick={()=>{this.handleClick()}}>Sign Up</Button>
          {this.state.error}
          { this.state.redirect ? (<Redirect noThrow={true} to="/content"/>) : null }
      </div>
        </div>
      
    )
  };
}

export default Signup;