import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Pencil, Trash2, Save, XCircle, ArrowLeft, Image as ImageIcon, CalendarDays, Tag, Gamepad, Star, Box, FileText, Tv } from 'lucide-react'; // Added Tv icon
import { ThemeContext } from '../contexts/ThemeContext';

interface Game {
  id: string;
  nome: string;
  plataforma: string;
  qualidade: string;
  encarte: boolean;
  box: boolean;
  data: string;
  preco: number;
  foto1?: string;
  foto2?: string;
  foto3?: string;
}

interface DetalhesScreenProps {
  games: Game[];
  updateGame: (game: Game) => void;
  deleteGame: (id: string) => void;
}

const DetalhesScreen: React.FC<DetalhesScreenProps> = ({ games, updateGame, deleteGame }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [game, setGame] = useState<Game | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedGame, setEditedGame] = useState<Game | null>(null);

  useEffect(() => {
    const foundGame = games.find(g => g.id === id);
    if (foundGame) {
      setGame(foundGame);
      setEditedGame({ ...foundGame }); // Initialize edited state
    } else {
      // Handle game not found - maybe redirect or show message
      navigate('/listar');
    }
  }, [id, games, navigate]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing && game) {
      setEditedGame({ ...game }); // Reset edits if canceling
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (editedGame) {
       if (type === 'checkbox') {
           const { checked } = e.target as HTMLInputElement;
            setEditedGame({ ...editedGame, [name]: checked });
       } else if (type === 'radio') {
            setEditedGame({ ...editedGame, [name]: value });
       }
       else {
           setEditedGame({ ...editedGame, [name]: type === 'number' ? parseFloat(value) || 0 : value });
       }
    }
  };

   const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (editedGame) {
            setEditedGame({ ...editedGame, [name]: value });
        }
    };


  const handleSave = () => {
    if (editedGame) {
       if (!editedGame.nome || !editedGame.plataforma || !editedGame.qualidade || !editedGame.data || editedGame.preco === undefined) {
            alert('Por favor, preencha todos os campos obrigatórios: Nome, Plataforma, Qualidade, Data e Preço.');
            return;
        }
      updateGame(editedGame);
      setGame(editedGame); // Update local view immediately
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (game && window.confirm(`Tem certeza que deseja excluir "${game.nome}"?`)) {
      deleteGame(game.id);
      navigate('/listar');
    }
  };

  if (!game) {
    return <div className={`text-center p-4 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Carregando detalhes do jogo...</div>;
  }

  const displayData = isEditing ? editedGame : game;

  const inputStyle = `w-full p-2 border rounded mb-4 ${theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'} disabled:opacity-70 disabled:cursor-not-allowed`;
  const labelStyle = `block mb-1 font-semibold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`;
   const radioLabelStyle = `mr-4 flex items-center ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`;
   const checkboxLabelStyle = `flex items-center ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`;
  const buttonStyle = `px-4 py-2 rounded font-semibold flex items-center justify-center transition-colors`;
  const detailItemStyle = `mb-4`;
  const detailLabelStyle = `font-semibold ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`;
  const detailValueStyle = `${theme === 'light' ? 'text-gray-800' : 'text-white'}`;
  const imageContainerStyle = `flex flex-wrap gap-4 mt-2`;
  const imageStyle = `w-32 h-32 object-cover rounded border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'}`;

  return (
    <div className={`p-6 rounded-lg shadow-lg max-w-3xl mx-auto ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
      <button onClick={() => navigate('/listar')} className={`mb-4 flex items-center ${buttonStyle} ${theme === 'light' ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' : 'bg-gray-600 hover:bg-gray-500 text-white'}`}>
        <ArrowLeft className="mr-1 h-5 w-5" /> Voltar para Lista
      </button>

      <h2 className={`text-3xl font-bold mb-6 text-center ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
        {isEditing ? 'Editando Jogo' : 'Detalhes do Jogo'}
      </h2>

      {isEditing ? (
        /* --- Edit Form --- */
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
           {/* Nome */}
           <div className="mb-4">
             <label htmlFor="nome" className={labelStyle}><Gamepad className="inline mr-1 h-4 w-4" /> Nome do Jogo*</label>
             <input type="text" id="nome" name="nome" value={displayData?.nome || ''} onChange={handleInputChange} className={inputStyle} required />
           </div>

           {/* Plataforma (Changed to text input) */}
           <div className="mb-4">
             <label htmlFor="plataforma" className={labelStyle}><Tv className="inline mr-1 h-4 w-4" /> Plataforma*</label>
             <input type="text" id="plataforma" name="plataforma" value={displayData?.plataforma || ''} onChange={handleInputChange} className={inputStyle} placeholder="Ex: PlayStation 5, PC" required />
           </div>

            {/* Qualidade */}
            <div className="mb-4">
              <label className={labelStyle}>Qualidade*</label>
              <div className="flex items-center space-x-4">
                 <label className={radioLabelStyle}>
                    <input type="radio" name="qualidade" value="Ótima" checked={displayData?.qualidade === 'Ótima'} onChange={handleRadioChange} className="mr-1" required/> Ótima
                 </label>
                 <label className={radioLabelStyle}>
                    <input type="radio" name="qualidade" value="Boa" checked={displayData?.qualidade === 'Boa'} onChange={handleRadioChange} className="mr-1" /> Boa
                 </label>
                 <label className={radioLabelStyle}>
                    <input type="radio" name="qualidade" value="Ruim" checked={displayData?.qualidade === 'Ruim'} onChange={handleRadioChange} className="mr-1" /> Ruim
                 </label>
              </div>
            </div>

            {/* Encarte e Box */}
            <div className="grid grid-cols-2 gap-4 mb-4">
               <div>
                 <label className={labelStyle}>Encarte</label>
                 <label className={checkboxLabelStyle}>
                   <input type="checkbox" name="encarte" checked={displayData?.encarte || false} onChange={handleInputChange} className="mr-2 h-5 w-5 rounded" />
                   Possui Encarte
                 </label>
               </div>
               <div>
                 <label className={labelStyle}>Box</label>
                 <label className={checkboxLabelStyle}>
                   <input type="checkbox" name="box" checked={displayData?.box || false} onChange={handleInputChange} className="mr-2 h-5 w-5 rounded" />
                   Possui Box
                 </label>
               </div>
            </div>


           {/* Data */}
           <div className="mb-4">
             <label htmlFor="data" className={labelStyle}><CalendarDays className="inline mr-1 h-4 w-4" /> Data da Compra*</label>
             <input type="date" id="data" name="data" value={displayData?.data || ''} onChange={handleInputChange} className={inputStyle} required />
           </div>

           {/* Preço */}
           <div className="mb-4">
             <label htmlFor="preco" className={labelStyle}><Tag className="inline mr-1 h-4 w-4" /> Preço (R$)*</label>
             <input type="number" id="preco" name="preco" value={displayData?.preco || 0} onChange={handleInputChange} className={inputStyle} step="0.01" min="0" required />
           </div>

           {/* Fotos */}
           <div className="mb-4">
             <label className={labelStyle}><ImageIcon className="inline mr-1 h-4 w-4" /> Links das Fotos</label>
             <input type="url" name="foto1" placeholder="URL Foto 1" value={displayData?.foto1 || ''} onChange={handleInputChange} className={inputStyle} />
             <input type="url" name="foto2" placeholder="URL Foto 2" value={displayData?.foto2 || ''} onChange={handleInputChange} className={inputStyle} />
             <input type="url" name="foto3" placeholder="URL Foto 3" value={displayData?.foto3 || ''} onChange={handleInputChange} className={inputStyle} />
           </div>

           {/* Edit Buttons */}
           <div className="flex justify-end space-x-4 mt-6">
             <button type="button" onClick={handleEditToggle} className={`${buttonStyle} ${theme === 'light' ? 'bg-gray-300 hover:bg-gray-400 text-gray-800' : 'bg-gray-600 hover:bg-gray-500 text-white'}`}>
               <XCircle className="mr-1 h-5 w-5" /> Cancelar
             </button>
             <button type="submit" className={`${buttonStyle} ${theme === 'light' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}>
               <Save className="mr-1 h-5 w-5" /> Salvar Alterações
             </button>
           </div>
            <p className={`mt-4 text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>* Campos obrigatórios</p>
        </form>
      ) : (
        /* --- View Details --- */
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
            <div className={detailItemStyle}>
              <span className={detailLabelStyle}><Gamepad className="inline mr-1 h-4 w-4" /> Nome:</span> <span className={detailValueStyle}>{displayData?.nome}</span>
            </div>
            <div className={detailItemStyle}>
              <span className={detailLabelStyle}><Tv className="inline mr-1 h-4 w-4" /> Plataforma:</span> <span className={detailValueStyle}>{displayData?.plataforma}</span>
            </div>
            <div className={detailItemStyle}>
              <span className={detailLabelStyle}><Star className="inline mr-1 h-4 w-4" /> Qualidade:</span> <span className={detailValueStyle}>{displayData?.qualidade}</span>
            </div>
             <div className={detailItemStyle}>
              <span className={detailLabelStyle}><FileText className="inline mr-1 h-4 w-4" /> Encarte:</span> <span className={detailValueStyle}>{displayData?.encarte ? 'Sim' : 'Não'}</span>
            </div>
            <div className={detailItemStyle}>
              <span className={detailLabelStyle}><Box className="inline mr-1 h-4 w-4" /> Box:</span> <span className={detailValueStyle}>{displayData?.box ? 'Sim' : 'Não'}</span>
            </div>
            <div className={detailItemStyle}>
              <span className={detailLabelStyle}><CalendarDays className="inline mr-1 h-4 w-4" /> Data da Compra:</span> <span className={detailValueStyle}>{displayData?.data}</span>
            </div>
            <div className={detailItemStyle}>
              <span className={detailLabelStyle}><Tag className="inline mr-1 h-4 w-4" /> Preço Pago:</span> <span className={detailValueStyle}>R$ {displayData?.preco.toFixed(2)}</span>
            </div>
             <div className={detailItemStyle}>
              <span className={detailLabelStyle}>ID:</span> <span className={`${detailValueStyle} text-xs`}>{displayData?.id}</span>
            </div>
          </div>

           {/* Fotos Display */}
           {(displayData?.foto1 || displayData?.foto2 || displayData?.foto3) && (
             <div className="mb-6">
                <h3 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}><ImageIcon className="inline mr-1 h-5 w-5" /> Fotos</h3>
                <div className={imageContainerStyle}>
                    {displayData?.foto1 && <img src={displayData.foto1} alt="Foto 1 do jogo" className={imageStyle} onError={(e) => (e.currentTarget.style.display = 'none')} />}
                    {displayData?.foto2 && <img src={displayData.foto2} alt="Foto 2 do jogo" className={imageStyle} onError={(e) => (e.currentTarget.style.display = 'none')} />}
                    {displayData?.foto3 && <img src={displayData.foto3} alt="Foto 3 do jogo" className={imageStyle} onError={(e) => (e.currentTarget.style.display = 'none')} />}
                </div>
             </div>
           )}


          {/* View Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button onClick={handleEditToggle} className={`${buttonStyle} ${theme === 'light' ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-yellow-600 hover:bg-yellow-700 text-white'}`}>
              <Pencil className="mr-1 h-5 w-5" /> Editar
            </button>
            <button onClick={handleDelete} className={`${buttonStyle} ${theme === 'light' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}>
              <Trash2 className="mr-1 h-5 w-5" /> Excluir
            </button>
          </div>
        </div>
      )}
        <p className={`mt-6 text-sm text-center ${theme === 'light' ? 'text-red-600' : 'text-red-400'}`}>
         Nota: A integração com Google Planilhas (salvar/excluir) é simulada.
       </p>
    </div>
  );
};

export default DetalhesScreen;
