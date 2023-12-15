import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../img/header_logo.png';
import './header.css';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_ACTION_TYPE } from '../../store.js';
import apiConfig from '../../config/apiConfig.js';

const Header = () => {
  const login = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // logout
  const logoutHandle = async () => {
    const promise = await fetch(`${apiConfig.baseUrl}/members/logout`, {
      method: 'POST',
      headers: {},
      credentials: 'include',
    });

    const response = await promise.json();
    console.log(response);

    if (response.status_code === 200) {
      dispatch({ type: LOGIN_ACTION_TYPE.SET_ID, payload: null });
      dispatch({ type: LOGIN_ACTION_TYPE.SET_LOGIN, payload: false });
      dispatch({ type: LOGIN_ACTION_TYPE.SET_ROLE, payload: null });
      navigate('/');
    }
  };

  const role = useSelector((state) => state.role);

  // Nav
  const headerNav = [
    { text: 'Home', path: '/' },
    { text: 'Movie', path: '/movies/catalog' },
    // { text: 'TV', path: '/catalog/tv' },
  ];
  const nav = useNavigate();

  // 헤더 축소 애니메이션
  const header = useRef(null);
  const shrinkHeader = () => {
    if (window.scrollY > 100) {
      header.current.classList.add('shrinkHeader');
    } else {
      header.current.classList.remove('shrinkHeader');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', shrinkHeader);
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);

  return (
    <div className="header" ref={header}>
      <div
        className="header__logo"
        onClick={() => {
          nav('/');
        }}
      >
        <img src={logo} className="header__logo__img" alt="" />
      </div>
      <ul className="header__items">
        {role === 'ADMIN' ? (
          <li className="header__itmes__li">
            <Link to={'/admin'}>Admin</Link>
          </li>
        ) : (
          <></>
        )}
        {headerNav.map((e, i) => {
          return (
            <li className="header__itmes__li" key={i}>
              <Link to={e.path}>{e.text}</Link>
            </li>
          );
        })}
        <li className="header__itmes__li">
          {!login ? (
            <Link to={'/loginForm'}>{'Login'}</Link>
          ) : (
            <button onClick={logoutHandle}>LogOut</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Header;
