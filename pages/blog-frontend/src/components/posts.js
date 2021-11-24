import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import { logo } from './../logo.svg';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const resp = await fetch(
        "https://workers.jerry-allan-akshay3096.workers.dev/posts"
      );
      const postsResp = await resp.json();
      //const postsResp = await JSON.parse(JSON.stringify(resp.json()));
      console.log(postsResp);
      setPosts(postsResp.posts);
    };
    getPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="d-flex flex-column post">
            <span className="title">{post.title}</span>
            <span className="post-username">{post.username}</span>
            <hr/>
            {post.id==='123' ? (<img src="logo512.png" alt="Post Image" className="post-image"></img>): null}
            <span className="post-content">{post.content}</span>
        </div>
      ))}
    </div>
  );
};

export default Posts;