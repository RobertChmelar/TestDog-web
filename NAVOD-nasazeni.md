# Jak dostat web TestDog.app online (zdarma přes GitHub Pages)

Tahle složka `web/` je hotová stránka. Stačí ji nahrát na GitHub a propojit s doménou.
Postupuj podle kroků — pokud chceš, příkazy ti pustím já, jen řekni.

---

## Část A — Nahrání na GitHub (zdarma hosting)

1. Na webu **github.com** vytvoř nový repozitář, např. `testdog-web` (může být veřejný).
2. Nahraj do něj **obsah složky `web/`** (soubory `index.html`, `dog.png`, `favicon.png`,
   `CNAME`, `.nojekyll`) — buď přetažením přes web GitHubu, nebo příkazy v terminálu.
3. V repozitáři jdi do **Settings → Pages**.
4. U položky **Source** vyber `Deploy from a branch`, branch `main`, složka `/ (root)`,
   a dej **Save**.
5. Za chvíli (1–2 min) bude web živý. GitHub ti nahoře ukáže adresu typu
   `https://tvuc-jmeno.github.io/testdog-web/` — zkontroluj, že se stránka načte.

> Soubor `CNAME` (obsahuje `testdog.app`) a `.nojekyll` už jsou připravené — neměň je.

---

## Část B — Napojení domény TestDog.app (Forpsi)

Doménu máš u Forpsi, web bude na GitHubu. Propojí se přes DNS záznamy.

1. Přihlas se do **administrace Forpsi** → správa domény **testdog.app** → **DNS záznamy**.
2. Nastav tyto záznamy (smaž staré A/CNAME, které tam případně míří jinam):

   **Pro hlavní doménu `testdog.app` — čtyři A záznamy:**

   | Typ | Název / Host | Hodnota (IP) |
   |-----|--------------|--------------|
   | A   | @ (prázdné)  | 185.199.108.153 |
   | A   | @ (prázdné)  | 185.199.109.153 |
   | A   | @ (prázdné)  | 185.199.110.153 |
   | A   | @ (prázdné)  | 185.199.111.153 |

   **Pro `www.testdog.app` — jeden CNAME:**

   | Typ   | Název / Host | Hodnota |
   |-------|--------------|---------|
   | CNAME | www          | tvuc-jmeno.github.io. |

   (`tvuc-jmeno` = tvé GitHub uživatelské jméno; tečka na konci je v pořádku.)

3. Ulož. DNS se propisuje obvykle do pár hodin (max 24 h).
4. Zpět na GitHubu v **Settings → Pages** do políčka **Custom domain** napiš `testdog.app`
   a dej **Save**. Až ověření proběhne, zaškrtni **Enforce HTTPS** (zabezpečené https).

Hotovo — web pojede na **https://testdog.app**. 🐾

---

## Úprava textů později
Vše je v jednom souboru `index.html`. Texty se dají měnit přímo v něm; barvy jsou
nahoře v sekci `:root` (stejná paleta jako aplikace). Po úpravě soubor znovu nahraj na GitHub.

## Alternativy k GitHub Pages (taky zdarma)
- **Cloudflare Pages** nebo **Netlify** — přetáhneš složku `web/` na web služby a hotovo.
  Doména se napojuje obdobně. GitHub Pages je ale nejjednodušší, když nechceš další účty.

---

## Část C — Zprovoznění formuláře „Dejte mi vědět“

Web je statický (nemá vlastní server), takže odesílání e-mailů zajišťuje bezplatná
služba **Web3Forms**. Cílový e-mail přitom **není nikde vidět** ve zdroji stránky —
v kódu je jen „přístupový klíč“, samotná e-mailová adresa je schovaná na straně
Web3Forms.

**Přístupový klíč už je v `index.html` vložený.** Zbývá jen zařídit, aby zprávy chodily
na **info@testdog.app**.

### Důležité: kam formulář doručuje
U Web3Forms se **cílový e-mail nenastavuje v kódu** (to kvůli ochraně proti zneužití
nejde — jinak by kdokoli mohl přesměrovat zprávy kamkoli). Příjemce je navázaný přímo
na přístupový klíč. Adresu `info@testdog.app` proto nastav jedním z těchto způsobů:

- **A) V dashboardu Web3Forms** (nejjednodušší): přihlas se na **web3forms.com**,
  otevři tento formulář (klíč `fa2aac92-…`) a v jeho nastavení změň cílovou
  e-mailovou adresu na `info@testdog.app`. Klíč v `index.html` zůstává stejný.
- **B) Nový klíč:** vygeneruj nový přístupový klíč přímo na adresu `info@testdog.app`
  a vyměň ho v `index.html` na řádku
  `<input type="hidden" name="access_key" value="...">`.

> ⚠️ **Schránka musí existovat.** `info@testdog.app` musí být funkční e-mail
> (založený nebo přesměrovaný u Forpsi), jinak se zprávy nedoručí. Dokud schránku
> nezaložíš, nech jako cíl funkční adresu (např. svou osobní).

> Web3Forms má ve verzi zdarma 250 odeslání měsíčně, což na sběr zájemců bohatě stačí.
