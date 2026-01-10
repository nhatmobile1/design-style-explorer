import { useState } from 'react';
import StyleSelector from './components/StyleSelector';
import StyleInfo from './components/StyleInfo';
import AppPreview from './components/AppPreview';
import './App.css';

function App() {
  const [selectedStyle, setSelectedStyle] = useState('minimalist');

  return (
    <div className="app-layout">
      <aside className="sidebar-left">
        <StyleSelector
          selectedStyle={selectedStyle}
          onSelectStyle={setSelectedStyle}
        />
      </aside>

      <main className="main-content">
        <AppPreview selectedStyle={selectedStyle} />
      </main>

      <aside className="sidebar-right">
        <StyleInfo selectedStyle={selectedStyle} />
      </aside>
    </div>
  );
}

export default App;
