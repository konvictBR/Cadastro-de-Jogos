import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Home, PlusSquare, List, Settings, Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../contexts/ThemeContext';

export const Navbar: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <nav className={`p-4 shadow-md ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center">
          <List className="mr-2 h-6 w-6" /> {/* Using List as a placeholder logo */}
          Game Manager
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="hover:text-blue-500 flex items-center">
            <Home className="mr-1 h-5 w-5" /> Inicio
          </Link>
          <Link to="/cadastrar" className="hover:text-blue-500 flex items-center">
            <PlusSquare className="mr-1 h-5 w-5" /> Cadastrar
          </Link>
          <Link to="/listar" className="hover:text-blue-500 flex items-center">
            <List className="mr-1 h-5 w-5" /> Listar
          </Link>
          <Link to="/configuracoes" className="hover:text-blue-500 flex items-center">
            <Settings className="mr-1 h-5 w-5" /> Configurações
          </Link>
          <button onClick={toggleTheme} className="focus:outline-none hover:text-blue-500">
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
};
