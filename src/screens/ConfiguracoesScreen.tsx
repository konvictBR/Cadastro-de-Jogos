import React, { useContext, useState } from 'react';
import { Save, Link as LinkIcon, Sun, Moon, Trash2, RefreshCw } from 'lucide-react';
import { ThemeContext } from '../contexts/ThemeContext';

interface ConfiguracoesScreenProps {
  googleSheetLink: string;
  setGoogleSheetLink: (link: string) => void;
}

const ConfiguracoesScreen: React.FC<ConfiguracoesScreenProps> = ({ googleSheetLink, setGoogleSheetLink }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [tempLink, setTempLink] = useState(googleSheetLink);
  const [saveStatus, setSaveStatus] = useState(''); // To show feedback

  const handleLinkSave = () => {
    // Basic validation (optional)
    if (tempLink && !tempLink.startsWith('https://docs.google.com/spreadsheets/')) {
        setSaveStatus('Erro: Link inválido. Deve ser um link do Google Planilhas.');
        setTimeout(() => setSaveStatus(''), 3000);
        return;
    }
    setGoogleSheetLink(tempLink); // Update context/localStorage
    setSaveStatus('Link salvo com sucesso!');
    setTimeout(() => setSaveStatus(''), 3000);
     console.log("Saving Google Sheet Link (mock):", tempLink);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Mock functions for other settings
  const handleClearCache = () => {
    console.log("Clearing cache (mock)...");
    alert("Cache limpo (simulado).");
  };

  const handleManualSync = () => {
    console.log("Manual sync with Google Sheets (mock)...");
    alert("Sincronização manual iniciada (simulada).");
  };


  const inputStyle = `w-full p-2 border rounded mb-2 ${theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'}`;
  const labelStyle = `block mb-2 font-semibold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`;
  const buttonStyle = `px-4 py-2 rounded font-semibold flex items-center justify-center transition-colors`;
  const sectionStyle = `mb-8 p-6 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'} shadow`;
  const titleStyle = `text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`;

  return (
    <div className={`p-6 rounded-lg shadow-lg max-w-2xl mx-auto ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
      <h2 className={`text-2xl font-bold mb-6 text-center ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Configurações</h2>

      {/* Google Sheets Integration */}
      <div className={sectionStyle}>
        <h3 className={titleStyle}><LinkIcon className="inline mr-2 h-5 w-5" /> Integração com Google Planilhas</h3>
        <label htmlFor="googleSheetLink" className={labelStyle}>Link da Planilha:</label>
        <input
          type="url"
          id="googleSheetLink"
          value={tempLink}
          onChange={(e) => setTempLink(e.target.value)}
          placeholder="https://docs.google.com/spreadsheets/d/..."
          className={inputStyle}
        />
        <button
          onClick={handleLinkSave}
          className={`${buttonStyle} w-full ${theme === 'light' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
        >
          <Save className="mr-1 h-5 w-5" /> Salvar Link
        </button>
         {saveStatus && <p className={`mt-2 text-sm ${saveStatus.includes('Erro') ? 'text-red-500' : 'text-green-500'}`}>{saveStatus}</p>}
         <p className={`mt-2 text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            Este link será usado para salvar e carregar os dados dos jogos. Certifique-se que a planilha está configurada corretamente.
         </p>
         <p className={`mt-1 text-sm ${theme === 'light' ? 'text-red-600' : 'text-red-400'}`}>
            Nota: A funcionalidade real de integração ainda não está implementada.
         </p>
      </div>

      {/* Theme Settings */}
      <div className={sectionStyle}>
        <h3 className={titleStyle}>Tema</h3>
        <div className="flex items-center justify-between">
          <span className={labelStyle}>Modo Atual: {theme === 'light' ? 'Claro' : 'Escuro'}</span>
          <button
            onClick={toggleTheme}
            className={`${buttonStyle} ${theme === 'light' ? 'bg-gray-700 hover:bg-gray-800 text-white' : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'}`}
          >
            {theme === 'light' ? <Moon className="mr-1 h-5 w-5" /> : <Sun className="mr-1 h-5 w-5" />}
            Mudar para Modo {theme === 'light' ? 'Escuro' : 'Claro'}
          </button>
        </div>
      </div>

      {/* Other Settings */}
      <div className={sectionStyle}>
        <h3 className={titleStyle}>Outras Configurações</h3>
        <div className="space-y-4">
           <button
             onClick={handleClearCache}
             className={`${buttonStyle} w-full ${theme === 'light' ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-red-700 hover:bg-red-800 text-white'}`}
           >
             <Trash2 className="mr-1 h-5 w-5" /> Limpar Cache (Simulado)
           </button>
           <button
             onClick={handleManualSync}
             className={`${buttonStyle} w-full ${theme === 'light' ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
           >
             <RefreshCw className="mr-1 h-5 w-5" /> Sincronizar Manualmente (Simulado)
           </button>
        </div>
         <p className={`mt-4 text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            Funcionalidades futuras serão adicionadas aqui.
         </p>
      </div>
    </div>
  );
};

export default ConfiguracoesScreen;
