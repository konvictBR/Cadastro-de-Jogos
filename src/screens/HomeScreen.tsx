import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PlusSquare, List, Settings, Gamepad2 } from 'lucide-react';
import { ThemeContext } from '../contexts/ThemeContext';

const HomeScreen: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  const buttonStyle = `
    flex flex-col items-center justify-center
    p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105
    w-48 h-48 text-lg font-semibold
    ${theme === 'light' ? 'bg-white text-gray-700 hover:bg-gray-50' : 'bg-gray-700 text-white hover:bg-gray-600'}
  `;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
       <Gamepad2 size={64} className={`mb-8 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />
      <h1 className={`text-4xl font-bold mb-12 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
        Gerenciador de Jogos
      </h1>
      <div className="flex flex-wrap justify-center gap-8">
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
    </div>
  );
};

export default HomeScreen;
