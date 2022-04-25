import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import App from "./App";
import "./index.css";
import store from "./store/configStore";
import Loader from "./components/ui/Loader";

const PostListPage = lazy(() => import("./pages/PostList"));
const SignupPage = lazy(() => import("./pages/Signup"));
const LoginPage = lazy(() => import("./pages/Login"));
const NewPostPage = lazy(() => import("./pages/NewPost"));
const EditPostPage = lazy(() => import("./pages/EditPost"));
const PostDetailPage = lazy(() => import("./pages/PostDetail"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
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
      </Suspense>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
