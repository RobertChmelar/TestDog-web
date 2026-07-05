/* Sdílené chování obsahových stránek TestDog: hamburger menu + kontaktní okno (CZ/EN) */
(function () {
  var EN = (document.documentElement.lang || 'cs').toLowerCase().indexOf('en') === 0;
  var T = EN ? {
    write: 'Write to us',
    sub: 'A question, idea, or anything about TestDog? We\'ll get back to you soon.',
    name: 'Name (optional)', email: 'Your email', msg: 'Your message', send: '✉️ Send',
    note: 'We\'ll only use your email to reply. No spam.',
    subject: 'TestDog — contact form message (EN)',
    sending: 'Sending…', ok: 'Thanks! 🐾 We\'ll get back to you soon.',
    err: 'Something went wrong, please try again in a moment.'
  } : {
    write: 'Napiš nám',
    sub: 'Dotaz, nápad nebo cokoli k TestDog? Ozveme se co nejdřív.',
    name: 'Jméno (nepovinné)', email: 'Tvůj e-mail', msg: 'Tvá zpráva', send: '✉️ Odeslat',
    note: 'Tvůj e-mail použijeme jen k odpovědi. Žádný spam.',
    subject: 'TestDog – zpráva z kontaktního formuláře',
    sending: 'Odesílám…', ok: 'Díky! 🐾 Ozveme se co nejdřív.',
    err: 'Něco se nepovedlo, zkus to prosím za chvíli znovu.'
  };

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

  // Přepínač jazyka (dropdown)
  document.querySelectorAll('.langsel').forEach(function (ls) {
    var b = ls.querySelector('.langsel-btn');
    if (!b) return;
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var o = ls.classList.toggle('open');
      b.setAttribute('aria-expanded', o);
    });
  });
  document.addEventListener('click', function () {
    document.querySelectorAll('.langsel.open').forEach(function (ls) {
      ls.classList.remove('open');
      var b = ls.querySelector('.langsel-btn'); if (b) b.setAttribute('aria-expanded', 'false');
    });
  });

  // Kontaktní okno – vytvoříme dynamicky, v jazyce stránky
  function esc(s){return s.replace(/"/g,'&quot;');}
  var modal = document.createElement('dialog');
  modal.className = 'modal';
  modal.id = 'contactModal';
  modal.innerHTML =
    '<div class="modal-inner">' +
    '<button class="modal-close" data-close aria-label="Close">×</button>' +
    '<h3>' + T.write + '</h3>' +
    '<p class="modal-sub">' + T.sub + '</p>' +
    '<form class="signup contact-form" action="https://api.web3forms.com/submit" method="POST">' +
    '<input type="hidden" name="access_key" value="fa2aac92-5e60-4228-835e-0d7c5a8ae578">' +
    '<input type="hidden" name="subject" value="' + esc(T.subject) + '">' +
    '<input type="hidden" name="from_name" value="TestDog web">' +
    '<input type="checkbox" name="botcheck" class="hp" tabindex="-1" autocomplete="off">' +
    '<div class="field-row">' +
    '<input type="text" name="name" placeholder="' + esc(T.name) + '" autocomplete="name">' +
    '<input type="email" name="email" placeholder="' + esc(T.email) + '" required autocomplete="email">' +
    '</div>' +
    '<textarea name="message" placeholder="' + esc(T.msg) + '" required></textarea>' +
    '<button type="submit" class="btn-amber">' + T.send + '</button>' +
    '<p class="form-note">' + T.note + '</p>' +
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
    var btn = form.querySelector('button'); var orig = btn.textContent;
    btn.textContent = T.sending; btn.disabled = true;
    try {
      var res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } });
      if (res.ok) { form.innerHTML = '<p class="form-ok">' + T.ok + '</p>'; }
      else { throw new Error(); }
    } catch (_) {
      btn.textContent = orig; btn.disabled = false;
      alert(T.err);
    }
  });
})();
