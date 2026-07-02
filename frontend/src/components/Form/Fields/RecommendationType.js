import React from 'react';
import Checkbox from '../../shared/Checkbox';

const RECOMMENDATION_TYPES = [
  { value: 'SingleProduct', label: 'Produto único' },
  { value: 'MultipleProducts', label: 'Múltiplos produtos' },
];

/**
 * Controlled radio group used to pick the recommendation type. Presentational:
 * the selected value and the change handler come from the parent form.
 */
function RecommendationType({ value, onChange }) {
  return (
    <fieldset className="mb-6">
      <legend className="mb-3 text-lg font-semibold text-gray-800">
        Tipo de recomendação
      </legend>

      <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
        {RECOMMENDATION_TYPES.map((option) => (
          <Checkbox
            key={option.value}
            type="radio"
            name="recommendationType"
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          >
            {option.label}
          </Checkbox>
        ))}
      </div>
    </fieldset>
  );
}

export default RecommendationType;
