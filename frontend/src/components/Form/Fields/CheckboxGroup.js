import React from 'react';
import Checkbox from '../../shared/Checkbox';

/**
 * Controlled group of checkboxes.
 *
 * Fully presentational: the selected values and the toggle handler are owned by
 * the parent form, so this component holds no state of its own.
 */
function CheckboxGroup({
  title,
  options,
  selectedValues,
  onToggle,
  accentClassName = '',
}) {
  return (
    <fieldset className="mb-6">
      <legend className="mb-3 text-lg font-semibold text-gray-800">
        {title}
      </legend>

      <ul className="space-y-2">
        {options.map((option) => (
          <li key={option}>
            <Checkbox
              value={option}
              checked={selectedValues.includes(option)}
              onChange={() => onToggle(option)}
              className={accentClassName}
            >
              {option}
            </Checkbox>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

export default CheckboxGroup;
