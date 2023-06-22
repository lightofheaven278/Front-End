function isPrime(num) {
    if (num <= 1) {
      return false;
    }
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }
  
  function createDiv(content) {
    const div = document.createElement('div');
    div.textContent = content;
    div.style.width = '70px';
    div.style.height = '70px';
    div.style.display = 'flex';
    div.style.justifyContent = 'center';
    div.style.alignItems = 'center';
    // div.style.boxShadow = ' 0px 0px 10px rgba(0,0,0.5)';
    div.style.border = 'none';
    div.style.borderRadius = '5px';
    div.style.fontSize = '20px';
    div.style.backgroundColor = getBackgroundColor(content);
  
    function getBackgroundColor(content) {
      if (isPrime(content)) {
        return 'red';
      }
      if (content % 2 === 0) {
        return 'yellow';
      }
      return 'lightgreen';
    }
    return div;
  }
  
  function addDivToBody() {
    const body = document.querySelector('body');
    const container = document.createElement('div');
    container.classList.add('container');
    body.appendChild(container);
  
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    container.style.gap = '20px';
    // container.style.justifyContent = 'center';
    for (let i = 1; i <= 100; i++) {
      const div = createDiv(i);
      container.appendChild(div);
    }
  }
  
  document.addEventListener('DOMContentLoaded', addDivToBody);