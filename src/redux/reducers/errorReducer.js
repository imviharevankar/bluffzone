import { CLEAR_ERRORS, GET_ERRORS } from "../actions/types";

const initialState = {
  message: {},
  status: null,
  id: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        message: action.payload.message,
        status: action.payload.status,
        id: action.payload.id,
      };

    case CLEAR_ERRORS:
      return state;

    default:
      return state;
  }
}
