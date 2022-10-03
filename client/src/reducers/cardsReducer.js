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
    case ACTIONS.SET_CARD_FOR_SALE:
      const newArr = state.nftArr.map((card) => {
        if (card.nft_id === action.payload.nft_id) {
          return {
            ...card,
            price: action.payload.price,
            status: action.payload.status
          }
        } else {
          return card;
        }
      });
      console.log('newArr: ');
      console.log(newArr);

      return {
        nftArr: newArr.filter(arr => arr.status === false),
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

