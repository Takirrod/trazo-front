import { useState } from "react";
import styles from "../../styles/components/input/Serachbar.module.css";

// TODO  data
// type Data = {
//     name: string
//   }

// interface LayoutProps {
//     data: Data;
//   }

function SearchBar({}) {
  const [query, setQuery] = useState("");

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);

    if (value.length > 3) {
      const response = await fetch(
        `http://localhost:3000/api/products?=${value}`
      );
      const data = await response.json();
      console.log(response);
    }
  };
  return (
    <input
      className={styles.input}
      onChange={onChange}
      id="search-bar"
      type="search"
      name="search"
      value={query}
      placeholder="Buscar..."
    />
  );
}

export default SearchBar;
