import React from "react";
import "./OurPolicy.css";
import { assets } from "../assets/assets";

const policies = [
  { title: "Secure Payment", logo: assets.pay },
  { title: "Made in India", logo: assets.mii },
  { title: "Cash on Delivery", logo: assets.cod },
  { title: "Prompt Customer Service", logo: assets.cust},
];

const OurPolicy = () => {
  return (
    <div className="our-policy">
      <div className="policies-container">
        {policies.map((policy, index) => (
          <div className="policy-item" key={index}>
            <img src={policy.logo} alt={policy.title} className="policy-logo" />
            <p className="policy-title">{policy.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurPolicy;
