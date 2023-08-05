import { useEffect } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

export const UserList = () => {
  const { loading, users, error } = useTypedSelector((state) => state.user);
  const { fetchUsers } = useActions();

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div>
      {users.length ? (
        users.map((user) => <div key={user.id}>{user.name}</div>)
      ) : (
        <p>no users</p>
      )}
    </div>
  );
};
