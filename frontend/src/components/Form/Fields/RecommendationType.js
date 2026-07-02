import React from 'react';

const RECOMMENDATION_TYPES = [
  {
    value: 'SingleProduct',
    label: 'Produto único',
    hint: 'Retorna o de maior afinidade',
  },
  {
    value: 'MultipleProducts',
    label: 'Múltiplos produtos',
    hint: 'Retorna todos os compatíveis',
  },
];

const BASE_OPTION_CLASSES =
  'flex cursor-pointer flex-col rounded-lg border p-3 transition-colors';
const SELECTED_OPTION_CLASSES = 'border-blue-500 bg-blue-50 ring-1 ring-blue-500';
const UNSELECTED_OPTION_CLASSES = 'border-gray-200 hover:border-gray-300';

/**
 * Controlled radio group rendered as selectable cards. Presentational: the
 * selected value and the change handler come from the parent form.
 */
function RecommendationType({ value, onChange }) {
  return (
    <fieldset className="mb-6">
      <legend className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
        Tipo de recomendação
      </legend>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {RECOMMENDATION_TYPES.map((option) => {
          const isSelected = value === option.value;
          const stateClasses = isSelected
            ? SELECTED_OPTION_CLASSES
            : UNSELECTED_OPTION_CLASSES;

          return (
            <label
              key={option.value}
              className={`${BASE_OPTION_CLASSES} ${stateClasses}`}
            >
              <span className="flex items-center gap-2">
                <input
                  type="radio"
                  name="recommendationType"
                  value={option.value}
                  checked={isSelected}
                  onChange={() => onChange(option.value)}
                  aria-label={option.label}
                  className="h-4 w-4 accent-blue-600"
                />
                <span className="text-sm font-medium text-gray-800">
                  {option.label}
                </span>
              </span>
              <span className="mt-1 pl-6 text-xs text-gray-500">
                {option.hint}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default RecommendationType;
