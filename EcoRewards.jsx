 import React from "react";

const EcoRewards = ({ ecoCoins, totalSaved }) => {
  return (
    <div style={{
      border: "2px solid #4caf50",
      borderRadius: "12px",
      padding: "15px",
      margin: "20px auto",
      maxWidth: "500px",
      backgroundColor: "#e8f5e9",
      color: "#2e7d32",
      fontWeight: "600",
    }}>
      <h2>🌿 Eco Loyalty Rewards</h2>
      <p>You have earned <strong>{ecoCoins} EcoCoins</strong> for saving <strong>{totalSaved.toFixed(2)} kg</strong> of CO₂ this month!</p>
      <p>Redeem your EcoCoins for Walmart discounts or donate to plant trees.</p>
    </div>
  );
};

export default EcoRewards;
