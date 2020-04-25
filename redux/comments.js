import * as ActionTypes from './ActionTypes';

export const comments = (
  state = {
    errMess: null,
    comments: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {
        ...state,
        errMess: null,
        comments: action.payload,
      };

    case ActionTypes.COMMENTS_FAILED:
      return {
        ...state,
        errMess: action.payload,
        comments: [],
      };

    case ActionTypes.ADD_COMMENT:
      const lastComment = state.comments[state.comments.length - 1];
      return {
        ...state,
        comments: state.comments.concat({
          ...action.payload,
          id: lastComment ? lastComment.id + 1 : 0,
        }),
      };

    default:
      return state;
  }
};
