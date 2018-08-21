const close = document.querySelectorAll('.close');
const alertBox = document.querySelectorAll('.alert');
const notificationBell = document.querySelector('.bell-container');
const row = document.querySelector('.row');
const traffic = document.querySelector('.traffic');

// Close the alert box
row.addEventListener('click', function(e){
    alertBox.forEach(function(){
      const currentAlert = e.target.parentNode.parentNode;
      const paragraph = e.target.parentNode;
      if (currentAlert.classList.contains('alert')) {
        currentAlert.classList.add('closeAlert');
        paragraph.style.display = 'none';
        paragraph.style.padding = 0;
        paragraph.style.margin = 0;
      }

    });
});

function toggleNav(){
    const mainNav = document.querySelector('.main-nav');
    mainNav.classList.toggle('show');
}

// Helper function to create notification alerts
function createAlert(msg, type){
  const alertDiv = document.createElement('div');
  alertDiv.classList.add('alert');
  const paragraph = document.createElement('p');
  paragraph.classList.add('alert__msg');
  const message = `<span>${type}</span> ${msg} <span class="close">&times;</span>`;
  paragraph.innerHTML = message;
  alertDiv.appendChild(paragraph);
  // Insert before the .traffic chart
  const dashboard = document.querySelector('.row');
  dashboard.insertBefore(alertDiv, traffic);
}

notificationBell.addEventListener('click', function(){
  // Display the user's alerts
  createAlert('Victoria accepted your friend request.', 'NEW');
  createAlert('Dale sent you a friend request.', 'REVIEW');
});

// Message User Widget:
// Display error messages
// ==========================
 const user = document.querySelector('.user-search');
 const message = document.querySelector('.user-message');
 const submit = document.querySelector('#message-user');
 submit.addEventListener('click', function(e){
    // prevent page from reloading
    e.preventDefault();
    // 1. check if user is selected
    // 2. make sure message field is not empty
    if (user.value === '') {
      alert('Please select the user you want to message.');
    } else if (message.value === '') {
      alert('Please enter a message');
    } else {
      // SUCCESS:
      // 1. Save form values
      const storeMsg = {
        username: user.value,
        msg: message.value
      };

      // 2. Hide the form and display a thank you message
      const contactDiv = document.querySelector('.contact');
      const contactForm = document.querySelector('.contact-form');
      const thanks = document.createElement('p');
      const newBtn = document.createElement('button');

      contactForm.style.display = 'none';
      thanks.innerHTML = `Your message to ${storeMsg.username} has been sent!`;
      newBtn.classList.add('btn');
      newBtn.classList.add('btn--default');
      newBtn.innerHTML = 'Send another message?';

      // Append to the DOM
      contactDiv.appendChild(thanks);
      contactDiv.appendChild(newBtn);

      // Give user the option to send another message.
      newBtn.addEventListener('click', function(){
        // Clear form
        user.value = '';
        message.value = '';
        // Display a new contact form
        contactForm.style.display = 'block';
        // Remove thanks message and new button
        thanks.style.display = 'none';
        newBtn.style.display = 'none';
      });
    }
 });
