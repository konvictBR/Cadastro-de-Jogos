import React, { useState, useEffect, useMemo, useCallback } from 'react' // Added useCallback
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import CadastroScreen from './screens/CadastroScreen'
import ListaScreen from './screens/ListaScreen'
import DetalhesScreen from './screens/DetalhesScreen'
import ConfiguracoesScreen from './screens/ConfiguracoesScreen'
import { ThemeContext, Theme } from './contexts/ThemeContext'
import { Navbar } from './components/Navbar'
import { Game } from './types'; // Importar o tipo

const LOCAL_STORAGE_KEY = "listgames";
const GOOGLE_SHEET_LINK_KEY = "googleSheetLink";
const THEME_KEY = "theme";

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null
    return storedTheme || 'light'
  })
  const [googleSheetLink, setGoogleSheetLink] = useState<string>(() => {
    return localStorage.getItem(GOOGLE_SHEET_LINK_KEY) || ''
  })

  const [games, setGames] = useState<Game[]>(() => {
    try {
      const storedGames = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedGames) {
        const parsedGames = JSON.parse(storedGames);
        if (Array.isArray(parsedGames)) {
          // TODO: Add more robust validation for each game object if needed
          return parsedGames;
        }
      }
    } catch (error) {
      console.error("Error parsing games from localStorage:", error);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(games));
      console.log("Games saved to localStorage");
    } catch (error) {
      console.error("Error saving games to localStorage:", error);
      alert("Erro ao salvar os jogos. O armazenamento local pode estar cheio.");
    }
  }, [games]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  useEffect(() => {
    localStorage.setItem(GOOGLE_SHEET_LINK_KEY, googleSheetLink)
  }, [googleSheetLink])

  const themeContextValue = useMemo(() => ({ theme, setTheme }), [theme])

  const addGame = (game: Omit<Game, 'id' | 'registrationDate'>) => {
    console.log('Adding game:', game);
    const newGame = { ...game, id: crypto.randomUUID(), registrationDate: new Date().toISOString() };
    setGames(prevGames => [...prevGames, newGame]);
  };

  const updateGame = (updatedGame: Game) => {
    console.log('Updating game:', updatedGame);
    setGames(prevGames => prevGames.map(game => game.id === updatedGame.id ? updatedGame : game));
  };

  const deleteGame = (id: string) => {
    console.log('Deleting game:', id);
    setGames(prevGames => prevGames.filter(game => game.id !== id));
  };

  // Function to replace all games, used for import
  const replaceGames = (newGames: Game[]) => {
     console.log('Replacing all games with imported data');
     // Basic validation
     if (Array.isArray(newGames)) {
       // TODO: Add more robust validation for each game object if needed
       setGames(newGames);
       alert(`Importação concluída! ${newGames.length} jogos carregados.`);
     } else {
       console.error("Import failed: Data is not an array.");
       alert("Erro na importação: O arquivo não contém um array de jogos válido.");
     }
  }

  // --- Centralized Export Logic ---
  const handleExportGames = useCallback(() => {
    if (games.length === 0) {
      alert("Não há jogos para exportar.");
      return;
    }
    try {
      const jsonString = JSON.stringify(games, null, 2); // Pretty print JSON
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'listgames.json'; // Nome do arquivo sugerido
      document.body.appendChild(a);
      a.click(); // Trigger download - Browser will show "Save As" dialog
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      console.log("Data export initiated successfully.");
    } catch (error) {
      console.error("Error exporting data:", error);
      alert("Erro ao exportar os dados.");
    }
  }, [games]); // Dependency on games array

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <Router>
        <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-gray-100'}`}>
           <Navbar />
          <main className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/cadastrar" element={<CadastroScreen addGame={addGame} />} />
              <Route
                path="/listar"
                element={<ListaScreen games={games} handleExportGames={handleExportGames} />} // Pass export function
              />
              <Route path="/detalhes/:id" element={<DetalhesScreen games={games} updateGame={updateGame} deleteGame={deleteGame} />} />
              <Route
                path="/configuracoes"
                element={
                  <ConfiguracoesScreen
                    googleSheetLink={googleSheetLink}
                    setGoogleSheetLink={setGoogleSheetLink}
                    replaceAllGames={replaceGames}
                    handleExportGames={handleExportGames} // Pass export function
                    // currentGames prop is no longer needed here as export logic is centralized
                  />
                }
               />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeContext.Provider>
  )
}

export default App
