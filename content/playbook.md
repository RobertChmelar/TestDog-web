# TestDog – SEO obsahový playbook (ŠESTIJAZYČNÝ: CZ + EN + DE + ES + PL + SK)

Návod pro AI agenta, který **automaticky** rozšiřuje web testdog.app o nový obsah.
Každé spuštění začíná bez paměti – řiď se VÝHRADNĚ tímto souborem a soubory
`content/backlog.md` a `content/done.md` ve stejném repozitáři.

## Cíl jednoho běhu
Vezmi **1 téma článku** a **1 plemeno** z backlogu a vytvoř je ve **VŠECH ŠESTI jazycích** –
česky, anglicky, německy, španělsky, polsky a slovensky. To je **12 nových stránek** za běh:
1. článek: `/blog/<cz-slug>/`, `/en/blog/<en-slug>/`, `/de/blog/<en-slug>/`,
   `/es/blog/<en-slug>/`, `/pl/blog/<en-slug>/`, `/sk/blog/<en-slug>/`
2. plemeno: `/slovnik/<cz-slug>/`, `/en/dictionary/<en-slug>/`, `/de/dictionary/<en-slug>/`,
   `/es/dictionary/<en-slug>/`, `/pl/dictionary/<en-slug>/`, `/sk/dictionary/<en-slug>/`

**Slugy jsou jen dvoje:** český (`<cz-slug>`) pro `/blog/` a `/slovnik/`, anglický
(`<en-slug>`) pro VŠECHNY ostatní jazyky (de/es/pl/sk sdílejí anglický slug, liší se jen
jazykovou složkou v cestě). Pak vše commitni a pushni; GitHub Pages nasadí web automaticky.

## Kvalita (nepřekročitelné)
- Piš pro člověka, ne pro robota. Žádný vatový, opakující se nebo generický text.
- Rozsah článku ~600–900 slov, plemeno ~400–600 slov. Konkrétní, praktické, pravdivé.
- **Nikdy neduplikuj** téma ani plemeno, které už je v `content/done.md`.
- Neuváděj vymyšlená čísla jako fakta; ceny/statistiky formuluj jako orientační.
- Gramatika a diakritika bezchybně ve všech jazycích. Gendrově neutrální tón.
- **Žádný jazyk není doslovný překlad.** Obsah přelož věrně, ale **titulek a meta popis
  přizpůsob výrazům, které se v daném jazyce reálně hledají**. Oslovení čtenáře:
  EN you, DE du (ne Sie), ES tú, PL/SK/CZ tykání.
- **Ceny lokalizuj orientačně:** CZ Kč, EN USD ($), DE/ES/SK EUR (€), PL złoté (zł).
- Názvy plemen používej místní (např. Pudel/Caniche/Pudel/Pudel, Mops/Carlino/Mops/Mops,
  Dackel/Teckel/Jamnik/Jazvečík). Nadpisy sekcí plemene drž konzistentní s existujícími
  stránkami daného jazyka.

## ŠABLONY = existující stránky (kopíruj a uprav)
Nevkládej HTML z hlavy – **otevři si existující hotovou stránku STEJNÉHO jazyka a zkopíruj
její strukturu** (hlavičku vč. GA/fontů/`content.css?v=5`/`site.js?v=5`, `nav` s přeloženými
položkami menu, `footer`). Měň jen obsah, `<title>`, meta, `canonical`, slug, `hreflang`
a cíle přepínače jazyků.
- **článek** ← vzor `/blog/nejlepsi-psi-do-bytu/`, `/en/blog/how-much-does-a-dog-cost/`,
  `/de/blog/how-much-does-a-dog-cost/`, `/es/blog/…`, `/pl/blog/…`, `/sk/blog/…`
- **plemeno** ← vzor `/slovnik/labrador/`, `/en/dictionary/labrador/`,
  `/de/dictionary/labrador/`, `/es/dictionary/…`, `/pl/dictionary/…`, `/sk/dictionary/…`

Všechny cesty uváděj **kořenově** (`/blog/...`, `/de/...`, `/assets/...`, `/favicon.png`).

## Postup jednoho běhu (krok za krokem)
1. Přečti `content/backlog.md` a `content/done.md`.
2. Vyber **první článek** a **první plemeno** z backlogu, které nejsou v done.md.
3. Zvol dvojici slugů: **cz-slug** (malá písmena, bez diakritiky, pomlčky) a
   **en-slug** (anglická klíčovka, taky pomlčky).
4. Vytvoř **12 stránek** podle vzorových šablon výše. Reálné dnešní datum
   (v textu podle zvyklostí jazyka – viz meta řádek vzorových stránek;
   `RRRR-MM-DD` ve schema/sitemap).
5. **Provázání jazyků** – na každé z 12 stránek zkontroluj/uprav:
   - **hreflang** (7 řádků hned za `<link rel="canonical">`): `cs`, `en`, `de`, `es`,
     `pl`, `sk` + `x-default` (u obsahových stránek = anglická URL). Všech 6 stránek
     má stejný blok, liší se jen `canonical`.
   - **přepínač jazyka** (`.langsel` v `nav`): tlačítko ukazuje aktuální jazyk,
     menu obsahuje zbylých 5 odkazů na konkrétní jazykové protějšky stránky.
6. **Rozcestníky a tabulky** – přidej:
   - kartu článku na začátek `.post-grid` ve **všech 6** blog indexech
     (`/blog/index.html`, `/en/blog/index.html`, `/de/…`, `/es/…`, `/pl/…`, `/sk/…`),
     text karty v jazyce daného indexu;
   - odkazovaný řádek plemene do tabulky `.breed-table > tbody` ve **všech 6**
     slovníkových indexech (`/slovnik/index.html`, `/en/dictionary/index.html`, `/de/…`,
     `/es/…`, `/pl/…`, `/sk/…`), texty buněk v jazyce indexu.
7. **Sitemap** – přidej všech **12 nových URL** do `/sitemap.xml` (s dnešním `lastmod`).
8. **Evidence** – zapiš do `content/done.md` téma i plemeno (název, CZ+EN URL, datum,
   poznámka „6 jazyků“).
9. `git add -A && git commit -m "Obsah: <článek> + plemeno <plemeno> (6 jazyků)" && git push origin HEAD`.
10. Ověř, že nové stránky vrací HTTP 200 (build GitHub Pages může chvíli trvat; když je
    ještě 404, počkej a zkus znovu). Stačí ověřit namátkou CZ + 2 další jazyky.

## Foto plemene (generuj ji sám)
Všech ŠEST stránek plemene sdílí jednu fotku: každá `<img>` odkazuje na
`/slovnik/img/<cz-slug>.jpg`. Fotku **vygeneruj** jako součást běhu:

1. Zavolej nástroj **`generate_image`** (Higgsfield MCP), model `nano_banana_pro`,
   `aspect_ratio` `3:2`, prompt (nahraď `<Breed>` anglickým názvem plemene):
   `Photorealistic professional photo of a happy <Breed> dog sitting, looking at camera, soft sage-green studio background, natural soft lighting, high detail, sharp focus, no text, no watermark`
2. Vrátí se job (`status: pending`). Počkej ~60–90 s, pak zavolej **`show_generations`**
   (`type: image`) a najdi svůj výsledek podle promptu / job id; vezmi `results.rawUrl` (PNG).
3. Stáhni PNG a přes Python/PIL převeď na JPG (quality ~82), ulož do
   `/slovnik/img/<cz-slug>.jpg`. Vzor (spolehlivě funguje):
   ```python
   import urllib.request, io; from PIL import Image
   d=urllib.request.urlopen(RAW_URL, timeout=45).read()
   Image.open(io.BytesIO(d)).convert("RGB").save("slovnik/img/<cz-slug>.jpg","JPEG",quality=82,optimize=True)
   ```
4. Ověř, že soubor vznikl (~40–90 kB), a commitni ho spolu se stránkami.

Pokud `generate_image` v běhu není dostupné nebo selže: stránka je OK i bez fotky
(`onerror` v `<img>` místo skryje). V tom případě to **jasně zmiň ve shrnutí**, ať fotku
doplní majitel ručně.

## Bezpečnostní brzdy
- Když je backlog prázdný, vygeneruj 5 nových témat (z Google Trends / napovídače),
  zapiš je nahoru do backlogu a teprve pak pokračuj.
- Když si nejsi jistý faktem, formuluj opatrně nebo téma přeskoč.
- Nikdy neměň herní logiku appky ani ceny bez podkladu; tohle je jen web.
- Cache-busting: `content.css` a `site.js` odkazuj s `?v=5` (stejně jako vzorové stránky).
  Kdyby někdo v budoucnu ta sdílená CSS/JS měnil, verzi je potřeba zvednout napříč
  obsahovými stránkami – ale běžný obsahový běh je needituje.
- Kdyby ti na jeden běh 12 stránek nevycházelo (např. limit času), dokonči VŽDY celé
  jazykové sady: nikdy nenech článek/plemeno jen v části jazyků. Radši ubere na délce
  textu, než aby chyběl jazyk.
