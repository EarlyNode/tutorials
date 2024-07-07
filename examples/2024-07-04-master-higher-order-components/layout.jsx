export function Layout({ children, showHeader = true }) {
  return (
    <div>
      {showHeader && (
        <header>
          <h1>Some Title</h1>
        </header>
      )}

      <main>{children}</main>

      <footer>
        <p>Some footer</p>
      </footer>
    </div>
  );
}
