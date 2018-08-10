const close = document.querySelector('.close');
const alertBox = document.querySelector('.alert');

close.addEventListener('click', function(){
    alertBox.classList.add('closeAlert');
});
