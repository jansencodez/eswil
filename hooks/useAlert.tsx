import React, { useState } from "react";

function useAlert() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");

  const showAlert = (message: string) => {
    setMessage(message);
    setIsVisible(true);
  };

  const hideAlert = () => {
    setIsVisible(false);
    setMessage("");
  };

  const Alert = () =>
    isVisible ? (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50 text-black">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
          <h2 className="text-xl font-semibold text-center">{message}</h2>
          <div className="flex justify-center mt-4">
            <button
              onClick={hideAlert}
              className="bg-yellow-600 text-white py-2 px-4 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    ) : null;

  return { Alert, showAlert, hideAlert };
}

export default useAlert;
