export const fetchUserById = async id => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  );
  return await response.json();
};

export const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return await response.json();
};
