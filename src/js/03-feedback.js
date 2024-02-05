import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
feedbackForm.addEventListener(
  'input',
  throttle(() => {
    const savedForm = JSON.stringify({
      email: feedbackForm.elements.email.value,
      message: feedbackForm.elements.message.value,
    });

    localStorage.setItem('feedback-form-state', savedForm);
  }, 500)
);

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.length !== 0) {
    try {
      const loadedForm = localStorage.getItem('feedback-form-state');
      const loadedFormParsed = JSON.parse(loadedForm);
      feedbackForm.elements.email.value = loadedFormParsed.email ?? '';
      feedbackForm.elements.message.value = loadedFormParsed.message ?? '';
    } catch (error) {
      console.log(error.message);
    }
  }
});

feedbackForm.addEventListener('submit', event => {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;

if (email.value === '' || message.value === '') {
  alert("Fill in all the fields, please.")
  return; 
} 
  const newSubmit = { email: email.value, message: message.value };
  console.log('Your data :', newSubmit);
  email.value = '';
  message.value = '';
  feedbackForm.reset()
});
