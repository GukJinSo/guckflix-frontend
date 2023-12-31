import './App.css';
import Header from './component/header/Header.js';
import { Route, Routes } from 'react-router-dom';
import Footer from './component/footer/Footer';
import Catalog from './page/catalog/Catalog';
import Detail from './page/detail/Detail';
import ActorDetail from './page/detail/actorDetail';
import LoginForm from './page/login/LoginForm';
import { loginReducer } from './store.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import LoginChecker from './LoginChecker';
import ActorEditForm from './page/detail/ActorEditForm';
import Home from './page/Home';
import AdminRoute from './AdminRoute';
import MovieForm from './page/movieForm/MovieForm';
import SignUpForm from './page/login/SignUpForm.js';
import MovieupdateForm from './page/movieForm/movieupdateForm.js';
import Admin from './page/admin/admin.js';

function App() {
  const store = createStore(loginReducer);
  return (
    <div className="App">
      <Provider store={store}>
        <LoginChecker />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/catalog/" element={<Catalog />} />
          <Route path="/movies/:id" element={<Detail />} />
          <Route path="/actors/:id" element={<ActorDetail />} />
          <Route path="/loginForm" element={<LoginForm />} />
          <Route path="/signUpForm" element={<SignUpForm />} />
          <Route path="/admin" element={<AdminRoute element={<Admin />} />} />
          <Route
            path="/actors/:id/edit"
            element={<AdminRoute element={<ActorEditForm />} />}
          />
          <Route
            path="/movies/form"
            element={<AdminRoute element={<MovieForm />} />}
          />
          <Route
            path="/movies/:id/updateForm"
            element={<AdminRoute element={<MovieupdateForm />} />}
          />
        </Routes>
        <Footer />
      </Provider>
    </div>
  );
}

export default App;
