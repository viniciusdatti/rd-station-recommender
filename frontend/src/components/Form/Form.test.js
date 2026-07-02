import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';

const preferences = ['Integração fácil com ferramentas de e-mail', 'Automação de marketing'];
const features = ['Gestão de leads e oportunidades'];

describe('Form (presentational)', () => {
  test('renders the provided preference and feature options', () => {
    render(<Form preferences={preferences} features={features} onSubmit={jest.fn()} />);

    expect(screen.getByLabelText(preferences[0])).toBeInTheDocument();
    expect(screen.getByLabelText(features[0])).toBeInTheDocument();
  });

  test('submits the clean selection through onSubmit', () => {
    const onSubmit = jest.fn();
    render(<Form preferences={preferences} features={features} onSubmit={onSubmit} />);

    fireEvent.click(screen.getByLabelText(preferences[1]));
    fireEvent.click(screen.getByLabelText(features[0]));
    fireEvent.click(screen.getByLabelText('Múltiplos produtos'));
    fireEvent.click(screen.getByRole('button', { name: /obter recomendação/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      selectedPreferences: [preferences[1]],
      selectedFeatures: [features[0]],
      selectedRecommendationType: 'MultipleProducts',
    });
  });
});
