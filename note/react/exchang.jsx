import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Main App Component
function ExchangePage() {
    // --- State Management ---
    // State for the KHR and USD input values. We store them as strings
    // to allow for empty inputs and have better control over the display.
    const [khrValue, setKhrValue] = useState('');
    const [usdValue, setUsdValue] = useState('');

    // --- Constants ---
    // The exchange rate for USD to KHR.
    const USD_TO_KHR_RATE = 4100; // 1 USD = 4100 KHR

    // --- Event Handlers ---

    /**
     * Handles changes in the KHR input field.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
     */
    const handleKhrChange = (e) => {
        const value = e.target.value;
        setKhrValue(value);

        // If the input is a valid number, calculate the USD equivalent.
        // Otherwise, clear the USD input.
        if (value && !isNaN(value)) {
            const usd = parseFloat(value) / USD_TO_KHR_RATE;
            setUsdValue(usd.toFixed(4)); // More precision for USD
        } else {
            setUsdValue('');
        }
    };

    /**
     * Handles changes in the USD input field.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
     */
    const handleUsdChange = (e) => {
        const value = e.target.value;
        setUsdValue(value);

        // If the input is a valid number, calculate the KHR equivalent.
        // Otherwise, clear the KHR input.
        if (value && !isNaN(value)) {
            const khr = parseFloat(value) * USD_TO_KHR_RATE;
            setKhrValue(khr.toFixed(0)); // No decimal for KHR
        } else {
            setKhrValue('');
        }
    }; 
    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen font-sans">
            <div className="w-full max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg">
                <h1 className="text-2xl font-bold mb-6">Currency Exchange (1 USD = {USD_TO_KHR_RATE} KHR)</h1>
                <p className="text-center text-gray-500 mb-6">KHR to USD (React Version)</p>

                <div className="space-y-4">
                    {/* KHR Input */}
                    <CurrencyInput
                        label="You send (KHR)"
                        symbol="៛"
                        value={khrValue}
                        onChange={handleKhrChange}
                        placeholder="0.00"
                    />

                    {/* Exchange Rate Display */}
                    <div className="flex items-center justify-center text-gray-500 font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h8m0 0l-3-3m3 3l-3 3m4 4H8m0 0l3 3m-3-3l3-3" />
                        </svg>
                        <p className="text-sm">1 USD = {1 / KHR_TO_USD_RATE} KHR</p>
                    </div>

                    {/* USD Input */}
                    <CurrencyInput
                        label="They receive (USD)"
                        symbol="$"
                        value={usdValue}
                        onChange={handleUsdChange}
                        placeholder="0.00"
                    />
                </div>

                <div className="mt-6 text-xs text-center text-gray-400">
                    <p>Rates are for demonstration purposes.</p>
                </div>
            </div>
        </div>
    );
}
/**
 * A reusable currency input component.
 * @param {{label: string, symbol: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string}} props
 */
function CurrencyInput({ label, symbol, value, onChange, placeholder }) {
    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 pt-3 text-gray-400">{symbol}</span>
            <input
                type="number"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
        </div>
    );
} 
ExchangePage.PropTypes = { 
    label: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
}; 
export default ExchangePage