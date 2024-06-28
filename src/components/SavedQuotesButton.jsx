import { Link } from 'react-router-dom';

export const SavedQuotesButtonHeader = () => (
    <header>
      <Link to="/saved-quotes">
        <button className='save-quotes-btn'>Save quotes</button>
      </Link>
    </header>
  );