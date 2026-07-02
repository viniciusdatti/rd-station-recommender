import React from 'react';
import { RecommendationType as RECOMMENDATION_TYPE } from '../../../services/recommendation.service';

const RECOMMENDATION_TYPES = [
  {
    value: RECOMMENDATION_TYPE.SINGLE,
    label: 'Produto único',
    hint: 'Retorna o de maior afinidade',
  },
  {
    value: RECOMMENDATION_TYPE.MULTIPLE,
    label: 'Múltiplos produtos',
    hint: 'Retorna todos os compatíveis',
  },
];

const BASE_OPTION_CLASSES =
  'relative flex cursor-pointer flex-col rounded-xl border-2 p-4 transition-all duration-300';
const SELECTED_OPTION_CLASSES = 'border-blue-600 bg-blue-50 shadow-sm';
const UNSELECTED_OPTION_CLASSES =
  'border-slate-200 hover:border-slate-300 hover:bg-slate-50';

/**
 * Small check badge shown on the selected toggle card.
 */
function CheckBadge() {
  return (
    <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
      <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 011.4-1.4l2.8 2.8 6.8-6.8a1 1 0 011.4 0z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

/**
 * Controlled radio group rendered as selectable toggle cards. Presentational:
 * the selected value and the change handler come from the parent form. The
 * native radio is visually hidden but kept for accessibility and keyboard use.
 */
function RecommendationType({ value, onChange }) {
  return (
    <fieldset className="mb-6">
      <legend className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
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
              <input
                type="radio"
                name="recommendationType"
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                aria-label={option.label}
                className="sr-only"
              />
              {isSelected && <CheckBadge />}
              <span className="pr-6 text-sm font-semibold text-slate-800">
                {option.label}
              </span>
              <span className="mt-1 text-xs text-slate-500">{option.hint}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default RecommendationType;
