import { useEffect, useState } from "react";
import { Link } from "react-router";
import { fetchAllCharacters } from "../../utils/st/api";

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  //
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllCharacters();
      setCharacters(data);
    };
    fetchData();
  }, []);
  //
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">角色列表</h1>
      <ul className="space-y-2">
        {characters.map((c, i) => (
          <li key={i} className="p-2 border rounded shadow">
            <Link to={`/chat/characters/${c.name}`} className="flex items-center space-x-2">
              {c.avatar && (
                <img src={`http://127.0.0.1:8000/characters/${c.avatar}`} alt={c.name} className="w-10 h-10 rounded-full" />
              )}
              <div>
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm text-gray-500">{c.description}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
