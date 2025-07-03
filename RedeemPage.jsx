 import React, { useState } from "react";
import "./RedeemPage.css";

const RedeemPage = ({ ecoCoins, onBack }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleOkClick = () => {
    if (selectedOption) {
      alert(`✅ You selected: ${selectedOption}`);
    } else {
      alert("⚠️ Please select an option before proceeding.");
    }
  };

  return (
    <div className="redeem-page">
      <h2>🎉 Redeem Your EcoCoins</h2>
      <p>You have {ecoCoins.toFixed(2)} EcoCoins to redeem!</p>

      <div className="redeem-options">
        <h3>✅ Select Your Redeem Option</h3>

        <div className="option-box">
          <input
            type="radio"
            name="redeemOption"
            id="option1"
            value="discount"
            checked={selectedOption === "discount"}
            onChange={handleOptionChange}
          />
          <label htmlFor="option1">💸 Apply as discount</label>
        </div>

        <div className="option-box">
          <input
            type="radio"
            name="redeemOption"
            id="option2"
            value="gift"
            checked={selectedOption === "gift"}
            onChange={handleOptionChange}
          />
          <label htmlFor="option2">🎁 Get eco gift item</label>
        </div>

        <div className="option-box">
          <input
            type="radio"
            name="redeemOption"
            id="option3"
            value="donate"
            checked={selectedOption === "donate"}
            onChange={handleOptionChange}
          />
          <label htmlFor="option3">🌿 Support green mission</label>
        </div>
      </div>

      <button className="back-button" onClick={onBack}>
        ⬅ Back
      </button>

      {/* ✅ OK Button Added Below */}
      <button className="ok-button" onClick={handleOkClick}>
        OK
      </button>
    </div>
  );
};

export default RedeemPage;
