export const UserProfileComponent = ({ isLoggedIn, email, onLoginClicked }) => (
  <div className="flex items-center space-x-4">
    {isLoggedIn ? (
      <p className="text-2xl">Email: {email}</p>
    ) : (
      <button
        className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-medium text-black shadow transition-colors hover:bg-white/90"
        onClick={() =>
          onLoginClicked({ id: '123', email: 'jan@reactsquad.io' })
        }
      >
        Login
      </button>
    )}
  </div>
);
