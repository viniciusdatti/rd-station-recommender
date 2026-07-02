import React, { useState } from 'react';
import { CheckboxGroup, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';

const INITIAL_FORM_STATE = {
  selectedPreferences: [],
  selectedFeatures: [],
  selectedRecommendationType: 'SingleProduct',
};

/**
 * Presentational (dumb) form.
 *
 * It only knows how to render the controlled inputs and, on submit, hand the
 * collected selection back to the parent via `onSubmit`. It has no API calls and
 * no recommendation logic.
 *
 * @param {string[]} preferences - available preference options
 * @param {string[]} features - available feature options
 * @param {(formData: object) => void} onSubmit - receives the clean selection
 */
function Form({ preferences, features, onSubmit }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  const hasSelection =
    formData.selectedPreferences.length > 0 ||
    formData.selectedFeatures.length > 0;

  const toggleSelection = (field, value) => {
    setFormData((current) => {
      const values = current[field];

      if (values.includes(value)) {
        const withoutValue = values.filter((item) => item !== value);
        return { ...current, [field]: withoutValue };
      }

      return { ...current, [field]: [...values, value] };
    });
  };

  const changeRecommendationType = (value) => {
    setFormData((current) => ({
      ...current,
      selectedRecommendationType: value,
    }));
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CheckboxGroup
        title="Preferências"
        options={preferences}
        selectedValues={formData.selectedPreferences}
        onToggle={(value) => toggleSelection('selectedPreferences', value)}
        accentClassName="accent-blue-600"
      />

      <CheckboxGroup
        title="Funcionalidades"
        options={features}
        selectedValues={formData.selectedFeatures}
        onToggle={(value) => toggleSelection('selectedFeatures', value)}
        accentClassName="accent-emerald-600"
      />

      <RecommendationType
        value={formData.selectedRecommendationType}
        onChange={changeRecommendationType}
      />

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <SubmitButton text="Obter recomendação" />
        <button
          type="button"
          onClick={resetForm}
          disabled={!hasSelection}
          className="w-full rounded-lg border border-gray-300 px-5 py-2.5 font-semibold text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          Limpar
        </button>
      </div>
    </form>
  );
}

export default Form;
