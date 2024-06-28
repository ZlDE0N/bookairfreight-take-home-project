import { Link } from 'react-router-dom';

export const SavedQuotesButtonHeader = () => (
    <header>
      <Link to="/saved-quotes">
        <button>Save quotes</button>
      </Link>
    </header>
  );