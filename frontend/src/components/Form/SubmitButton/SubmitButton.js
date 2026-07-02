import React from 'react';

/**
 * Primary submit button. Full width on mobile for a comfortable tap target and
 * auto width from the `sm` breakpoint up. Vibrant blue with a subtle press
 * effect for a premium, tactile feel.
 */
function SubmitButton({ text }) {
  return (
    <button
      type="submit"
      className="w-full rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95 sm:w-auto"
    >
      {text}
    </button>
  );
}

export default SubmitButton;
