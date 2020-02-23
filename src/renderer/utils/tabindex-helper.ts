export const goToNextTabbedElement = () => {
  var elements = document.getElementsByClassName("tabbed-index");
  var focused = false;
  for (var i = 0; i < elements.length; i++) {
    if (document.activeElement.id == elements[i].id) {
      if(i + 1 < elements.length ) {
        (elements[i + 1] as HTMLElement).focus();
      } else {
        (elements[0] as HTMLElement).focus();
      }
      focused = true;
      break;
    }
  }
  if(!focused) {
    (elements[0] as HTMLElement).focus();
  }
}

export const goToPreviousTabbedElement = () => {
  var elements = document.getElementsByClassName("tabbed-index");
  var focused = false;
  for (var i = 0; i < elements.length; i++) {
    if (document.activeElement.id == elements[i].id) {
      if(i > 0 ) {
        (elements[i - 1] as HTMLElement).focus();
      } else {
        (elements[elements.length - 1] as HTMLElement).focus();
      }
      focused = true;
      break;
    }
  }
  if(!focused) {
    (elements[0] as HTMLElement).focus();
  }
}

export const simulateClickOnActiveElement = () => {
  var active = document.activeElement;
  if(active) {
    (active as HTMLElement).click();
  }
}