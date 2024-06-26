import { toast } from "react-toastify";
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "./actions";

const initialState = {
  accessToken: "",
  isLoggedIn:
    !!localStorage.getItem("userToken") || !!sessionStorage.getItem("userToken")
      ? true
      : false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      toast.success("Login successfully");
      return { ...state, ...action.payload };
    case LOGOUT_SUCCESS:
      // console.log("seddd");
      toast.success("Logout successfully");

      initialState.isLoggedIn = false;
      return initialState;
    default:
      return state;
  }
};
