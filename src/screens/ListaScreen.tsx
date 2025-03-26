import React, { useState, useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Tv, Search, SortAsc, SortDesc } from 'lucide-react'; // Added Search, SortAsc, SortDesc icons
import { ThemeContext } from '../contexts/ThemeContext';

interface Game {
  id: string;
  nome: string;
  plataforma: string;
  // Add other fields if needed for display later
}

interface ListaScreenProps {
  games: Game[];
}

type SortOrder = 'id-asc' | 'id-desc';

const ListaScreen: React.FC<ListaScreenProps> = ({ games }) => {
  const { theme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('id-asc'); // Default sort order

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'id-asc' ? 'id-desc' : 'id-asc'));
  };

  const filteredAndSortedGames = useMemo(() => {
    let filtered = games;

    // Filter by search term (case-insensitive search in name and platform)
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(game =>
        game.nome.toLowerCase().includes(lowerCaseSearchTerm) ||
        game.plataforma.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    // Sort by ID
    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === 'id-asc') {
        return a.id.localeCompare(b.id);
      } else { // 'id-desc'
        return b.id.localeCompare(a.id);
      }
    });

    return sorted;
  }, [games, searchTerm, sortOrder]);

  // Styles
  const containerStyle = `p-6 rounded-lg shadow-lg max-w-4xl mx-auto ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`;
  const titleStyle = `text-2xl font-bold mb-6 text-center ${theme === 'light' ? 'text-gray-800' : 'text-white'}`;
  const textStyle = `${theme === 'light' ? 'text-gray-800' : 'text-white'}`;
  const inputGroupStyle = `relative mb-4`;
  const inputStyle = `w-full p-2 pl-10 border rounded ${theme === 'light' ? 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'}`;
  const inputIconStyle = `absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${theme === 'light' ? 'text-gray-400' : 'text-gray-400'}`;
  const controlsContainerStyle = `flex flex-col sm:flex-row justify-between items-center mb-4 gap-4`;
  const sortButtonStyle = `px-3 py-1.5 rounded text-sm font-medium flex items-center whitespace-nowrap transition-colors ${theme === 'light' ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' : 'bg-gray-600 hover:bg-gray-500 text-white'}`;
  const listItemStyle = `flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b ${theme === 'light' ? 'border-gray-200 hover:bg-gray-50' : 'border-gray-700 hover:bg-gray-700'}`;
  const gameInfoStyle = `flex items-center flex-wrap mb-2 sm:mb-0 mr-4`;
  const platformStyle = `text-xs sm:text-sm ml-2 px-2 py-0.5 rounded whitespace-nowrap ${theme === 'light' ? 'bg-gray-200 text-gray-600' : 'bg-gray-600 text-gray-300'}`;
  const idStyle = `text-xs ml-2 mt-1 sm:mt-0 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`;
  const linkStyle = `flex items-center px-3 py-1 rounded text-sm whitespace-nowrap mt-2 sm:mt-0 ${theme === 'light' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-blue-900 text-blue-300 hover:bg-blue-800'}`;
  const noteStyle = `mt-4 text-sm text-center ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`;

  return (
    <div className={containerStyle}>
      <h2 className={titleStyle}>Lista de Jogos Cadastrados</h2>

      {/* Search and Sort Controls */}
      <div className={controlsContainerStyle}>
        <div className={`${inputGroupStyle} flex-grow w-full sm:w-auto`}>
          <Search className={inputIconStyle} />
          <input
            type="text"
            placeholder="Buscar por nome ou plataforma..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={inputStyle}
          />
        </div>
        <button onClick={toggleSortOrder} className={sortButtonStyle}>
          {sortOrder === 'id-asc' ? (
            <SortAsc className="mr-1 h-4 w-4" />
          ) : (
            <SortDesc className="mr-1 h-4 w-4" />
          )}
          Ordenar por ID {sortOrder === 'id-asc' ? 'Crescente' : 'Decrescente'}
        </button>
      </div>

      {/* Game List */}
      {filteredAndSortedGames.length === 0 ? (
        <p className={`text-center py-4 ${textStyle}`}>
          {searchTerm ? 'Nenhum jogo encontrado com esse termo.' : 'Nenhum jogo cadastrado ainda.'}
        </p>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredAndSortedGames.map((game) => (
            <li key={game.id} className={listItemStyle}>
              <div className={gameInfoStyle}>
                <span className={`${textStyle} font-medium`}>{game.nome}</span>
                <span className={platformStyle}><Tv size={12} className="inline mr-1"/>{game.plataforma}</span>
                <span className={idStyle}>(ID: {game.id.substring(0, 8)}...)</span>
              </div>
              <Link to={`/detalhes/${game.id}`} className={linkStyle}>
                <Eye className="mr-1 h-4 w-4" /> Ver Detalhes
              </Link>
            </li>
          ))}
        </ul>
      )}

      <p className={noteStyle}>
        Clique em "Ver Detalhes" para editar ou excluir um jogo.
      </p>
    </div>
  );
};

export default ListaScreen;
