import ACTIONS from "../constants/constants";

export const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      console.log(action.payload)
      return {
        status: action.payload
      };
    case ACTIONS.LOGOUT:
      return {
        status: null
      };
    default:
      return state;
  }
};