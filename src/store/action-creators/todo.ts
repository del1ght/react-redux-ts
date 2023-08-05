import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { TodoAction, TodoActionTypes } from '../../types/todo';
import { RootState } from '../reducers';

//thunk
export const fetchTodos = (
  page = 1,
  limit = 10
): ThunkAction<void, RootState, unknown, TodoAction> => {
  return async (dispatch) => {
    try {
      dispatch({ type: TodoActionTypes.FETCH_TODOS });
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos',
        { params: { _page: page, _limit: limit } }
      );
      dispatch({
        type: TodoActionTypes.FETCH_TODOS_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: TodoActionTypes.FETCH_TODOS_ERROR,
        payload: 'error when fetching todos',
      });
    }
  };
};

export const setTodoPage = (
  page: number
): ThunkAction<void, RootState, unknown, TodoAction> => {
  return async (dispatch, getState) => {
    dispatch({ type: TodoActionTypes.SET_TODO_PAGE, payload: page });

    const currentPage = getState().todo.page;
    dispatch(fetchTodos(currentPage));
  };
};
