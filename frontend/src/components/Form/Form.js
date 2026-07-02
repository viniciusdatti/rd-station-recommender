import React, { useState } from 'react';
import { CheckboxGroup, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import { RecommendationType as RECOMMENDATION_TYPE } from '../../services/recommendation.service';

const INITIAL_FORM_STATE = {
  selectedPreferences: [],
  selectedFeatures: [],
  selectedRecommendationType: RECOMMENDATION_TYPE.SINGLE,
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
      const nextValues = values.includes(value)
        ? values.filter((item) => item !== value)
        : [...values, value];

      return { ...current, [field]: nextValues };
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
      <div className="grid gap-x-8 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
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

        <div className="md:col-span-2 lg:col-span-1">
          <RecommendationType
            value={formData.selectedRecommendationType}
            onChange={changeRecommendationType}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">
        <SubmitButton text="Obter recomendação" />
        <button
          type="button"
          onClick={resetForm}
          disabled={!hasSelection}
          className="w-full rounded-xl border border-slate-300 px-5 py-2.5 font-semibold text-slate-600 transition-all duration-300 hover:bg-slate-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100 sm:w-auto"
        >
          Limpar
        </button>
      </div>
    </form>
  );
}

export default Form;
