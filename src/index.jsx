import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import "./index.css";
import store from "./store/configStore";

import PostListPage from "./pages/PostList";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import NewPostPage from "./pages/NewPost";
import EditPostPage from "./pages/EditPost";
import PostDetailPage from "./pages/PostDetail";
import NotFoundPage from "./pages/NotFound";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<PostListPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="signin" element={<LoginPage />} />
          <Route path="new-post" element={<NewPostPage />} />
          <Route path="edit-post/:postId" element={<EditPostPage />} />
          <Route path="posts/:postId" element={<PostDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
