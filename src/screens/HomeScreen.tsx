import React, { useContext } from 'react'; // Removed useEffect
import { Link } from 'react-router-dom';
import { PlusSquare, List, Settings, Gamepad2 } from 'lucide-react';
import { ThemeContext } from '../contexts/ThemeContext';
import RssFeedDisplay from '../components/RssFeedDisplay'; // Import the new component

const HomeScreen: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  // Removed the useEffect hook that loaded the external rss.app script

  const buttonStyle = `
    flex flex-col items-center justify-center
    p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105
    w-48 h-48 text-lg font-semibold
    ${theme === 'light' ? 'bg-white text-gray-700 hover:bg-gray-50' : 'bg-gray-700 text-white hover:bg-gray-600'}
  `;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] p-4"> {/* Added padding */}
       <Gamepad2 size={64} className={`mb-8 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />
      <h1 className={`text-4xl font-bold mb-12 text-center ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}> {/* Added text-center */}
        Gerenciador de Jogos
      </h1>
      <div className="flex flex-wrap justify-center gap-8 mb-12"> {/* Added mb-12 */}
        <Link to="/cadastrar" className={buttonStyle}>
          <PlusSquare size={48} className="mb-4 text-green-500" />
          Cadastrar Jogo
        </Link>
        <Link to="/listar" className={buttonStyle}>
          <List size={48} className="mb-4 text-blue-500" />
          Listar Jogos
        </Link>
        <Link to="/configuracoes" className={buttonStyle}>
          <Settings size={48} className="mb-4 text-gray-500" />
          Configurações
        </Link>
      </div>

      {/* Replace the old RSS widget container with the new component */}
      <RssFeedDisplay />

    </div>
  );
};

export default HomeScreen;
