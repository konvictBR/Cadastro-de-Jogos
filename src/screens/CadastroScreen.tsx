import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, XCircle, Image as ImageIcon, CalendarDays, Tag, Gamepad, Tv } from 'lucide-react'; // Added Tv icon
import { ThemeContext } from '../contexts/ThemeContext';

interface CadastroScreenProps {
  addGame: (game: any) => void; // Define more specific type later
}

const CadastroScreen: React.FC<CadastroScreenProps> = ({ addGame }) => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [nome, setNome] = useState('');
  const [plataforma, setPlataforma] = useState(''); // Now a text input
  const [qualidade, setQualidade] = useState('');
  const [encarte, setEncarte] = useState(false);
  const [box, setBox] = useState(false);
  const [data, setData] = useState('');
  const [preco, setPreco] = useState('');
  const [foto1, setFoto1] = useState('');
  const [foto2, setFoto2] = useState('');
  const [foto3, setFoto3] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !plataforma || !qualidade || !data || !preco) {
        alert('Por favor, preencha todos os campos obrigatórios: Nome, Plataforma, Qualidade, Data e Preço.');
        return;
    }
    const newGame = {
      // ID será gerado na função addGame
      nome,
      plataforma,
      qualidade,
      encarte,
      box,
      data,
      preco: parseFloat(preco) || 0, // Ensure price is a number
      foto1,
      foto2,
      foto3,
    };
    addGame(newGame);
    navigate('/listar'); // Redirect to list after saving
  };

  const inputStyle = `w-full p-2 border rounded mb-4 ${theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'}`;
  const labelStyle = `block mb-1 font-semibold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`;
  const radioLabelStyle = `mr-4 flex items-center ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`;
  const checkboxLabelStyle = `flex items-center ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`;
  const buttonStyle = `px-4 py-2 rounded font-semibold flex items-center justify-center transition-colors`;

  return (
    <div className={`p-6 rounded-lg shadow-lg max-w-2xl mx-auto ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
      <h2 className={`text-2xl font-bold mb-6 text-center ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Cadastrar Novo Jogo</h2>
      <form onSubmit={handleSubmit}>
        {/* Nome do Jogo */}
        <div className="mb-4">
          <label htmlFor="nome" className={labelStyle}> <Gamepad className="inline mr-1 h-4 w-4" /> Nome do Jogo*</label>
          <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} className={inputStyle} required />
        </div>

        {/* Plataforma (Changed to text input) */}
        <div className="mb-4">
          <label htmlFor="plataforma" className={labelStyle}><Tv className="inline mr-1 h-4 w-4" /> Plataforma*</label>
          <input type="text" id="plataforma" value={plataforma} onChange={(e) => setPlataforma(e.target.value)} className={inputStyle} placeholder="Ex: PlayStation 5, PC, Nintendo Switch" required />
        </div>

        {/* Qualidade */}
        <div className="mb-4">
          <label className={labelStyle}>Qualidade*</label>
          <div className="flex items-center space-x-4">
             <label className={radioLabelStyle}>
                <input type="radio" name="qualidade" value="Ótima" checked={qualidade === 'Ótima'} onChange={(e) => setQualidade(e.target.value)} className="mr-1" required/> Ótima
             </label>
             <label className={radioLabelStyle}>
                <input type="radio" name="qualidade" value="Boa" checked={qualidade === 'Boa'} onChange={(e) => setQualidade(e.target.value)} className="mr-1" /> Boa
             </label>
             <label className={radioLabelStyle}>
                <input type="radio" name="qualidade" value="Ruim" checked={qualidade === 'Ruim'} onChange={(e) => setQualidade(e.target.value)} className="mr-1" /> Ruim
             </label>
          </div>
        </div>

        {/* Encarte e Box */}
        <div className="grid grid-cols-2 gap-4 mb-4">
           <div>
             <label className={labelStyle}>Encarte</label>
             <label className={checkboxLabelStyle}>
               <input type="checkbox" checked={encarte} onChange={(e) => setEncarte(e.target.checked)} className="mr-2 h-5 w-5 rounded" />
               Possui Encarte
             </label>
           </div>
           <div>
             <label className={labelStyle}>Box</label>
             <label className={checkboxLabelStyle}>
               <input type="checkbox" checked={box} onChange={(e) => setBox(e.target.checked)} className="mr-2 h-5 w-5 rounded" />
               Possui Box
             </label>
           </div>
        </div>


        {/* Data */}
        <div className="mb-4">
          <label htmlFor="data" className={labelStyle}><CalendarDays className="inline mr-1 h-4 w-4" /> Data da Compra*</label>
          <input type="date" id="data" value={data} onChange={(e) => setData(e.target.value)} className={inputStyle} required />
        </div>

        {/* Preço */}
        <div className="mb-4">
          <label htmlFor="preco" className={labelStyle}><Tag className="inline mr-1 h-4 w-4" /> Preço (R$)*</label>
          <input type="number" id="preco" value={preco} onChange={(e) => setPreco(e.target.value)} className={inputStyle} step="0.01" min="0" required />
        </div>

        {/* Links das Fotos */}
        <div className="mb-4">
          <label className={labelStyle}><ImageIcon className="inline mr-1 h-4 w-4" /> Links das Fotos (Opcional)</label>
          <input type="url" placeholder="URL Foto 1" value={foto1} onChange={(e) => setFoto1(e.target.value)} className={inputStyle} />
          <input type="url" placeholder="URL Foto 2" value={foto2} onChange={(e) => setFoto2(e.target.value)} className={inputStyle} />
          <input type="url" placeholder="URL Foto 3" value={foto3} onChange={(e) => setFoto3(e.target.value)} className={inputStyle} />
        </div>

        {/* Botões */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={() => navigate('/')}
            className={`${buttonStyle} ${theme === 'light' ? 'bg-gray-300 hover:bg-gray-400 text-gray-800' : 'bg-gray-600 hover:bg-gray-500 text-white'}`}
          >
            <XCircle className="mr-1 h-5 w-5" /> Cancelar
          </button>
          <button
            type="submit"
            className={`${buttonStyle} ${theme === 'light' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
          >
            <Save className="mr-1 h-5 w-5" /> Salvar
          </button>
        </div>
      </form>
       <p className={`mt-4 text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>* Campos obrigatórios</p>
       <p className={`mt-2 text-sm ${theme === 'light' ? 'text-red-600' : 'text-red-400'}`}>
         Nota: A integração com Google Planilhas é simulada. Os dados são salvos apenas localmente no estado do aplicativo por enquanto.
       </p>
    </div>
  );
};

export default CadastroScreen;
