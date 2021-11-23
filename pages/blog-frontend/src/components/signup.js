import React, { Component } from "react";
import { Link } from "@reach/router";
import Button from 'react-bootstrap/Button';
import { FormControl } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Redirect } from '@reach/router';

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
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    var temp;
    if(this.state.password!==this.state.passwordVerify) {
      temp = this.state;
      temp.error = <div className="errorText"><span>The passwords do not match. Kindly check the passwords and try again!</span></div>;
      this.setState(temp);
    } else {
      temp = this.state;
      temp.error = null;
      this.setState(temp);

      //Signup with API call
      const postSignup = async () => {
        const host = "http://127.0.0.1:8787"
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
          temp.error = <div className="errorText"><span>User already exists. Please login instead.</span></div>;
        } else if (results.code === '105') {
          temp.error = <div className="errorText"><span>An error occured. Please try again later.</span></div>;
        } else {
          temp.error = true;
          temp.redirect = true;
        }
        this.setState(temp);
        console.log(results);
      }
      postSignup();
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
          { this.state.redirect ? (<Redirect noThrow={true} to="/posts"/>) : null }
      </div>
        </div>
      
    )
  };
}

// const Signup = () => {
//   const [credentials, setCred] = useState({});

//   useEffect(() => {
//     // const getPost = async () => {
//     //   const resp = await fetch(
//     //     `http://127.0.0.1:8787/posts/${id}`
//     //   );
//     //   const postResp = await resp.json();
//     //   setPost(postResp);
//     // };

//     // getPost();
//     setCred({'username':null, 'password': null});
//   }, []);

//   // if (!Object.keys(post).length) return <div />;
//   function verifyData () {
//     console.log("Here")
//   }
  
// };

export default Signup;