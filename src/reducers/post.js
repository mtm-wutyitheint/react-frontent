const post = (state = { data: [] }, action) => {
  console.log(state, action);
  switch (action.type) {
    case "ADD_POST":
      return {
        ...state,
        // loading: false,
        data: action.payload.data,
      };
    case "FETCH_POSTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_POSTS_SUCCESS":
      return {
        ...state,
        // loading: false,
        data: action.payload.data,
      };
    case "FETCH_POSTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default post;
