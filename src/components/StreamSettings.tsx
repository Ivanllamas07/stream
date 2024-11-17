import React, { useState } from 'react';
import { Key, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import StreamPreview from './StreamPreview';

interface StreamSettingsProps {
  streamKey: string;
  setStreamKey: (key: string) => void;
}

const StreamSettings: React.FC<StreamSettingsProps> = ({ streamKey, setStreamKey }) => {
  const [isStreaming, setIsStreaming] = useState(false);

  const handleSaveSettings = () => {
    if (!streamKey) {
      toast.error('Por favor, ingresa tu clave de stream');
      return;
    }
    toast.success('¡Configuración guardada con éxito!');
  };

  const startStream = async () => {
    if (!streamKey) {
      toast.error('Por favor, ingresa tu clave de stream antes de comenzar');
      return;
    }
    
    try {
      // Aquí iría la lógica de conexión con YouTube
      setIsStreaming(true);
      toast.success('¡Transmisión iniciada!');
    } catch (error) {
      toast.error('Error al iniciar la transmisión');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <StreamPreview />
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Configuración del Stream</h2>
        <div className="bg-black/20 rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Clave de Stream</label>
              <div className="relative">
                <input
                  type="password"
                  value={streamKey}
                  onChange={(e) => setStreamKey(e.target.value)}
                  className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ingresa tu clave de stream de YouTube"
                />
                <Key className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div className="text-sm text-yellow-200">
                <strong>Importante:</strong> Nunca compartas tu clave de stream. Esta clave es única para tu canal y debe mantenerse segura.
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Calidad del Stream</label>
                <select className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="1080p">1080p (Recomendado)</option>
                  <option value="720p">720p</option>
                  <option value="480p">480p</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tasa de Bits</label>
                <select className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="6000">6000 kbps (Recomendado para 1080p)</option>
                  <option value="4500">4500 kbps</option>
                  <option value="3000">3000 kbps</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Cuadros por Segundo</label>
                <select className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="60">60 fps</option>
                  <option value="30">30 fps</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSaveSettings}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Guardar Configuración
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamSettings;