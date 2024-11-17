import React, { useState } from 'react';
import { Settings, Youtube, Users, Radio, MessageSquare, Activity, Layout } from 'lucide-react';
import StreamSettings from './components/StreamSettings';
import ChatPanel from './components/ChatPanel';
import StreamInfo from './components/StreamInfo';
import Analytics from './components/Analytics';
import Overlay from './components/Overlay';

function App() {
  const [activeTab, setActiveTab] = useState('settings');
  const [streamKey, setStreamKey] = useState('');

  const renderContent = () => {
    switch (activeTab) {
      case 'settings':
        return <StreamSettings streamKey={streamKey} setStreamKey={setStreamKey} />;
      case 'chat':
        return <ChatPanel />;
      case 'info':
        return <StreamInfo />;
      case 'analytics':
        return <Analytics />;
      case 'overlay':
        return <Overlay />;
      default:
        return <StreamSettings streamKey={streamKey} setStreamKey={setStreamKey} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <nav className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Youtube className="w-8 h-8 text-green-500" />
              <span className="ml-2 text-xl font-bold">StreamPro</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-2">
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 space-y-4">
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  activeTab === 'settings' ? 'bg-green-500 text-white' : 'hover:bg-white/5'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>Configuración</span>
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  activeTab === 'chat' ? 'bg-green-500 text-white' : 'hover:bg-white/5'
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                <span>Chat en Vivo</span>
              </button>
              <button
                onClick={() => setActiveTab('info')}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  activeTab === 'info' ? 'bg-green-500 text-white' : 'hover:bg-white/5'
                }`}
              >
                <Radio className="w-5 h-5" />
                <span>Info del Stream</span>
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  activeTab === 'analytics' ? 'bg-green-500 text-white' : 'hover:bg-white/5'
                }`}
              >
                <Activity className="w-5 h-5" />
                <span>Analíticas</span>
              </button>
              <button
                onClick={() => setActiveTab('overlay')}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  activeTab === 'overlay' ? 'bg-green-500 text-white' : 'hover:bg-white/5'
                }`}
              >
                <Layout className="w-5 h-5" />
                <span>Overlays</span>
              </button>
            </div>

            <div className="mt-6 bg-black/30 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-green-500" />
                <span className="font-medium">Espectadores</span>
              </div>
              <div className="mt-2 text-2xl font-bold">0</div>
            </div>
          </div>

          <div className="col-span-10">
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;