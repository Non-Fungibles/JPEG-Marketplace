import ACTIONS from "../constants/constants";

export const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return action.payload
    case ACTIONS.LOGOUT:
      return {
        ...action.payload,
        status: null
      }
    case ACTIONS.UPDATE_BALANCE:
      console.log(action.payload);
      return {
        ...state,
        balance: action.payload 
      }
    default:
      return state;
  }
};