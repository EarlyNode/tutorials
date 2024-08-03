import { retrieveUserProfileFromDatabaseByEmail } from '@/features/user-profile/user-profile-model';

export default async function Dashboard() {
  const user =
    await retrieveUserProfileFromDatabaseByEmail('jan@reactsquad.io');

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <ul>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
        </ul>
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
}
