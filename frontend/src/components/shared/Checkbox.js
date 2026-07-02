import React from 'react';

/**
 * Generic controlled input (checkbox by default, but accepts `type="radio"`
 * via props). The label is passed as `children`.
 */
function Checkbox({ children, type = 'checkbox', className = '', ...props }) {
  return (
    <label className="flex items-center">
      <input
        type={type}
        className={`form-checkbox h-5 w-5 text-blue-500 ${className}`.trim()}
        {...props}
      />
      {children && <span className="ml-2">{children}</span>}
    </label>
  );
}

export default Checkbox;
