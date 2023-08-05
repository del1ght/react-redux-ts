import React, { useEffect } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

export const TodoList = () => {
  const { error, limit, loading, page, todos } = useTypedSelector(
    (state) => state.todo
  );
  const { fetchTodos } = useActions();

  useEffect(() => {
    fetchTodos(page, limit);
  }, []);

  if (loading) return <p>loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div>
      {todos.length ? (
        <>
          {todos.map((todo) => (
            <div key={todo.id}>
              {todo.id} - {todo.title}
            </div>
          ))}

          <Pagination />
        </>
      ) : (
        <p>no todos</p>
      )}
    </div>
  );
};

const Pagination = () => {
  const pages = [1, 2, 3, 4, 5];
  const { page: currentPage } = useTypedSelector((state) => state.todo);
  const { setTodoPage } = useActions();

  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        marginTop: '10px',
      }}
    >
      {pages.map((page) => {
        return (
          <button
            onClick={() => setTodoPage(page)}
            style={{
              outline: page === currentPage ? '2px white solid' : 'unset',
            }}
            key={page}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};
