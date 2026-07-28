# TestDog – SEO obsahový playbook (JEDENÁCTIJAZYČNÝ: CZ + EN + DE + ES + PL + SK + FR + PT + IT + NL + SV)

Návod pro AI agenta, který **automaticky** rozšiřuje web testdog.app o nový obsah.
Každé spuštění začíná bez paměti – řiď se VÝHRADNĚ tímto souborem a soubory
`content/backlog.md` a `content/done.md` ve stejném repozitáři.

## Jazyky (11) a jejich složky
`cs` = `/` (čeština, primární), `en` = `/en/`, `de` = `/de/`, `es` = `/es/`, `pl` = `/pl/`,
`sk` = `/sk/`, `fr` = `/fr/`, `pt` = `/pt/` (**brazilská** portugalština!), `it` = `/it/`,
`nl` = `/nl/`, `sv` = `/sv/`.

## Cíl jednoho běhu
Vezmi **1 téma článku** a **1 plemeno** z backlogu a vytvoř je ve **VŠECH JEDENÁCTI jazycích**.
To je **22 nových stránek** za běh:
1. článek: `/blog/<cz-slug>/` (CZ) a `/<xx>/blog/<en-slug>/` pro každý z 10 ostatních jazyků.
2. plemeno: `/slovnik/<cz-slug>/` (CZ) a `/<xx>/dictionary/<en-slug>/` pro každý z 10 ostatních.

**Slugy jsou jen dvoje:** český (`<cz-slug>`) pro `/blog/` a `/slovnik/`, anglický
(`<en-slug>`) pro VŠECH 10 ostatních jazyků (sdílejí anglický slug, liší se jen jazykovou
složkou v cestě). Pak vše commitni a pushni; GitHub Pages nasadí web automaticky.

## Kvalita (nepřekročitelné)
- Piš pro člověka, ne pro robota. Žádný vatový, opakující se nebo generický text.
- Rozsah článku ~600–900 slov, plemeno ~400–600 slov. Konkrétní, praktické, pravdivé.
- **Nikdy neduplikuj** téma ani plemeno, které už je v `content/done.md`.
- Neuváděj vymyšlená čísla jako fakta; ceny/statistiky formuluj jako orientační.
- Gramatika a diakritika bezchybně ve všech jazycích. Gendrově neutrální tón.
- **Pozor na cizí znaky:** nikdy nenech v textu proklouznout písmeno z jiné abecedy
  (typicky cyrilice – např. „krokom**ером**" místo „krokom**erom**", nebo „**само**"
  místo „samo"). Vypadá to jako překlep a kazí to dojem. Piš důsledně v abecedě
  daného jazyka.
- **Pomlčky (– / —) používej střídmě.** Můžou být, ale jen tam, kde dávají v daném
  jazyce opravdu smysl (např. odsazení popisku za tučným výrazem v odrážce, číselný
  rozsah „2–3 hodiny"). V běžných větách je nahrazuj čárkou, tečkou nebo dvojtečkou –
  ať text nevypadá „strojově". Nesázej pomlčku tam, kde stačí přirozená interpunkce.
- **Žádný jazyk není doslovný překlad.** Obsah přelož věrně, ale **titulek a meta popis
  přizpůsob výrazům, které se v daném jazyce reálně hledají**. Oslovení čtenáře (tykání):
  CZ/SK/PL tykání, EN you, DE du (ne Sie), ES tú, FR tu, PT você (brazilský úzus), IT tu,
  NL je (ne u), SV du.
- **Ceny lokalizuj orientačně:** CZ Kč, EN USD ($), DE/ES/SK/FR/IT/NL EUR (€),
  PL złoté (zł), **PT brazilské reály (R$)**, SV švédské koruny (kr). Přepočítej řádově,
  ne kurzem na haléř.
- Názvy plemen používej **místní** (viz existující stránky téhož jazyka). Příklady:
  pudl = Pudel/Caniche(fr,es)/Barbone(it)/Poedel(nl)/Pudel(de,sk,sv)/Poodle(pt,en);
  jezevčík = Dackel(de)/Teckel(fr,nl)/Bassotto(it)/Tax(sv)/Dachshund(en,pt)/Jamnik(pl);
  mops = Mops/Carlin(fr)/Carlino(it)/Pug(en,pt)/Mopshond(nl). Nadpisy sekcí plemene drž
  konzistentní s existujícími stránkami daného jazyka.

## ŠABLONY = existující stránky (kopíruj a uprav)
Nevkládej HTML z hlavy – **otevři si existující hotovou stránku STEJNÉHO jazyka a zkopíruj
její strukturu** (hlavičku vč. GA/fontů/`content.css?v=6`/`site.js?v=6`, `nav` s přeloženými
položkami menu, `footer` vč. brand-row s odkazy na sociální sítě). Měň jen obsah, `<title>`,
meta, `canonical`, slug, `hreflang` a cíle přepínače jazyků.
- **článek** ← vzor `/blog/nejlepsi-psi-do-bytu/`, `/en/blog/how-much-does-a-dog-cost/`,
  a analogicky `/de/…`, `/es/…`, `/pl/…`, `/sk/…`, `/fr/…`, `/pt/…`, `/it/…`, `/nl/…`, `/sv/…`
- **plemeno** ← vzor `/slovnik/labrador/`, `/en/dictionary/labrador/`,
  a analogicky `/de/…`, `/es/…`, `/pl/…`, `/sk/…`, `/fr/…`, `/pt/…`, `/it/…`, `/nl/…`, `/sv/…`

Všechny cesty uváděj **kořenově** (`/blog/...`, `/fr/...`, `/assets/...`, `/favicon.png`).

## Postup jednoho běhu (krok za krokem)
1. Přečti `content/backlog.md` a `content/done.md`.
2. Vyber **první článek** a **první plemeno** z backlogu, které nejsou v done.md.
3. Zvol dvojici slugů: **cz-slug** (malá písmena, bez diakritiky, pomlčky) a
   **en-slug** (anglická klíčovka, taky pomlčky).
4. Vytvoř **22 stránek** podle vzorových šablon výše. Reálné dnešní datum
   (v textu podle zvyklostí jazyka – viz meta řádek vzorových stránek;
   `RRRR-MM-DD` ve schema/sitemap).
5. **Provázání jazyků** – na každé z 22 stránek zkontroluj/uprav:
   - **hreflang** (11 řádků hned za `<link rel="canonical">`): `cs`, `en`, `de`, `es`,
     `pl`, `sk`, `fr`, `pt`, `it`, `nl`, `sv` + `x-default` (u obsahových stránek =
     anglická URL). Všech 11 stránek má stejný blok, liší se jen `canonical`.
   - **přepínač jazyka** (`.langsel` v `nav`): tlačítko ukazuje aktuální jazyk,
     menu obsahuje zbylých 10 odkazů na konkrétní jazykové protějšky stránky.
6. **Rozcestníky a tabulky** – přidej:
   - kartu článku na začátek `.post-grid` ve **všech 11** blog indexech
     (`/blog/index.html` a `/<xx>/blog/index.html`), text karty v jazyce daného indexu;
   - odkazovaný řádek plemene do tabulky `.breed-table > tbody` ve **všech 11**
     slovníkových indexech (`/slovnik/index.html` a `/<xx>/dictionary/index.html`),
     texty buněk v jazyce indexu.
7. **Vnitřní prolinkování v textu (interní linkbuilding – NEVYNECHÁVAT).** V novém
   článku i v novém profilu plemene projdi text a každé **jméno plemene, které má
   vlastní stránku ve slovníku daného jazyka**, obal odkazem na tu stránku
   (`/slovnik/<cz-slug>/` resp. `/<xx>/dictionary/<en-slug>/`). Než odkaz vytvoříš,
   ověř (`ls slovnik/` / `ls <xx>/dictionary/`), že stránka v tom konkrétním jazyce
   reálně existuje. Každé plemeno linkuj jen při **prvním výskytu** v textu, ne opakovaně.
   Plemena bez vlastní stránky nech jako běžný text.
8. **Korektura (NEVYNECHÁVAT) – přečti každý text, než ho pustíš ven.** Projdi všech
   22 stránek a u každé zkontroluj:
   - **gramatiku, diakritiku a smysl vět** v daném jazyce – čti text tak, jako by ho
     četl rodilý mluvčí; oprav patvary, kostrbaté nebo nesmyslné věty a překlepy;
   - **žádné cizí znaky** (cyrilice apod. – viz sekce Kvalita);
   - **pomlčky** – zbytečné nahraď přirozenou interpunkcí (viz sekce Kvalita);
   - konzistentní tykání dle jazyka a lokalizované ceny/názvy (viz sekce Kvalita).
   Zvláštní pozor na CZ a SK – tady patvary a cizí znaky nejvíc bijí do očí. Když
   něco skřípe, oprav to hned; do commitu jde jen text, který by rodilý mluvčí podepsal.
9. **Sitemap** – přidej všech **22 nových URL** do `/sitemap.xml` (s dnešním `lastmod`).
10. **Evidence** – zapiš do `content/done.md` téma i plemeno (název, CZ+EN URL, datum,
    poznámka „11 jazyků“).
11. **Zpětné prolinkování starších článků na nové plemeno (NEVYNECHÁVAT).** Nové
    plemeno se může jmenovat i v článcích napsaných v předchozích běžích. Ve všech
    11 jazycích prohledej existující články
    (`grep -rl "<jméno plemene>" blog/ en/blog/ de/blog/ es/blog/ pl/blog/ sk/blog/ fr/blog/ pt/blog/ it/blog/ nl/blog/ sv/blog/`,
    včetně místních tvarů jména plemene v daném jazyce) a každý holý text s tímto
    plemenem obal odkazem na nově vytvořenou stránku plemene v odpovídajícím jazyce.
    Uprav jen samotný odkaz, ne okolní text.
12. `git add -A && git commit -m "Obsah: <článek> + plemeno <plemeno> (11 jazyků)" && git push origin HEAD`.
13. Ověř, že nové stránky vrací HTTP 200 (build GitHub Pages může chvíli trvat; když je
    ještě 404, počkej a zkus znovu). Stačí ověřit namátkou CZ + 3 další jazyky.

## Foto plemene (generuj ji sám)
Všech JEDENÁCT stránek plemene sdílí jednu fotku: každá `<img>` odkazuje na
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
- Cache-busting: `content.css` a `site.js` odkazuj s `?v=6` (stejně jako vzorové stránky).
  Kdyby někdo v budoucnu ta sdílená CSS/JS měnil, verzi je potřeba zvednout napříč
  obsahovými stránkami – ale běžný obsahový běh je needituje.
- Kdyby ti na jeden běh 22 stránek nevycházelo (např. limit času), dokonči VŽDY celé
  jazykové sady: nikdy nenech článek/plemeno jen v části jazyků. Radši uber na délce
  textu, než aby chyběl jazyk. Kdyby ani to nešlo, dokonči nejdřív článek ve všech 11
  jazycích, commitni, a v témže běhu pokračuj plemenem ve všech 11 – ať je web vždy
  v konzistentním stavu.
