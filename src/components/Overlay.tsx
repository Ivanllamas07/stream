import React from 'react';
import { Plus } from 'lucide-react';

const Overlay: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Overlays del Stream</h2>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-black/20 rounded-lg p-6 border-2 border-dashed border-gray-600 hover:border-green-500 transition-colors cursor-pointer group">
          <div className="flex flex-col items-center justify-center h-40">
            <Plus className="w-12 h-12 text-gray-400 group-hover:text-green-500 transition-colors" />
            <span className="mt-2 text-gray-400 group-hover:text-green-500 transition-colors">Agregar Nuevo Overlay</span>
          </div>
        </div>

        <div className="bg-black/20 rounded-lg p-6 relative group">
          <img
            src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=300&h=200"
            alt="Vista previa de Alertas"
            className="w-full h-40 object-cover rounded"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Editar Alertas</button>
          </div>
          <h3 className="mt-2 font-medium">Alertas</h3>
          <p className="text-sm text-gray-400">Alertas personalizadas para donaciones y seguidores</p>
        </div>

        <div className="bg-black/20 rounded-lg p-6 relative group">
          <img
            src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=300&h=200"
            alt="Vista previa del Chat"
            className="w-full h-40 object-cover rounded"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Editar Chat</button>
          </div>
          <h3 className="mt-2 font-medium">Chat Overlay</h3>
          <p className="text-sm text-gray-400">Visualización personalizable del chat</p>
        </div>
      </div>

      <div className="bg-black/20 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Configuración de Overlays</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Estilo de Animación</label>
            <select className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="fade">Desvanecer</option>
              <option value="slide">Deslizar</option>
              <option value="bounce">Rebotar</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Duración (segundos)</label>
            <input
              type="number"
              className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              defaultValue={5}
              min={1}
              max={60}
            />
          </div>

          <div className="pt-4">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Guardar Configuración
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overlay;