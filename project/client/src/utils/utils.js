function formatPhoneNumber(phoneNumber) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return null;
}

const validateCardNumber = (number) => {
    number = number.replace(/\s/g, '');
    const regex = /^[0-9]{16}$/;
    if (!regex.test(number)) return "Card number must be 19 digits.";
    // Luhn Algorithm for credit card validation
    let sum = 0;
    for (let i = 0; i < number.length; i++) {
        let digit = parseInt(number[i]);
        if (i % 2 === number.length % 2) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
    }
    if (sum % 10 !== 0) return "Invalid card number.";
    return null;
};

const validateExpirationDate = (date) => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
    if (!regex.test(date)) return "Expiration date must be in MM/YY format.";
    const [month, year] = date.split("/").map((val) => parseInt(val));
    const now = new Date();
    const currentYear = parseInt(now.getFullYear().toString().slice(-2));
    const currentMonth = now.getMonth() + 1;
    if (year < currentYear || (year === currentYear && month < currentMonth))
        return "Card is expired.";
    return null;
};

const validateCVV = (cvv) => {
    const regex = /^[0-9]{3}$/;
    if (!regex.test(cvv)) return "CVV must be 3 digits.";
    return null;
};

const validateCardHolder = (name) => {
    if (!name.trim()) return "Card holder name is required.";
    if (!/^[a-zA-Z\s]+$/.test(name))
        return "Card holder name must contain only letters.";
    return null;
};

const validateColor = (color) => {
    console.log(color);
    if (!color) return "Please select a color.";
    return null;
};

const validateSize = (size) => {
    if (!size) return "Please select a size.";
    return null;
};

const buildShippingInfo = (shippingInfo = {}) => ({
    phoneNumber: shippingInfo?.phoneNumber ?? "",
    customerName: `${shippingInfo?.firstName ?? ""} ${shippingInfo?.lastName ?? ""}`,
    shippingAddress: `${shippingInfo?.address ?? ""} ${shippingInfo?.apt ?? ""} ${shippingInfo?.zipCode ?? ""} ${shippingInfo?.city ?? ""} ${shippingInfo?.state ?? ""} ${shippingInfo?.country ?? ""}`,
});

const formatNumber = (number) => {
    return formatMoney(number);
  };

  const formatMoney = (number) => {
    return number.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true, // Toggle for 12-hour or 24-hour format
    });
  };

export {
    formatPhoneNumber,
    validateCardNumber,
    validateExpirationDate,
    validateCVV,
    validateCardHolder,
    validateColor,
    validateSize,
    buildShippingInfo,
    formatNumber,
    formatDateTime,
    formatMoney
};