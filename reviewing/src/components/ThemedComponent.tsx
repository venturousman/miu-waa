
type PropsType = {
    theme: string;
    toggleTheme: () => void;
}

const ThemedComponent = ({theme, toggleTheme}:PropsType) => {
  return (
      <div style={{background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000': '#fff'}}>
          <p>The current theme is {theme}</p>
          <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
  );
};

export default ThemedComponent;