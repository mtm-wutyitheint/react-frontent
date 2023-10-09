let nextTodoId = 0;
export const addPost = (post) => ({
  type: "ADD_POST",
  id: nextTodoId++,
  payload: post,
});

export const fetchPostsRequest = () => ({
  type: 'FETCH_POSTS_REQUEST',
});

export const fetchPostsSuccess = (data) => ({
  type: 'FETCH_POSTS_SUCCESS',
  payload: data,
});

export const fetchPostsFailure = (error) => ({
  type: 'FETCH_POSTS_FAILURE',
  payload: error,
});