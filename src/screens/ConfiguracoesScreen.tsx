import React, { useContext, useState, useRef } from 'react';
import { Save, Link as LinkIcon, Sun, Moon, Trash2, RefreshCw, Upload, Download } from 'lucide-react';
import { ThemeContext } from '../contexts/ThemeContext';
import { Game } from '../types'; // Importar o tipo

interface ConfiguracoesScreenProps {
  googleSheetLink: string;
  setGoogleSheetLink: (link: string) => void;
  replaceAllGames: (games: Game[]) => void; // Receber função para substituir jogos
  handleExportGames: () => void; // Receive centralized export function
}

const ConfiguracoesScreen: React.FC<ConfiguracoesScreenProps> = ({
  googleSheetLink,
  setGoogleSheetLink,
  replaceAllGames,
  handleExportGames // Use the passed function
}) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [tempLink, setTempLink] = useState(googleSheetLink);
  const [saveStatus, setSaveStatus] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref para o input de arquivo

  const handleLinkSave = () => {
    if (tempLink && !tempLink.startsWith('https://docs.google.com/spreadsheets/')) {
        setSaveStatus('Erro: Link inválido. Deve ser um link do Google Planilhas.');
        setTimeout(() => setSaveStatus(''), 3000);
        return;
    }
    setGoogleSheetLink(tempLink);
    setSaveStatus('Link salvo com sucesso! (Funcionalidade futura)');
    setTimeout(() => setSaveStatus(''), 3000);
     console.log("Saving Google Sheet Link (mock):", tempLink);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // --- Import Logic ---
  const handleImportClick = () => {
    // Trigger click on the hidden file input
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text === 'string') {
          const importedData = JSON.parse(text);
          // Passar os dados importados para a função em App.tsx
          replaceAllGames(importedData);
        } else {
          throw new Error("Failed to read file content.");
        }
      } catch (error) {
        console.error("Error importing data:", error);
        alert(`Erro ao importar o arquivo: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      } finally {
        // Reset file input value to allow importing the same file again if needed
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };
    reader.onerror = () => {
      console.error("Error reading file:", reader.error);
      alert("Erro ao ler o arquivo.");
       if (fileInputRef.current) {
          fileInputRef.current.value = '';
       }
    };
    reader.readAsText(file);
  };

  // Mock functions
  const handleClearCache = () => {
    console.log("Clearing cache (mock)...");
    alert("Cache limpo (simulado).");
  };

  const handleManualSync = () => {
    console.log("Manual sync with Google Sheets (mock)...");
    alert("Sincronização manual iniciada (simulada).");
  };

  // Styles
  const inputStyle = `w-full p-2 border rounded mb-2 ${theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'}`;
  const labelStyle = `block mb-2 font-semibold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`;
  const buttonStyle = `px-4 py-2 rounded font-semibold flex items-center justify-center transition-colors`;
  const sectionStyle = `mb-8 p-6 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'} shadow`;
  const titleStyle = `text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`;

  return (
    <div className={`p-6 rounded-lg shadow-lg max-w-2xl mx-auto ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
      <h2 className={`text-2xl font-bold mb-6 text-center ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Configurações</h2>

      {/* Storage Settings */}
      <div className={sectionStyle}>
        <h3 className={titleStyle}>Armazenamento de Dados</h3>
        <p className={`mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
          Atualmente, os dados dos jogos estão sendo salvos no <strong>Armazenamento Local</strong> do seu navegador (`localStorage`). Use os botões abaixo para criar ou restaurar um backup.
        </p>
        <div className="space-y-3">
           <button
             onClick={handleExportGames} // Use the centralized function
             className={`${buttonStyle} w-full ${theme === 'light' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
           >
             <Download className="mr-1 h-5 w-5" /> Exportar Dados (listgames.json)
           </button>
           <button
             onClick={handleImportClick}
             className={`${buttonStyle} w-full ${theme === 'light' ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
           >
             <Upload className="mr-1 h-5 w-5" /> Importar Dados (de listgames.json)
           </button>
           {/* Hidden file input */}
           <input
             type="file"
             ref={fileInputRef}
             onChange={handleFileChange}
             accept=".json" // Aceitar apenas arquivos .json
             style={{ display: 'none' }} // Esconder o input
           />
        </div>
         <p className={`mt-4 text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            A importação substituirá todos os dados existentes no Armazenamento Local. A exportação iniciará o download de um arquivo `listgames.json`.
         </p>
      </div>


      {/* Google Sheets Integration (Kept for future) */}
      <div className={sectionStyle}>
        <h3 className={titleStyle}><LinkIcon className="inline mr-2 h-5 w-5" /> Integração com Google Planilhas (Futuro)</h3>
        <label htmlFor="googleSheetLink" className={labelStyle}>Link da Planilha:</label>
        <input
          type="url"
          id="googleSheetLink"
          value={tempLink}
          onChange={(e) => setTempLink(e.target.value)}
          placeholder="https://docs.google.com/spreadsheets/d/..."
          className={inputStyle}
          // disabled // Pode desabilitar se não for usar agora
        />
        <button
          onClick={handleLinkSave}
          className={`${buttonStyle} w-full ${theme === 'light' ? 'bg-gray-400 hover:bg-gray-500 text-white' : 'bg-gray-600 hover:bg-gray-700 text-white'} cursor-not-allowed`} // Estilo desabilitado
          disabled // Desabilitar botão por enquanto
        >
          <Save className="mr-1 h-5 w-5" /> Salvar Link (Indisponível)
        </button>
         {saveStatus && <p className={`mt-2 text-sm ${saveStatus.includes('Erro') ? 'text-red-500' : 'text-green-500'}`}>{saveStatus}</p>}
         <p className={`mt-2 text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            Esta funcionalidade permitirá salvar e carregar dados de uma Planilha Google no futuro.
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

      {/* Other Settings (Mocks) */}
      <div className={sectionStyle}>
        <h3 className={titleStyle}>Outras Configurações (Simulado)</h3>
        <div className="space-y-4">
           <button
             onClick={handleClearCache}
             className={`${buttonStyle} w-full ${theme === 'light' ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-red-700 hover:bg-red-800 text-white'}`}
           >
             <Trash2 className="mr-1 h-5 w-5" /> Limpar Cache (Simulado)
           </button>
           <button
             onClick={handleManualSync}
             className={`${buttonStyle} w-full ${theme === 'light' ? 'bg-purple-500 hover:bg-purple-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'}`} // Changed color for variety
           >
             <RefreshCw className="mr-1 h-5 w-5" /> Sincronizar Manualmente (Simulado)
           </button>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracoesScreen;
