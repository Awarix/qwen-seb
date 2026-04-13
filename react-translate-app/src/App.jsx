import { useState } from 'react'
import './App.css'

// Mock data for translations
const mockTranslations = [
  { id: 1, original: 'Hello', translated: 'Hola' },
  { id: 2, original: 'Good morning', translated: 'Buenos días' },
  { id: 3, original: 'Thank you', translated: 'Gracias' },
  { id: 4, original: 'How are you?', translated: '¿Cómo estás?' },
  { id: 5, original: 'Goodbye', translated: 'Adiós' },
];

function App() {
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [displayHistory, setDisplayHistory] = useState([]);

  // Function to handle translation (mock)
  const handleTranslate = () => {
    if (originalText.trim()) {
      // Mock translation - in real app this would call an API
      const mockTranslation = mockTranslations.find(
        item => item.original.toLowerCase() === originalText.toLowerCase()
      );
      
      const result = mockTranslation 
        ? mockTranslation.translated 
        : `[Translated] ${originalText}`;
      
      setTranslatedText(result);
      
      // Add to display history
      setDisplayHistory(prev => [
        { original: originalText, translated: result, timestamp: new Date().toLocaleTimeString() },
        ...prev
      ]);
    }
  };

  // Function to clear both textareas
  const handleClear = () => {
    setOriginalText('');
    setTranslatedText('');
  };

  return (
    <div className="app-container">
      <h1>Translation App</h1>
      
      <div className="textarea-container">
        <div className="textarea-wrapper">
          <label htmlFor="original">Original Text</label>
          <textarea
            id="original"
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            placeholder="Enter text to translate..."
            rows="6"
          />
        </div>
        
        <div className="textarea-wrapper">
          <label htmlFor="translated">Translated Text</label>
          <textarea
            id="translated"
            value={translatedText}
            onChange={(e) => setTranslatedText(e.target.value)}
            placeholder="Translation will appear here..."
            rows="6"
            readOnly
          />
        </div>
      </div>
      
      <div className="button-container">
        <button onClick={handleTranslate} className="translate-btn">
          Translate
        </button>
        <button onClick={handleClear} className="clear-btn">
          Clear
        </button>
      </div>
      
      {/* Display History Section */}
      {displayHistory.length > 0 && (
        <div className="history-section">
          <h2>Translation History</h2>
          <div className="history-list">
            {displayHistory.map((item, index) => (
              <div key={index} className="history-item">
                <div className="history-original">
                  <strong>Original:</strong> {item.original}
                </div>
                <div className="history-translated">
                  <strong>Translated:</strong> {item.translated}
                </div>
                <div className="history-time">
                  <small>{item.timestamp}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
