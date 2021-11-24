import React, { useEffect, useState, Component } from "react";
import { Link } from "@reach/router";
import { logo } from './../logo.svg';
import { Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import Button from 'react-bootstrap/Button';
import Posts from "./posts";




//////////////////////////////////

class WritePost extends Component {
    constructor(props, context) {
      super(props, context);
      this.cookies = new Cookies();
      this.state = {
        username : this.cookies.get('username'),
        title: null,
        content: null,
        error: null
    };
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick = () => {
      var temp;
        //Write Post
        const writePost = async () => {
          const host = "https://workers.jerry-allan-akshay3096.workers.dev"
          const url = host + "/posts"
          const body = {
            username: this.state.username,
            title: this.state.title,
            content: this.state.content
          }
          const init = {
            body: JSON.stringify(body),
            method: "POST"
          }
          const resp = await fetch(url, init);
          const results = await resp.json();
          console.log(results);
          temp = this.state;
          if (results.status === '105') {
            temp.error = <div className="errorText"><span>An error occured. Please try again later.</span></div>;
          } else {
            temp.error = <div className="successText"><span>Post successfully submitted!</span></div>;
          }
          this.setState(temp);
          setInterval(()=> {
            temp = this.state;
            temp.error = null;
            this.setState(temp);
            window.location.reload(false);
            }, 2000);
        }
        writePost();
    }
  render() {
    return (
        <div className="d-flex flex-column justify-content-around new-post-container">
        <div className="d-flex flex-column new-post">
          <div>
              <span>Write a Post</span>
          </div>
          <div className="write-post-form">
            <Form.Label>Title</Form.Label>
            <Form.Control size="sm" type="text" 
            onChange={event => {
                var temp = this.state;
                temp.title = event.target.value;
                this.setState({
                   temp
                });
            }}
                value={this.state.title ? this.state.title : ""} />
            </div>
            <div className="write-post-form">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows={3} 
                onChange={event => {
                    var temp = this.state;
                    temp.content = event.target.value;
                    this.setState({
                       temp
                    });
                }}
                    value={this.state.content ? this.state.content : ""}/>
            </div>
            <div className="write-post-form">
            <Button onClick={()=>{this.handleClick()}}>Submit</Button>
            </div>
            <div className="write-post-form">{this.state.error}</div>
        </div>
        </div>
  );
  }
  }
  
  export default WritePost;