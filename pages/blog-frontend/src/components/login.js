import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import Button from 'react-bootstrap/Button';
import { FormControl } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";

const Post = ({ id }) => {
  const [post, setPost] = useState({});

  useEffect(() => {
    const getPost = async () => {
      const resp = await fetch(
        `http://127.0.0.1:8787/posts/${id}`
      );
      const postResp = await resp.json();
      setPost(postResp);
    };

    getPost();
  }, [id]);

  if (!Object.keys(post).length) return <div />;

  return (
      <div className="d-flex justify-content-center login-component"> 
          <div className="d-flex flex-column justify-content-center" style={{ height: '100%', width: '400px'}}>
          <h2 className="text-center p-3">Login</h2>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                <FormControl
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Password"
                    aria-label="Password"
                    type="password"
                />
            </InputGroup>
        <Button>Login</Button>
        <span>New User? <a href="/signup">Signup Here!</a></span>
    </div>
      </div>
    
  );
};

export default Post;