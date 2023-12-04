import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loading from './component/loading/Loading';

const AdminRoute = ({ element }) => {
  const login = useSelector((state) => state.login);
  const role = useSelector((state) => state.role);

  // 주소 창 타고 들어올 경우 로그인 처리 결과가 로드될 때까지 로딩 스피너
  if (login === null) {
    return <Loading />;
  }

  // 관리자인 경우
  return login && role === 'ADMIN' ? (
    element
  ) : (
    <Navigate to="/loginForm" {...alert(`관리자 권한이 필요한 서비스입니다`)} />
  );
};

export default AdminRoute;
