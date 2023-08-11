import { useEffect, useState } from 'react';
import Searchbar from "./SearchBar"
import './css/Nav.css';

export default function Nav(props) {
  const { onSearch } = props;
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHidden(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`topLabel ${hidden ? 'hidden' : ''}`}>
      <Searchbar className="buscador" onSearch={onSearch}/>
           
    </div>
  );
}