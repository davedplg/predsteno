    fetch('../menu.html')
      .then(r => r.text())
      .then(html => {
        document.getElementById('menu-container').innerHTML = html;
      });
