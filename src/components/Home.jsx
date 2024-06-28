import { useState } from "react";
// components
import { SavedQuotesButtonHeader } from "./SavedQuotesButton";
import { QuoteForm } from "./QuoteForm";
import { QuoteResult } from "./QuoteResult";

export const Home = () => {  
    const [quote, setQuote] = useState(null);
    
    return (
    <div className="app-container">
        <div>
            <SavedQuotesButtonHeader />
        </div>

        <div>
            <QuoteForm setQuote={setQuote} />
            {quote && <QuoteResult quote={quote} />}    
        </div>

    </div>
    );
  };
  