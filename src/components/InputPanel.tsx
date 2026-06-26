import type { ProductInput } from '../types';

interface InputPanelProps {
  input: ProductInput;
  onChange: (input: ProductInput) => void;
}

export function InputPanel({ input, onChange }: InputPanelProps) {
  const updateListing = (index: number, value: string) => {
    const nextListings = [...input.historicalListings] as ProductInput['historicalListings'];
    nextListings[index] = value.slice(0, 900);
    onChange({ ...input, historicalListings: nextListings });
  };

  return (
    <section className="panel input-panel" aria-label="Workflow inputs">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Input</p>
          <h2>Seller Context</h2>
        </div>
        <span className="mini-badge">3 examples + 1 new product</span>
      </div>

      <div className="field-group">
        <label htmlFor="product-name">New product</label>
        <input
          id="product-name"
          onChange={(event) => onChange({ ...input, productName: event.target.value })}
          placeholder="AeroFit Wireless Earbuds"
          value={input.productName}
        />
      </div>

      <div className="field-grid">
        <div className="field-group">
          <label htmlFor="selling-points">Selling points</label>
          <textarea
            id="selling-points"
            onChange={(event) => onChange({ ...input, sellingPoints: event.target.value })}
            placeholder="long battery life, water resistant design..."
            rows={4}
            value={input.sellingPoints}
          />
        </div>
        <div className="field-group">
          <label htmlFor="keywords">Keywords</label>
          <textarea
            id="keywords"
            onChange={(event) => onChange({ ...input, keywords: event.target.value })}
            placeholder="wireless earbuds, bluetooth earbuds..."
            rows={4}
            value={input.keywords}
          />
        </div>
      </div>

      <div className="field-group">
        <label htmlFor="desired-tone">Desired tone</label>
        <input
          id="desired-tone"
          onChange={(event) => onChange({ ...input, desiredTone: event.target.value })}
          placeholder="premium but practical"
          value={input.desiredTone}
        />
      </div>

      <div className="listing-stack">
        {input.historicalListings.map((listing, index) => (
          <div className="field-group" key={index}>
            <label htmlFor={`listing-${index}`}>Historical listing {index + 1}</label>
            <textarea
              id={`listing-${index}`}
              maxLength={900}
              onChange={(event) => updateListing(index, event.target.value)}
              placeholder="Paste one high-performing English listing"
              rows={5}
              value={listing}
            />
            <span className="char-count">{listing.length}/900</span>
          </div>
        ))}
      </div>
    </section>
  );
}
