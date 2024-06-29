import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllQuotes, deleteQuote, clearAllQuotes } from '../utils/indexedDB';
import { QuoteResult } from './QuoteResult';

const SavedQuotes = () => {
  const [savedQuotes, setSavedQuotes] = useState([]);

  useEffect(() => {
    fetchSavedQuotes();
  }, []);

  const fetchSavedQuotes = () => {
    getAllQuotes()
      .then(quotes => {
        setSavedQuotes(quotes);
      })
      .catch(error => {
        console.error('Error fetching saved quotes:', error);
      });
  };

  const handleDeleteQuote = (id) => {
    deleteQuote(id)
      .then(() => {
        fetchSavedQuotes(); // Update the list after deleting
      })
      .catch(error => {
        console.error('Error deleting quote:', error);
      });
  };

  const handleClearAllQuotes = () => {
    clearAllQuotes()
      .then(() => {
        setSavedQuotes([]); // Clear the list after deleting all quotes
      })
      .catch(error => {
        console.error('Error clearing all quotes:', error);
      });
  };

  return (
    <div className="saved-quotes-page">
      <div className="navigation">
        <Link to="/">Back to Home</Link>
      </div>
      <div className="saved-quotes-container">
        {savedQuotes.map((quote, index) => (
          <div key={index} className="saved-quote">
            <QuoteResult quote={quote} showActions={false} /> 
            <button onClick={() => handleDeleteQuote(quote.id)}>Delete</button>
          </div>
        ))}
      </div>
      <button onClick={handleClearAllQuotes}>Clear All Quotes</button>
    </div>
  );
};

export default SavedQuotes;
