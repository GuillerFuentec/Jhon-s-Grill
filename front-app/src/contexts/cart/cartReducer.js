
export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.items.find(
        (item) => item.cartKey === action.payload.cartKey,
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.cartKey === action.payload.cartKey
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.cartKey !== action.payload.cartKey,
        ),
      };

    case "DECREASE_QTY":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.cartKey === action.payload.cartKey
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };

    case "UPDATE_QUANTITY":
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => item.cartKey !== action.payload.cartKey,
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.cartKey === action.payload.cartKey
            ? { ...item, quantity: action.payload.quantity }
            : item,
        ),
      };

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };

    case "LOAD_CART":
      return action.payload;

    default:
      return state;
  }
};
