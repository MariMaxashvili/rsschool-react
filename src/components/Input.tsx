import React from "react";

interface InputProps {
  pokemon: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export class Input extends React.Component<InputProps> {
  render() {
    const { pokemon, onChange, onSearch } = this.props;
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
  }
}
