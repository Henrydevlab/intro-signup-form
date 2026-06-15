document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');

  // Input fields mapping
  const fields = [
    { id: 'firstName', name: 'First Name', type: 'text' },
    { id: 'lastName', name: 'Last Name', type: 'text' },
    { id: 'email', name: 'Email Address', type: 'email' },
    { id: 'password', name: 'Password', type: 'text' }
  ];

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isFormValid = true;

    fields.forEach((fieldData) => {
      const inputElement = document.getElementById(fieldData.id);
      const fieldWrapper = inputElement.parentElement;
      const errorMessageElement = document.getElementById(`${fieldData.id}-error`);
      const value = inputElement.value.trim();

      let errorMessage = '';

      // Check for completely empty values
      if (value === '') {
        errorMessage = `${fieldData.name} cannot be empty`;
        isFormValid = false;
      } 
      // Specific check for valid email formatting layout pattern
      else if (fieldData.type === 'email' && !isValidEmail(value)) {
        errorMessage = 'Looks like this is not an email';
        isFormValid = false;
      }

      // Render evaluation changes to the interface
      if (errorMessage) {
        fieldWrapper.classList.add('signup-form__field--error');
        errorMessageElement.textContent = errorMessage;
        inputElement.setAttribute('aria-invalid', 'true');
        inputElement.setAttribute('aria-describedby', `${fieldData.id}-error`);
      } else {
        fieldWrapper.classList.remove('signup-form__field--error');
        errorMessageElement.textContent = '';
        inputElement.removeAttribute('aria-invalid');
        inputElement.removeAttribute('aria-describedby');
      }
    });

    if (isFormValid) {
      alert('Registration successful! Your 7-day free trial is on the way.');
      form.reset();
    }
  });

  /**
   * Evaluates input email formatting utilizing native TLD string patterns
   * @param {string} email 
   * @return {boolean}
   */
  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
});
