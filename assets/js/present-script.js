document.addEventListener('DOMContentLoaded', function() {
    var scrollButton = document.querySelector('.scroll');
    var container = document.querySelector('.full-screen-container');
  
    scrollButton.addEventListener('click', function() {
      var nextDiv = container.querySelector('.item:not(.scrolled)');
      if (nextDiv) {
        nextDiv.classList.add('scrolled');
        window.scrollBy(0, nextDiv.getBoundingClientRect().height); // obtener la altura del div
      }
    });
  });
  