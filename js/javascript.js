(function(){
  var target, dx, dy;
  var windows = document.getElementsByClassName("window");
  var maxZIndex = 1;

  function bringWindowToFront(window) {
    maxZIndex++;
    window.style.zIndex = maxZIndex;
  }

  for(var i = 0; i < windows.length; i++){
    windows[i].style.display = "block";
    windows[i].style.position = "absolute";
    windows[i].style.cursor = "pointer";
    windows[i].ondragstart = function(e){e.preventDefault();};
    windows[i].addEventListener('mousedown', mousedownHandler);
  }

  var toggles = document.querySelectorAll('summary');
  for (var i = 0; i < toggles.length; i++) {
    toggles[i].addEventListener('click', toggleClickHandler);
  }

  function toggleClickHandler(e) {
    var windowAncestor = findWindowAncestor(this);
    if (windowAncestor) {
      bringWindowToFront(windowAncestor);
    }
  }

  function mousedownHandler(e) {
    dx = e.clientX - parseInt(window.getComputedStyle(this).left); 
    dy = e.clientY - parseInt(window.getComputedStyle(this).top); 
    target = this;
  
    bringWindowToFront(target);
    target.style.zIndex = maxZIndex;
   
    window.addEventListener('mousemove', mousemoveHandler);
    window.addEventListener('mouseup', mouseupHandler);

    e.preventDefault();
  }

  function mousemoveHandler(e) {
    if(target){ 
      target.style.left = (e.clientX - dx) + "px";
      target.style.top = (e.clientY - dy) + "px";
    }
  }

  function mouseupHandler() { 
    window.removeEventListener('mousemove', mousemoveHandler);
    window.removeEventListener('mouseup', mouseupHandler);
  }

  function findWindowAncestor(element) {
    while (element) {
      if (element.classList.contains('window')) {
        return element;
      }
      element = element.parentElement;
    }
    return null;
  }

})();
