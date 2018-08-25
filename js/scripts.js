// Alert notifications
const alertBox = document.querySelectorAll('.alert');
const notificationBell = document.querySelector('.bell-container');
const row = document.querySelector('.row');
const traffic = document.querySelector('.traffic');
let isNew = true;
// Message user widget
const message = document.querySelector('.user-message');
const submit = document.querySelector('#message-user');
const userInput = document.querySelector('.user-search');

// Toggle mobile nav menu
function toggleNav(){
    const mainNav = document.querySelector('.main-nav');
    mainNav.classList.toggle('show');
    const mobileNav = document.querySelector('.mobile-nav');
    mobileNav.classList.toggle('open');
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


notificationBell.addEventListener('click', function(){
  const newAlerts = document.querySelector('.new');

  // Make sure to run this only if the green new icon is showing
  if ( isNew ) {
    // Display the user's alerts
    createAlert('Victoria accepted your friend request.', 'NEW');
    createAlert('Dale sent you a friend request.', 'REVIEW');
    // Remove the new status from the notificationBell
    newAlerts.style.display = 'none';
    // Change value to false so that user click multiple times
    isNew = false;
  }


});

// Message User Widget:
// =====================
// DISPLAY ERROR MESSAGES
// =====================
 submit.addEventListener('click', function(e){
    // prevent page from reloading
    e.preventDefault();
    // 1. check if user is selected
    // 2. make sure message field is not empty
    if (userInput.value === '') {
      alert('Please select the user you want to message.');
    } else if (message.value === '') {
      alert('Please enter a message');
    } else {
      // SUCCESS:
      // 1. Save form values
      const storeMsg = {
        username: userInput.value,
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
        userInput.value = '';
        message.value = '';
        // Display a new contact form
        contactForm.style.display = 'block';
        // Remove thanks message and new button
        thanks.style.display = 'none';
        newBtn.style.display = 'none';
        // Reset the unordered list container
        const suggestList = document.createElement('UL');
        suggestList.classList.add('suggest');
        searchContainer.appendChild(suggestList);

      });
    }
 });


// ==============================
// SAVE SETTINGS TO LOCAL STORAGE
// ==============================
const form = document.querySelector('.profile-settings');
const emailSettings = document.getElementById('email-settings');
const profileSettings = document.getElementById('profile-status');
const timezone = document.querySelector('.timezone');
// Persist the state of the settings in the HTML on page load
const loadSettings = JSON.parse(localStorage.getItem('settings')) || {email: false, profile: false, timezone: ''};
const searchContainer = document.querySelector('.search-container');


function saveSettings(e){
    e.preventDefault();

    const email = emailSettings.checked;
    const profile = profileSettings.checked;
    const time = timezone.value;
    const userSettings = {
      email: email,
      profile: profile,
      timezone: time
    };
    // console.log(userSettings);

    // Save to local Storage
    localStorage.setItem('settings', JSON.stringify(userSettings));

    // TODO: Display changes to user
    newSession(userSettings);

}

function newSession(settings){
  for (var key in settings) {
  const tzOptions = timezone.children;

    if (key === 'email' && settings[key] === true) {
      emailSettings.setAttribute('checked', settings[key]);
    } else if (key === 'profile' && settings[key] === true) {
      profileSettings.setAttribute('checked', settings[key]);
    } else if (key === 'timezone') {
      // Get current timezone
      const currentTz = settings.timezone;

      if (currentTz !== '') {
        // Remove selected from the default option
        timezone.firstElementChild.removeAttribute('selected');

        // Add selected to the current option
        for (let i = 1; i < tzOptions.length; i++) {
            if ( currentTz === tzOptions[i].value ) {
              tzOptions[i].setAttribute('selected', '');
            } else {
              tzOptions[i].removeAttribute('selected');
            }
        }

      } else {
        // Remove selected from all timezones
        for (let i = 0; i < tzOptions.length; i++) {
            if ( currentTz !== tzOptions[i].value ) {
              tzOptions[i].removeAttribute('selected');
            } else {
              tzOptions[i].setAttribute('selected', '');
            }
        }

      }
    }
  }
}

function clearSettings(){
  // Fix 'cancel' reset button to clear settings in local storage and visually to user
    const clearSettings = {
      email: false,
      profile: false,
      timezone: ''
    };

    // save to local STORAGE
    localStorage.setItem('settings', JSON.stringify(clearSettings));

    // update the DOM
    for (var key in clearSettings) {
      if (key === 'email') {
        emailSettings.removeAttribute('checked');
      } else if (key === 'profile') {
        profileSettings.removeAttribute('checked');
      } else if (key === 'timezone') {
        timezone.firstElementChild.setAttribute('selected', '');
        for (let i = 1; i < timezone.children.length; i++) {
          timezone.children[i].removeAttribute('selected');
        }
      }
    }
 }

form.addEventListener('submit', saveSettings);
form.addEventListener('reset', clearSettings);

// Load page
newSession(loadSettings);
