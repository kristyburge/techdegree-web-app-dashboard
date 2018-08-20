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
