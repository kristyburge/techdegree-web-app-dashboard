// Alert notifications
const close = document.querySelectorAll('.close');
const alertBox = document.querySelectorAll('.alert');
const notificationBell = document.querySelector('.bell-container');
const row = document.querySelector('.row');
const traffic = document.querySelector('.traffic');
let isNew = true;
// Message user widget
const message = document.querySelector('.user-message');
const submit = document.querySelector('#message-user');
const userInput = document.querySelector('.user-search');
const suggest = document.querySelector('.suggest');

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
      });
    }
 });

 // ===================
 // SEARCH USERS
 // ===================
// const endpoint = 'https://uinames.com/api/?region=united%20states&amount=50';
const users = [
  {
    first: 'Victoria',
    last: 'Chambers'
  },
  {
    first: 'Dale',
    last: 'Byrd'
  },
  {
    first: 'Dawn',
    last: 'Wood'
  },
  {
    first: 'Dan',
    last: 'Oliver'
  }
];

// fetch(endpoint)
//   .then(blob => blob.json())
//   .then(data => users.push(...data));

function findMatches(userToMatch, users) {
  return users.filter(person => {
    const regex = new RegExp(userToMatch, 'gi');
    return person.first.match(regex) || person.last.match(regex);
  });
}

function displayMatches(){
  // Get the data
  const matchArray = findMatches(this.value, users)

  // Loop over the data
  const html = matchArray.map(user => {
    return `
      <li class="suggest-member">${user.first} ${user.last}<input type="hidden" value="${user.first} ${user.last}">
      </li>
    `;
  }).join('');

  // Append the suggestions to the html
  suggest.innerHTML = html;

  // Save the array of suggested members
  const suggestions = document.querySelectorAll('.suggest-member');

  // Loop through the suggestions and listen for click event
  suggestions.forEach(function(suggestion){
    suggestion.addEventListener('click', function(){
      // Save the value of the click and use in the input
      const save = suggestion.firstElementChild.value;
      userInput.value = save;

      // Toggle the active class on click
      suggestion.classList.toggle('item-active');
    });
  });
}


// TODO: Remove the other list items when one is selected.

// TODO: Open the list if user starts to type again.



// listen for keyup and change events to display user matches
userInput.addEventListener('keyup', displayMatches);
userInput.addEventListener('change', displayMatches);


// ==============================
// SAVE SETTINGS TO LOCAL STORAGE
// ==============================
const form = document.querySelector('.profile-settings');
const emailSettings = document.getElementById('email-settings');
const profileSettings = document.getElementById('profile-status');
const timezone = document.querySelector('.timezone');
// Persist the state of the settings in the HTML on page load
const userSettings = JSON.parse(localStorage.getItem('settings')) || {email: false, profile: false, timezone: ''};

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
    console.log(userSettings);

    // Save to local Storage
    localStorage.setItem('settings', JSON.stringify(userSettings));
  }

function newSession(){
  for (var key in userSettings) {
    if (key === 'email' && userSettings[key] === true) {
      emailSettings.setAttribute('checked', userSettings[key]);
    } else if (key === 'profile' && userSettings[key] === true) {
      profileSettings.setAttribute('checked', userSettings[key]);
    } else if (key === 'timezone') {
      if (userSettings.timezone !== '') {
        // Remove selected attribute from the "Select your timezone" option
        const firstEl = document.querySelector('select');
        firstEl.firstElementChild.removeAttribute('selected');
        // Add selected attribute to the correct timezone
        // TODO: Loop through??
        const options = document.querySelectorAll('option');
        for (let i = 0; i < options.length; i++) {
          if (options[i].value === userSettings.timezone) {
            options[i].setAttribute('selected', '');
          }
        }
      }
    }
  }
}

newSession();
// TODO: Why doesn't the reset button work once the page is reloaded? Set up a condition.

form.addEventListener('submit', saveSettings);
