import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusSquare, List, Settings, Gamepad2 } from 'lucide-react';
import { ThemeContext } from '../contexts/ThemeContext';

const HomeScreen: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  // Load the RSS widget script when the component mounts
  useEffect(() => {
    const scriptId = 'rss-app-widget-script';
    // Check if the script already exists
    if (document.getElementById(scriptId)) {
      return; // Script already loaded
    }

    const script = document.createElement('script');
    script.id = scriptId; // Add an ID to prevent duplicates
    script.src = "https://widget.rss.app/v1/wall.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup script when component unmounts
    return () => {
      const existingScript = document.getElementById(scriptId);
      // Check if the script exists and has a parent node
      if (existingScript && existingScript.parentNode) {
        // Only remove if this component instance added it,
        // though in a typical SPA this might run only once.
        // Be cautious if HomeScreen can remount frequently.
        // We'll keep the removal commented out for now as it might cause issues
        // if the widget script manages its own lifecycle or if other components need it.
        // document.body.removeChild(existingScript);
      }
      // It's generally safer NOT to remove the widget's own elements manually,
      // as the script itself might manage them or expect them to persist.
    };
  }, []); // Empty dependency array ensures this runs only once on mount

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

      {/* RSS Feed Widget */}
      <div id="rss-widget-container" className="w-full max-w-4xl mt-8"> {/* Added container with width */}
         <h3 className={`text-2xl font-semibold mb-4 text-center ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}> {/* Centered title */}
           Últimas Notícias de Jogos
         </h3>
         {/* The script added via useEffect will target this element */}
         {/* Use the custom element declared in vite-env.d.ts */}
         <rssapp-wall id="twB8HixSbrNszTWK"></rssapp-wall>
       </div>

    </div>
  );
};

export default HomeScreen;
