import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const resp = await fetch(
        "http://127.0.0.1:8787/posts"
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
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>
            <Link to={`http://127.0.0.1:8787/posts/${post.id}`}>{post.title}</Link>
          </h2>
        </div>
      ))}
    </div>
  );
};

export default Posts;