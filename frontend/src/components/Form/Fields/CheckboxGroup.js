import React from 'react';

/**
 * Controlled group of checkboxes.
 *
 * Fully presentational: the selected values and the toggle handler are owned by
 * the parent form, so this component holds no state of its own. The whole row is
 * a label with a hover highlight, giving a large, obviously clickable target.
 */
function CheckboxGroup({
  title,
  options,
  selectedValues,
  onToggle,
  accentClassName = 'accent-blue-600',
}) {
  const selectedCount = selectedValues.length;

  return (
    <fieldset className="mb-6">
      <legend className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
        {selectedCount > 0 && (
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
            {selectedCount}
          </span>
        )}
      </legend>

      <ul className="space-y-0.5">
        {options.map((option) => (
          <li key={option}>
            <label className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2 transition-colors duration-200 hover:bg-slate-50">
              <input
                type="checkbox"
                value={option}
                checked={selectedValues.includes(option)}
                onChange={() => onToggle(option)}
                className={`mt-0.5 h-5 w-5 shrink-0 rounded border-slate-300 ${accentClassName}`}
              />
              <span className="text-sm leading-relaxed text-slate-700">
                {option}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

export default CheckboxGroup;
