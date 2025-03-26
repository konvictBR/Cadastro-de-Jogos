import React, { useState, useEffect, useMemo } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import CadastroScreen from './screens/CadastroScreen'
import ListaScreen from './screens/ListaScreen'
import DetalhesScreen from './screens/DetalhesScreen'
import ConfiguracoesScreen from './screens/ConfiguracoesScreen'
import { ThemeContext, Theme } from './contexts/ThemeContext'
import { Navbar } from './components/Navbar' // Assuming Navbar component exists

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null
    return storedTheme || 'light'
  })
  const [googleSheetLink, setGoogleSheetLink] = useState<string>(() => {
    return localStorage.getItem('googleSheetLink') || ''
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  useEffect(() => {
    localStorage.setItem('googleSheetLink', googleSheetLink)
  }, [googleSheetLink])

  const themeContextValue = useMemo(() => ({ theme, setTheme }), [theme])
  const settingsContextValue = useMemo(() => ({ googleSheetLink, setGoogleSheetLink }), [googleSheetLink])


  // Mock game data - replace with actual data fetching later
  const [games, setGames] = useState([
    { id: '1', nome: 'The Legend of Zelda: Breath of the Wild', plataforma: 'Nintendo Switch', qualidade: 'Ótima', encarte: true, box: true, data: '2017-03-03', preco: 59.99, foto1: '', foto2: '', foto3: '' },
    { id: '2', nome: 'Red Dead Redemption 2', plataforma: 'PlayStation 4', qualidade: 'Ótima', encarte: true, box: true, data: '2018-10-26', preco: 49.99, foto1: '', foto2: '', foto3: '' },
  ]);

  // Mock functions for Google Sheets interaction - replace with actual API calls
  const addGame = (game: any) => {
    console.log('Adding game (mock):', game);
    const newGame = { ...game, id: crypto.randomUUID() }; // Generate UUID
    setGames([...games, newGame]);
    // TODO: Add API call to Google Sheets
    alert('Jogo salvo com sucesso (simulado)!');
  };

  const updateGame = (updatedGame: any) => {
    console.log('Updating game (mock):', updatedGame);
    setGames(games.map(game => game.id === updatedGame.id ? updatedGame : game));
    // TODO: Add API call to Google Sheets
     alert('Jogo atualizado com sucesso (simulado)!');
  };

  const deleteGame = (id: string) => {
    console.log('Deleting game (mock):', id);
    setGames(games.filter(game => game.id !== id));
    // TODO: Add API call to Google Sheets
     alert('Jogo excluído com sucesso (simulado)!');
  };


  return (
    <ThemeContext.Provider value={themeContextValue}>
      <Router>
        <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-gray-100'}`}>
           <Navbar />
          <main className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/cadastrar" element={<CadastroScreen addGame={addGame} />} />
              <Route path="/listar" element={<ListaScreen games={games} />} />
              <Route path="/detalhes/:id" element={<DetalhesScreen games={games} updateGame={updateGame} deleteGame={deleteGame} />} />
              <Route
                path="/configuracoes"
                element={
                  <ConfiguracoesScreen
                    googleSheetLink={googleSheetLink}
                    setGoogleSheetLink={setGoogleSheetLink}
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
