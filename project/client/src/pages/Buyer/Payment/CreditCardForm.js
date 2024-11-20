import React, { useState } from "react";
import { validateCardHolder, validateCVV, validateCardNumber, validateExpirationDate } from "utils/utils";

const CreditCardForm = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    cardHolder: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data
    const errors = {
      cardNumber: validateCardNumber(formData.cardNumber),
      expirationDate: validateExpirationDate(formData.expirationDate),
      cvv: validateCVV(formData.cvv),
      cardHolder: validateCardHolder(formData.cardHolder),
    };

    setErrors(errors);

    // Check if there are no errors
    if (Object.values(errors).every((error) => error === null)) {
      console.log("Form Data:", formData);
      alert("Payment submitted successfully!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 mt-8"
    >

      {/* Card Number */}
      <div>
        <label className="block text-sm font-medium mb-1">Card number</label>
        <div className="relative">
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            className="w-full border rounded-md p-2 pl-10"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            required
          />
          <span className="absolute left-3 top-2 text-gray-400 material-symbols-outlined">
          credit_card
          </span>
        </div>
        {errors.cardNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
        )}
      </div>

      {/* Expiration Date and CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Expiration date
          </label>
          <div className="relative">
            <input
              type="text"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              className="w-full border rounded-md p-2 pl-10"
              placeholder="MM/YY"
              maxLength={5}
              required
            />
            <span className="absolute left-3 top-2 text-gray-400 material-symbols-outlined">
              calendar_today
            </span>
          </div>
          {errors.expirationDate && (
            <p className="text-red-500 text-sm mt-1">{errors.expirationDate}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CVV</label>
          <div className="relative">
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              className="w-full border rounded-md p-2 pl-10"
              placeholder="123"
              maxLength={3}
              required
            />
            
            <span className="absolute left-3 top-2 text-gray-400 material-symbols-outlined">
                pin
            </span>
          </div>
          {errors.cvv && (
            <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
          )}
        </div>
      </div>

      {/* Card Holder */}
      <div>
        <label className="block text-sm font-medium mb-1">Card holder</label>
        <div className="relative">
          <input
            type="text"
            name="cardHolder"
            value={formData.cardHolder}
            onChange={handleChange}
            className="w-full border rounded-md p-2 pl-10"
            placeholder="Full name"
            maxLength={50}
            required
          />
          <span className="absolute left-3 top-2 text-gray-400 material-symbols-outlined">
            account_circle
          </span>
        </div>
        {errors.cardHolder && (
          <p className="text-red-500 text-sm mt-1">{errors.cardHolder}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
      >
        Submit Payment
      </button>
    </form>
  );
};

export default CreditCardForm;