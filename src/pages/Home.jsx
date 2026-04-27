import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [apiUrl, setApiUrl] = useState("https://rickandmortyapi.com/api/character");
  const [pageInfo, setPageInfo] = useState({ next: null, prev: null });

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        setCharacters(data.results);
        setPageInfo({ next: data.info.next, prev: data.info.prev });
      });
  }, [apiUrl]);

  const filteredData = characters.filter(char => 
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>Rick & Morty Characters</h1>
      
      <input 
        type="text" 
        placeholder="Search names..." 
        onChange={(e) => setSearchTerm(e.target.value)} 
        style={{ marginBottom: '20px', padding: '8px' }}
      />

      <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Species</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(char => (
            <tr key={char.id}>
              <td><img src={char.image} alt={char.name} width="50" /></td>
              <td><Link to={`/profile/${char.id}`}>{char.name}</Link></td>
              <td>{char.species}</td>
              <td>{char.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*Pagination*/}
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => setApiUrl(pageInfo.prev)} 
          disabled={!pageInfo.prev}
        >
          Previous
        </button>
        <button 
          onClick={() => setApiUrl(pageInfo.next)} 
          disabled={!pageInfo.next}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;