/* Sdílené chování obsahových stránek TestDog: hamburger menu + kontaktní okno */
(function () {
  // aktuální rok
  document.querySelectorAll('.rok').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Hamburger menu (mobil)
  var tog = document.querySelector('.nav-toggle');
  var links = document.getElementById('navLinks');
  if (tog && links) {
    tog.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      tog.setAttribute('aria-expanded', open);
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        tog.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Kontaktní okno (stejné jako na hlavní stránce) – vytvoříme dynamicky
  var modal = document.createElement('dialog');
  modal.className = 'modal';
  modal.id = 'contactModal';
  modal.innerHTML =
    '<div class="modal-inner">' +
    '<button class="modal-close" data-close aria-label="Zavřít">×</button>' +
    '<h3>Napiš nám</h3>' +
    '<p class="modal-sub">Dotaz, nápad nebo cokoli k TestDog? Ozveme se co nejdřív.</p>' +
    '<form class="signup contact-form" action="https://api.web3forms.com/submit" method="POST">' +
    '<input type="hidden" name="access_key" value="fa2aac92-5e60-4228-835e-0d7c5a8ae578">' +
    '<input type="hidden" name="subject" value="TestDog – zpráva z kontaktního formuláře">' +
    '<input type="hidden" name="from_name" value="TestDog web">' +
    '<input type="checkbox" name="botcheck" class="hp" tabindex="-1" autocomplete="off">' +
    '<div class="field-row">' +
    '<input type="text" name="jmeno" placeholder="Jméno (nepovinné)" autocomplete="name">' +
    '<input type="email" name="email" placeholder="Tvůj e-mail" required autocomplete="email">' +
    '</div>' +
    '<textarea name="zprava" placeholder="Tvá zpráva" required></textarea>' +
    '<button type="submit" class="btn-amber">✉️ Odeslat</button>' +
    '<p class="form-note">Tvůj e-mail použijeme jen k odpovědi. Žádný spam.</p>' +
    '</form></div>';
  document.body.appendChild(modal);

  document.querySelectorAll('.contact-link').forEach(function (l) {
    l.addEventListener('click', function (e) { e.preventDefault(); modal.showModal(); });
  });
  modal.querySelectorAll('[data-close]').forEach(function (b) {
    b.addEventListener('click', function () { modal.close(); });
  });
  modal.addEventListener('click', function (e) { if (e.target === modal) modal.close(); });

  var form = modal.querySelector('.contact-form');
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var btn = form.querySelector('button');
    var orig = btn.textContent;
    btn.textContent = 'Odesílám…';
    btn.disabled = true;
    try {
      var res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } });
      if (res.ok) { form.innerHTML = '<p class="form-ok">Díky! 🐾 Ozveme se co nejdřív.</p>'; }
      else { throw new Error(); }
    } catch (_) {
      btn.textContent = orig; btn.disabled = false;
      alert('Něco se nepovedlo, zkus to prosím za chvíli znovu.');
    }
  });
})();
