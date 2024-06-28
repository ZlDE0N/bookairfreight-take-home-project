// SavedQuotes.js

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllQuotes } from '../utils/indexedDB';
import { QuoteResult } from './QuoteResult';

const SavedQuotes = () => {
  const [savedQuotes, setSavedQuotes] = useState([]);

  useEffect(() => {
    getAllQuotes()
      .then(quotes => {
        setSavedQuotes(quotes);
      })
      .catch(error => {
        console.error('Error fetching saved quotes:', error);
      });
  }, []);

  return (
    <div className="saved-quotes-page">
      <div className="navigation">
        <Link to="/">Back to Home</Link>
      </div>
      <div className="saved-quotes-container">
        {savedQuotes.map((quote, index) => (
          <div key={index} className="saved-quote">
            <QuoteResult quote={quote} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedQuotes;
