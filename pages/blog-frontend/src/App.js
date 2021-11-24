import logo from './logo.svg';
import './App.css';
import { Router } from "@reach/router";
//import Posts from './components/posts'
//import Post from './components/post'
import ContentPage from './components/contentPage';
import Login from './components/login'
import Signup from './components/signup'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Login path="/" />
      <Signup path="/signup" />
      {/* <Posts path="/posts" />
      <Post path="/posts/:id" /> */}
      <ContentPage path="/content" />
    </Router>
  );
}

export default App;
