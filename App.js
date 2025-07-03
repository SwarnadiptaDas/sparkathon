 import React, { useState, useEffect } from "react";
import products from "./product";
import availabilityData from "./availabilityData";
import ProductCard from "./productcard";
import EcoRewards from "./EcoRewards";
import RedeemPage from "./RedeemPage";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [lowerCo2Products, setLowerCo2Products] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [ecoMessage, setEcoMessage] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("Mumbai");
  const [ecoCoins, setEcoCoins] = useState(0);
  const [totalCo2Saved, setTotalCo2Saved] = useState(0);
  const [showRedeemPage, setShowRedeemPage] = useState(false);

  // Load saved EcoCoins and CO2 from localStorage on mount
  useEffect(() => {
    const savedCoins = localStorage.getItem("ecoCoins");
    const savedCo2 = localStorage.getItem("totalCo2Saved");
    if (savedCoins) setEcoCoins(parseFloat(savedCoins));
    if (savedCo2) setTotalCo2Saved(parseFloat(savedCo2));
  }, []);

  // Save rewards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("ecoCoins", ecoCoins.toString());
    localStorage.setItem("totalCo2Saved", totalCo2Saved.toString());
  }, [ecoCoins, totalCo2Saved]);

  const handleSearch = () => {
    const product = products.find(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    setSelectedProduct(product);
    setShowAlternatives(false);

    if (!product) {
      setShowModal(false);
      setLowerCo2Products([]);
      return;
    }

    // Find eco alternatives with lower CO2 emission
    const sameCategoryProducts = products.filter(
      (p) => p.category === product.category && p.id !== product.id
    );
    const betterProducts = sameCategoryProducts.filter(
      (p) => p.co2Emission < product.co2Emission
    );

    if (betterProducts.length > 0) {
      betterProducts.sort((a, b) => a.co2Emission - b.co2Emission);
      setLowerCo2Products(betterProducts);

      const bestAlt = betterProducts[0];
      const co2Diff = (product.co2Emission - bestAlt.co2Emission).toFixed(1);
      const msg = `${bestAlt.name} emits ${co2Diff}kg less CO₂ and uses ${bestAlt.features}. Choosing this helps reduce environmental impact and aligns with Walmart’s sustainability goals.`;
      setEcoMessage(msg);

      setShowModal(true);
    } else {
      setShowModal(false);
      setLowerCo2Products([]);
    }
  };

  const availableProductIds = availabilityData[selectedBranch] || [];

  const getAvailabilityText = (productId) => {
    return availableProductIds.includes(productId) ? selectedBranch : "Not available here";
  };

  const handleModalChoice = (choice) => {
    setShowModal(false);
    if (choice === "yes") {
      setShowAlternatives(true);
      // Calculate total CO2 saved by switching to best alternative
      if (selectedProduct && lowerCo2Products.length > 0) {
        const bestAlt = lowerCo2Products[0];
        const saved = selectedProduct.co2Emission - bestAlt.co2Emission;
        if (saved > 0) {
          const earnedCoins = saved * 10; // 10 EcoCoins per kg CO2 saved
          setEcoCoins(prev => prev + earnedCoins);
          setTotalCo2Saved(prev => prev + saved);
        }
      }
    }
  };

  // Handle Next button click to go to Redeem page
  const handleNextClick = () => {
    setShowRedeemPage(true);
  };

  // Handle Back button from Redeem page
  const handleBackClick = () => {
    setShowRedeemPage(false);
  };

  // Show RedeemPage if toggled
  if (showRedeemPage) {
    return (
      <RedeemPage
        ecoCoins={ecoCoins}
        onBack={handleBackClick}
      />
    );
  }

  // Main app UI
  return (
    <div className="App">
      <h1>WalBuzz</h1>

      {/* Eco Rewards Display */}
      <EcoRewards ecoCoins={ecoCoins} totalSaved={totalCo2Saved} />

      {/* Branch Selector */}
      <label htmlFor="branch-select">Select your nearest Walmart India branch: </label>
      <select
        id="branch-select"
        value={selectedBranch}
        onChange={(e) => setSelectedBranch(e.target.value)}
      >
        {Object.keys(availabilityData).map(branch => (
          <option key={branch} value={branch}>{branch}</option>
        ))}
      </select>

      <br /><br />

      <input
        type="text"
        placeholder="Search product (e.g. drone)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {/* Show searched product with availability */}
      {selectedProduct && !showAlternatives && (
        <ProductCard
          product={selectedProduct}
          availableAt={getAvailabilityText(selectedProduct.id)}
        />
      )}

      {/* Modal for eco alternative prompt */}
      {showModal && (
        <div className="modal">
          <p>🧠 Want to switch to a more sustainable product and reduce your carbon footprint by 37%?</p>
          <p>{ecoMessage}</p>
          <button onClick={() => handleModalChoice("yes")}>Yes</button>
          <button onClick={() => handleModalChoice("no")}>No</button>
        </div>
      )}

      {/* Show eco alternatives with availability */}
      {showAlternatives && (
        <div>
          <h2>Eco-friendly alternatives:</h2>
          {lowerCo2Products.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              availableAt={getAvailabilityText(p.id)}
            />
          ))}
        </div>
      )}

      {!selectedProduct && query && <p>No product found.</p>}

      {/* Next button to Redeem page */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleNextClick} className="next-button">
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
