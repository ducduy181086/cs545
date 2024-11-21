import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { ShippingContext } from "context/ShippingContext";

const BillingAddressForm = () => {
  const navigate = useNavigate();
  const { shippingInfo, updateBillingInfo } = useContext(ShippingContext);

  const [formData, setFormData] = useState({
    firstName: shippingInfo?.billingInfo?.firstName ?? "",
    lastName: shippingInfo?.billingInfo?.lastName ?? "",
    address: shippingInfo?.billingInfo?.address ?? "",
    apt: shippingInfo?.billingInfo?.apt ?? "",
    zipCode: shippingInfo?.billingInfo?.zipCode ?? "",
    city: shippingInfo?.billingInfo?.city ?? "",
    state: shippingInfo?.billingInfo?.state ?? "",
    country: "United States",
    phoneNumber: shippingInfo?.billingInfo?.phoneNumber ?? "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    shippingInfo.billingInfo = formData;
    updateBillingInfo(shippingInfo);
    navigate('/payment');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 mt-8"
    >

      {/* First and Last Name */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">First name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border rounded-md p-2 mt-1"
            placeholder="First name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Last name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border rounded-md p-2 mt-1"
            placeholder="Last name"
            required
          />
        </div>
      </div>

      {/* Address Fields */}
      <div>
        <label className="block text-sm font-medium">Address (number and name)</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mt-1"
          placeholder="Address (number and name)"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Apt, Suite, Building, etc. (optional)</label>
        <input
          type="text"
          name="apt"
          value={formData.apt}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mt-1"
          placeholder="Apt, Suite, Building, etc. (optional)"
        />
      </div>

      {/* ZIP and City */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">ZIP code</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="w-full border rounded-md p-2 mt-1"
            placeholder="ZIP code"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border rounded-md p-2 mt-1"
            placeholder="City"
            required
          />
        </div>
      </div>

      {/* State and Country */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">State/province/region</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full border rounded-md p-2 mt-1"
            required
          >
            <option value="">Select state</option>
            <option value="Iowa">Iowa</option>
            <option value="California">California</option>
            <option value="Texas">Texas</option>
            <option value="New York">New York</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border rounded-md p-2 mt-1 cursor-not-allowed bg-gray-200 text-gray-500"
            readOnly
          />
        </div>
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-medium">Phone number</label>
        <div className="flex">
          <select
            className="border rounded-l-md p-2"
            name="countryCode"
          >
            <option value="+1">+1</option>
          </select>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="flex-1 border rounded-r-md p-2"
            placeholder="Phone number"
            required
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Just in case we need to reach you about delivery.
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
      >
        Next
      </button>
    </form>
  );
};

export default BillingAddressForm;