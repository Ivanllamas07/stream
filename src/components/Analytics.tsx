import React from 'react';
import { Users, Clock, ThumbsUp, Eye } from 'lucide-react';

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Analíticas del Stream</h2>
      
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-black/20 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6 text-green-400" />
            <span className="text-gray-400">Espectadores Actuales</span>
          </div>
          <div className="mt-2 text-2xl font-bold">0</div>
        </div>

        <div className="bg-black/20 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Clock className="w-6 h-6 text-green-400" />
            <span className="text-gray-400">Duración</span>
          </div>
          <div className="mt-2 text-2xl font-bold">00:00:00</div>
        </div>

        <div className="bg-black/20 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <ThumbsUp className="w-6 h-6 text-green-400" />
            <span className="text-gray-400">Me gusta</span>
          </div>
          <div className="mt-2 text-2xl font-bold">0</div>
        </div>

        <div className="bg-black/20 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Eye className="w-6 h-6 text-green-400" />
            <span className="text-gray-400">Pico de Espectadores</span>
          </div>
          <div className="mt-2 text-2xl font-bold">0</div>
        </div>
      </div>

      <div className="bg-black/20 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Retención de Espectadores</h3>
        <div className="h-64 flex items-end space-x-2">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-green-500/20 hover:bg-green-500/30 transition-colors rounded-t"
              style={{
                height: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-sm text-gray-400">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>23:59</span>
        </div>
      </div>
    </div>
  );
};

export default Analytics;