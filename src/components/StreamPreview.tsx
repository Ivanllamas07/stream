import React, { useState, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, Mic, Video, VideoOff, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const StreamPreview: React.FC = () => {
  const webcamRef = React.useRef<Webcam>(null);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const [selectedMic, setSelectedMic] = useState<string>('');
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  const videoConstraints = {
    width: 1920,
    height: 1080,
    deviceId: selectedCamera ? { exact: selectedCamera } : undefined
  };

  const audioConstraints = {
    deviceId: selectedMic ? { exact: selectedMic } : undefined
  };

  const initializeDevices = useCallback(async () => {
    try {
      setIsInitializing(true);
      setHasError(false);

      // Release existing streams
      if (webcamRef.current?.stream) {
        webcamRef.current.stream.getTracks().forEach(track => track.stop());
      }

      // Get list of devices
      const devices = await navigator.mediaDevices.enumerateDevices();
      const vDevices = devices.filter(device => device.kind === 'videoinput');
      const aDevices = devices.filter(device => device.kind === 'audioinput');
      
      setVideoDevices(vDevices);
      setAudioDevices(aDevices);
      
      // Set default devices if none selected
      if (!selectedCamera && vDevices.length > 0) {
        setSelectedCamera(vDevices[0].deviceId);
      }
      if (!selectedMic && aDevices.length > 0) {
        setSelectedMic(aDevices[0].deviceId);
      }

      // Test media access
      const constraints = {
        video: selectedCamera ? { deviceId: { exact: selectedCamera } } : true,
        audio: selectedMic ? { deviceId: { exact: selectedMic } } : true
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (webcamRef.current) {
        webcamRef.current.stream = stream;
      }

      setIsCameraOn(true);
      setIsMicOn(true);
    } catch (error: any) {
      console.error('Error accediendo a los dispositivos:', error);
      setHasError(true);
      handleDeviceError(error);
    } finally {
      setIsInitializing(false);
    }
  }, [selectedCamera, selectedMic]);

  const handleDeviceError = (error: any) => {
    let message = 'Error al acceder a los dispositivos multimedia';
    
    if (error instanceof DOMException) {
      switch (error.name) {
        case 'NotAllowedError':
          message = 'Por favor, permite el acceso a la cámara y micrófono';
          break;
        case 'NotFoundError':
          message = 'No se encontró el dispositivo seleccionado';
          break;
        case 'NotReadableError':
          message = 'El dispositivo está siendo usado por otra aplicación. Por favor, cierra otras aplicaciones que puedan estar usándolo.';
          break;
        case 'OverconstrainedError':
          message = 'La configuración del dispositivo no es compatible';
          break;
        default:
          message = `Error: ${error.message || 'Desconocido'}`;
      }
    }

    toast.error(message);
  };

  useEffect(() => {
    initializeDevices();

    const handleDeviceChange = () => {
      initializeDevices();
    };

    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);
    
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange);
      if (webcamRef.current?.stream) {
        webcamRef.current.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [initializeDevices]);

  const toggleCamera = async () => {
    if (hasError) {
      toast.error('Verifica el acceso a la cámara antes de continuar');
      return;
    }

    if (!isCameraOn) {
      await initializeDevices();
    } else if (webcamRef.current?.stream) {
      webcamRef.current.stream.getVideoTracks().forEach(track => track.stop());
    }
    
    setIsCameraOn(!isCameraOn);
  };

  const toggleMic = () => {
    if (hasError) {
      toast.error('Verifica el acceso al micrófono antes de continuar');
      return;
    }

    if (webcamRef.current?.stream) {
      webcamRef.current.stream.getAudioTracks().forEach(track => {
        track.enabled = !isMicOn;
      });
    }
    
    setIsMicOn(!isMicOn);
  };

  const handleDeviceChange = (deviceId: string, type: 'camera' | 'mic') => {
    if (type === 'camera') {
      setSelectedCamera(deviceId);
    } else {
      setSelectedMic(deviceId);
    }
    setIsCameraOn(true);
    setIsMicOn(true);
    initializeDevices();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Previsualización</h2>
      <div className="bg-black/20 rounded-lg p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              <Camera className="w-4 h-4 inline-block mr-2" />
              Seleccionar Cámara
            </label>
            <select
              value={selectedCamera}
              onChange={(e) => handleDeviceChange(e.target.value, 'camera')}
              className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={hasError || isInitializing}
            >
              <option value="">Selecciona una cámara</option>
              {videoDevices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Cámara ${videoDevices.indexOf(device) + 1}`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              <Mic className="w-4 h-4 inline-block mr-2" />
              Seleccionar Micrófono
            </label>
            <select
              value={selectedMic}
              onChange={(e) => handleDeviceChange(e.target.value, 'mic')}
              className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={hasError || isInitializing}
            >
              <option value="">Selecciona un micrófono</option>
              {audioDevices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Micrófono ${audioDevices.indexOf(device) + 1}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
          {isInitializing ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-900">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
            </div>
          ) : hasError ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-gray-400 space-y-4">
              <AlertCircle className="w-16 h-16" />
              <p className="text-center px-4">
                No se pudo acceder a los dispositivos. Por favor, verifica los permisos y que no estén siendo usados por otra aplicación.
              </p>
              <button
                onClick={() => initializeDevices()}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Reintentar
              </button>
            </div>
          ) : isCameraOn ? (
            <Webcam
              ref={webcamRef}
              audio={isMicOn}
              videoConstraints={videoConstraints}
              audioConstraints={audioConstraints}
              onUserMediaError={handleDeviceError}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-900">
              <VideoOff className="w-16 h-16 text-gray-600" />
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 ${hasError ? 'bg-red-500' : isInitializing ? 'bg-yellow-500' : 'bg-green-500'} rounded-full ${!hasError && !isInitializing && 'animate-pulse'}`}></div>
            <span className="text-sm text-gray-400">
              {isInitializing ? 'Inicializando...' : hasError ? 'Error' : 'Listo para transmitir'}
            </span>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={toggleMic}
              disabled={hasError || isInitializing}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                hasError || isInitializing
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : isMicOn 
                    ? 'bg-black/30 hover:bg-black/40 text-white' 
                    : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>{isMicOn ? 'Silenciar' : 'Activar'} Micrófono</span>
            </button>

            <button
              onClick={toggleCamera}
              disabled={hasError || isInitializing}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                hasError || isInitializing
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : isCameraOn 
                    ? 'bg-black/30 hover:bg-black/40 text-white' 
                    : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>{isCameraOn ? 'Apagar' : 'Encender'} Cámara</span>
            </button>

            <button 
              disabled={hasError || isInitializing || !selectedCamera || !selectedMic}
              className={`px-6 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                hasError || isInitializing || !selectedCamera || !selectedMic
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              <span>Iniciar Transmisión</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamPreview;