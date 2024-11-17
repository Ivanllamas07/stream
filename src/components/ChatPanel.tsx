import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatPanel: React.FC = () => {
  const [messages] = useState([
    { id: 1, user: 'Espectador1', message: '¡Gran stream!', timestamp: '14:30' },
    { id: 2, user: 'Espectador2', message: '¡Me encanta el contenido!', timestamp: '14:31' },
    { id: 3, user: 'Espectador3', message: '¡Sigue así! 🔥', timestamp: '14:32' },
  ]);

  return (
    <div className="h-[calc(100vh-12rem)]">
      <h2 className="text-2xl font-bold mb-4">Chat en Vivo</h2>
      <div className="bg-black/20 rounded-lg h-full flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  {msg.user.charAt(0)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-green-400">{msg.user}</span>
                  <span className="text-xs text-gray-400">{msg.timestamp}</span>
                </div>
                <p className="text-gray-200">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-700">
          <div className="relative">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              className="w-full bg-black/30 border border-gray-600 rounded-lg pl-4 pr-12 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-400">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;