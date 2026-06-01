interface InputProps {
  pokemon: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

const Input = ({ pokemon, onChange, onSearch }: InputProps) => {
  return (
    <div className="search-section">
      <h1>Pokemon</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for pokemon..."
          value={pokemon}
          onChange={(e) => onChange(e.target.value)}
        />
        <button onClick={onSearch}>Search</button>
      </div>
    </div>
  );
};

export { Input };
