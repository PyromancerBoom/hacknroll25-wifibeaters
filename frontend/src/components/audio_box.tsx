import React, { useState, useRef } from "react";
import { Play, Pause, Plus, Trash2 } from "lucide-react";

interface AudioFile {
  id: string;
  name: string;
  url: string;
}

interface AudioBoxProps {
  onFocus: () => void;
  onDelete?: () => void;
  isExpanded: boolean;
  canDelete: boolean;
}

const AudioBox: React.FC<AudioBoxProps & { file: AudioFile, isPlaying: boolean, onPlay: () => void }> = ({
  onFocus,
  onDelete,
  isExpanded,
  canDelete,
  file,
  isPlaying,
  onPlay
}) => {
  return (
    <div 
      className={`relative bg-white rounded-xl shadow-md p-4 transition-all duration-300 hover:shadow-lg
        ${isExpanded ? 'col-span-2 row-span-2' : 'col-span-1'}`}
      onClick={onFocus}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium truncate">{file.name}</h3>
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlay();
            }}
            className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          {canDelete && onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="mt-4">
          <audio 
            src={file.url} 
            controls 
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};

const AudioGrid = () => {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [playing, setPlaying] = useState<string | null>(null);
  const [expandedBox, setExpandedBox] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newAudioFiles = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    
    setAudioFiles(prev => [...prev, ...newAudioFiles]);
  };

  const handleDelete = (id: string) => {
    setAudioFiles(prev => prev.filter(file => file.id !== id));
    URL.revokeObjectURL(audioFiles.find(file => file.id === id)?.url || '');
  };

  const handlePlay = (id: string) => {
    if (playing === id) {
      audioRefs.current[id].pause();
      setPlaying(null);
    } else {
      if (playing) {
        audioRefs.current[playing].pause();
      }
      if (!audioRefs.current[id]) {
        audioRefs.current[id] = new Audio(audioFiles.find(file => file.id === id)?.url);
        audioRefs.current[id].addEventListener('ended', () => setPlaying(null));
      }
      audioRefs.current[id].play();
      setPlaying(id);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="white-background "
        >
          <Plus size={20} />
          Add Audio Files
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/mp3"
          multiple
          onChange={handleFileUpload}
          className="hidden transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {audioFiles.map(file => (
          <AudioBox
            key={file.id}
            file={file}
            onFocus={() => setExpandedBox(expandedBox === file.id ? null : file.id)}
            onDelete={() => handleDelete(file.id)}
            isExpanded={expandedBox === file.id}
            canDelete={true}
            isPlaying={playing === file.id}
            onPlay={() => handlePlay(file.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AudioGrid;
