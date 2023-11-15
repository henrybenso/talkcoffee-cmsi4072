// PhoneNumberValidation.tsx
import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

type PhoneNumberValidationProps = {
  value: string | undefined;
  onChange: (value: string) => void;
};

const PhoneNumberValidation: React.FC<PhoneNumberValidationProps> = ({ value, onChange }) => {
  const [valid, setValid] = useState(true);

  const handleChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value);
      setValid(validatePhoneNumber(value));
    }
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;

    return phoneNumberPattern.test(phoneNumber);
  };

  return (
    <div>
      <label>
        Phone Number:
        <PhoneInput
          country={'in'}
          value={value}
          onChange={handleChange}
          inputProps={{
            required: true,
          }}
        />
      </label>
      {!valid && (
        <p>Please enter a valid phone number.</p>
      )}
    </div>
  );
};

export default PhoneNumberValidation;
