import { useState } from "react";
// components
import { SavedQuotesButtonHeader } from "./SavedQuotesButton";
import { QuoteForm } from "./QuoteForm";
import { QuoteResult } from "./QuoteResult";

export const Home = () => {  
    const [quote, setQuote] = useState(null);
    
    return (
    <div>
        <div style={{padding:'2rem'}}>
            <span>componente 1:</span>
            <SavedQuotesButtonHeader />
        </div>

        <div style={{padding: '2rem'}}>
            <span>componente 2:</span>
            <QuoteForm setQuote={setQuote} />
            {quote && <QuoteResult quote={quote} />}    
        </div>

    </div>
    );
  };