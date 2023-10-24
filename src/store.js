const initialState = {
  id: '',
  login: null,
};

export const LOGIN_ACTION_TYPE = {
  SET_ID: 'SET_ID',
  SET_LOGIN: 'SET_LOGIN',
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ACTION_TYPE.SET_ID:
      return {
        ...state,
        id: action.payload, // 로그인 상태로 변경
      };
    case LOGIN_ACTION_TYPE.SET_LOGIN:
      return {
        ...state,
        login: action.payload, // 로그아웃 상태로 변경
      };
    default:
      return state; // 아무 작업도 하지 않고 현재 상태 반환
  }
};
