/* Sdílené chování obsahových stránek TestDog: hamburger menu + kontaktní okno (CZ/EN/DE/ES/PL/SK) */
(function () {
  var LANGS = {
    en: {
      write: 'Write to us',
      sub: 'A question, idea, or anything about TestDog? We\'ll get back to you soon.',
      name: 'Name (optional)', email: 'Your email', msg: 'Your message', send: '✉️ Send',
      note: 'We\'ll only use your email to reply. No spam.',
      subject: 'TestDog — contact form message (EN)',
      sending: 'Sending…', ok: 'Thanks! 🐾 We\'ll get back to you soon.',
      err: 'Something went wrong, please try again in a moment.'
    },
    de: {
      write: 'Schreib uns',
      sub: 'Eine Frage, eine Idee oder etwas zu TestDog? Wir melden uns bald.',
      name: 'Name (optional)', email: 'Deine E-Mail', msg: 'Deine Nachricht', send: '✉️ Senden',
      note: 'Wir nutzen deine E-Mail nur für die Antwort. Kein Spam.',
      subject: 'TestDog — contact form message (DE)',
      sending: 'Wird gesendet…', ok: 'Danke! 🐾 Wir melden uns bald.',
      err: 'Etwas ist schiefgegangen, bitte versuch es gleich noch einmal.'
    },
    es: {
      write: 'Escríbenos',
      sub: '¿Una pregunta, una idea o cualquier cosa sobre TestDog? Te responderemos pronto.',
      name: 'Nombre (opcional)', email: 'Tu correo electrónico', msg: 'Tu mensaje', send: '✉️ Enviar',
      note: 'Solo usaremos tu correo para responderte. Nada de spam.',
      subject: 'TestDog — contact form message (ES)',
      sending: 'Enviando…', ok: '¡Gracias! 🐾 Te responderemos pronto.',
      err: 'Algo ha salido mal; inténtalo de nuevo en un momento.'
    },
    pl: {
      write: 'Napisz do nas',
      sub: 'Pytanie, pomysł albo cokolwiek w sprawie TestDog? Odezwiemy się wkrótce.',
      name: 'Imię (opcjonalnie)', email: 'Twój e-mail', msg: 'Twoja wiadomość', send: '✉️ Wyślij',
      note: 'Twojego e-maila użyjemy tylko do odpowiedzi. Zero spamu.',
      subject: 'TestDog — contact form message (PL)',
      sending: 'Wysyłanie…', ok: 'Dzięki! 🐾 Odezwiemy się wkrótce.',
      err: 'Coś poszło nie tak, spróbuj proszę za chwilę.'
    },
    sk: {
      write: 'Napíš nám',
      sub: 'Otázka, nápad alebo čokoľvek k TestDogu? Ozveme sa čo najskôr.',
      name: 'Meno (nepovinné)', email: 'Tvoj e-mail', msg: 'Tvoja správa', send: '✉️ Odoslať',
      note: 'Tvoj e-mail použijeme len na odpoveď. Žiadny spam.',
      subject: 'TestDog — contact form message (SK)',
      sending: 'Odosielam…', ok: 'Vďaka! 🐾 Ozveme sa čo najskôr.',
      err: 'Niečo sa nepodarilo, skús to prosím o chvíľu znova.'
    },
    cs: {
      write: 'Napiš nám',
      sub: 'Dotaz, nápad nebo cokoli k TestDog? Ozveme se co nejdřív.',
      name: 'Jméno (nepovinné)', email: 'Tvůj e-mail', msg: 'Tvá zpráva', send: '✉️ Odeslat',
      note: 'Tvůj e-mail použijeme jen k odpovědi. Žádný spam.',
      subject: 'TestDog – zpráva z kontaktního formuláře',
      sending: 'Odesílám…', ok: 'Díky! 🐾 Ozveme se co nejdřív.',
      err: 'Něco se nepovedlo, zkus to prosím za chvíli znovu.'
    },
    fr: {
      write: 'Écris-nous',
      sub: 'Une question, une idée ou autre chose sur TestDog ? On te répond vite.',
      name: 'Nom (facultatif)', email: 'Ton e-mail', msg: 'Ton message', send: '✉️ Envoyer',
      note: 'On utilisera ton e-mail uniquement pour te répondre. Pas de spam.',
      subject: 'TestDog — contact form message (FR)',
      sending: 'Envoi…', ok: 'Merci ! 🐾 On te répond très vite.',
      err: 'Une erreur est survenue, réessaie dans un instant.'
    },
    pt: {
      write: 'Fale com a gente',
      sub: 'Uma dúvida, ideia ou qualquer coisa sobre o TestDog? A gente responde logo.',
      name: 'Nome (opcional)', email: 'Seu e-mail', msg: 'Sua mensagem', send: '✉️ Enviar',
      note: 'Usaremos seu e-mail só para responder. Sem spam.',
      subject: 'TestDog — contact form message (PT)',
      sending: 'Enviando…', ok: 'Obrigado! 🐾 A gente responde logo.',
      err: 'Algo deu errado, tente de novo em instantes.'
    },
    it: {
      write: 'Scrivici',
      sub: 'Una domanda, un’idea o qualcosa su TestDog? Ti rispondiamo presto.',
      name: 'Nome (facoltativo)', email: 'La tua e-mail', msg: 'Il tuo messaggio', send: '✉️ Invia',
      note: 'Useremo la tua e-mail solo per risponderti. Niente spam.',
      subject: 'TestDog — contact form message (IT)',
      sending: 'Invio…', ok: 'Grazie! 🐾 Ti rispondiamo presto.',
      err: 'Qualcosa è andato storto, riprova tra un momento.'
    },
    nl: {
      write: 'Schrijf ons',
      sub: 'Een vraag, idee of iets anders over TestDog? We reageren snel.',
      name: 'Naam (optioneel)', email: 'Je e-mail', msg: 'Je bericht', send: '✉️ Versturen',
      note: 'We gebruiken je e-mail alleen om te antwoorden. Geen spam.',
      subject: 'TestDog — contact form message (NL)',
      sending: 'Versturen…', ok: 'Bedankt! 🐾 We reageren snel.',
      err: 'Er ging iets mis, probeer het zo meteen opnieuw.'
    },
    sv: {
      write: 'Skriv till oss',
      sub: 'En fråga, idé eller något annat om TestDog? Vi svarar snart.',
      name: 'Namn (valfritt)', email: 'Din e-post', msg: 'Ditt meddelande', send: '✉️ Skicka',
      note: 'Vi använder din e-post bara för att svara. Ingen spam.',
      subject: 'TestDog — contact form message (SV)',
      sending: 'Skickar…', ok: 'Tack! 🐾 Vi svarar snart.',
      err: 'Något gick fel, försök igen om en stund.'
    }
  };
  var lang = (document.documentElement.lang || 'cs').toLowerCase().slice(0, 2);
  var T = LANGS[lang] || LANGS.cs;

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
