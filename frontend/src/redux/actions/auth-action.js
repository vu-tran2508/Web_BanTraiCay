import {
    LOGOUT, FETCH_REGISTER,
    FETCH_REGISTER_FAILURE,
    FETCH_REGISTER_SUCCESS,
    FETCH_LOGIN,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_FAILURE,
    FETCH_LOGIN_ROLE_FAILURE
} from "../constants/actions-types";
import AuthService from "../../services/AuthService";
import { jwtDecode } from "jwt-decode";



export const register = (user) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_REGISTER });
        try {
            const response = await AuthService.register(user);
            dispatch({
                type: FETCH_REGISTER_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: FETCH_REGISTER_FAILURE,
                payload: error.message
            });
        }
    }
}

export const login = (user, navigate) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_LOGIN });
    try {
      const response = await AuthService.login(user);

      if (response && response.accessToken) {
        const decodedToken = jwtDecode(response.accessToken);

        if (decodedToken && decodedToken.roles) {
          const isStaffOrAdmin =decodedToken.roles.includes("ROLE_USER");

          if (isStaffOrAdmin) {
            if (response.accessToken) {
              localStorage.setItem("user", JSON.stringify(response));
            }
            dispatch({
              type: FETCH_LOGIN_SUCCESS,
              payload: response,
            });
            const res = await AuthService.getUserLogin();
            console.log("DATA TRẢ VỀ ",res);
            localStorage.setItem("customer", JSON.stringify(res));
            navigate("/");
          } else {
            dispatch({
              type: FETCH_LOGIN_ROLE_FAILURE,
              payload: response,
            });
            navigate("/403");
          }
        }
      } else {
        console.log("VAI TRO: Dang nhap that bai");
      }
    } catch (error) {
      dispatch({
        type: FETCH_LOGIN_FAILURE,
        payload: error.message,
      });
    }
  };
};

  

export const logout = (navigate) => (dispatch) => {
    AuthService.logout();
    navigate("/account/login");
    dispatch({
        type: LOGOUT,
    })
}