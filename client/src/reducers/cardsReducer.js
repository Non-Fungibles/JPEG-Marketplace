import ACTIONS from "../constants/constants";


export const cardsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOAD_CARDS:
      return {
        nftArr: action.payload,
      };
    case ACTIONS.CREATE_CARD:
      return {
        nftArr: [action.payload, ...state.nftArr],
      };
    case ACTIONS.UPDATE_CARD:
      const newArr = state.nftArr.map((card) => {
        if (card.nft_id === action.payload.nft_id) {
          card = action.payload;
        }
      });
      return {
        nftArr: newArr,
      };

    case ACTIONS.DELETE_CARD:
      return {
        nftArr: state.nftArr.filter(
          (card) => card.nft_id !== action.payload.nft_id
        ),
      };

    default:
      return state;
  }
};

