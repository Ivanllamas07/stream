import React from 'react';

const StreamInfo: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Información del Stream</h2>
      <div className="bg-black/20 rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Título del Stream</label>
            <input
              type="text"
              className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ingresa el título de tu stream"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Descripción</label>
            <textarea
              className="w-full h-32 bg-black/30 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ingresa la descripción de tu stream"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Categoría</label>
            <select className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="gaming">Juegos</option>
              <option value="just-chatting">Solo Charlando</option>
              <option value="music">Música</option>
              <option value="art">Arte</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Etiquetas</label>
            <input
              type="text"
              className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ingresa etiquetas (separadas por comas)"
            />
          </div>

          <div className="pt-4">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Actualizar Información
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamInfo;