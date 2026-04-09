window.addEventListener('load', () => {
    const shutter = document.getElementById('shutter-container');
  
    setTimeout(() => {
        shutter.classList.add('open');
    }, 500);
});