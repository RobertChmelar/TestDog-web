# TestDog – SEO obsahový playbook (DVOJJAZYČNÝ: čeština + angličtina)

Návod pro AI agenta, který **automaticky** rozšiřuje web testdog.app o nový obsah.
Každé spuštění začíná bez paměti – řiď se VÝHRADNĚ tímto souborem a soubory
`content/backlog.md` a `content/done.md` ve stejném repozitáři.

## Cíl jednoho běhu
Vezmi **1 téma článku** a **1 plemeno** z backlogu a vytvoř je **v OBOU jazycích** –
česky i anglicky. To je **4 nové stránky** za běh:
1. český článek `/blog/<cz-slug>/`
2. anglický článek `/en/blog/<en-slug>/`
3. české plemeno `/slovnik/<cz-slug>/`
4. anglické plemeno `/en/dictionary/<en-slug>/`
Pak vše commitni a pushni; GitHub Pages nasadí web automaticky.

## Kvalita (nepřekročitelné)
- Piš pro člověka, ne pro robota. Žádný vatový, opakující se nebo generický text.
- Rozsah článku ~600–900 slov, plemeno ~400–600 slov. Konkrétní, praktické, pravdivé.
- **Nikdy neduplikuj** téma ani plemeno, které už je v `content/done.md`.
- Neuváděj vymyšlená čísla jako fakta; ceny/statistiky formuluj jako orientační.
- Gramatika a diakritika bezchybně. Gendrově neutrální tón.
- **Angličtina není doslovný překlad.** Obsah přelož věrně, ale **titulek, meta popis
  a slug přizpůsob anglickým vyhledávaným výrazům** (např. „kolik stojí pes měsíčně“ →
  slug `how-much-does-a-dog-cost`, ne `kolik-stoji...`). Ceny přepočítej na USD orientačně.

## ŠABLONY = existující stránky (kopíruj a uprav)
Nevkládej HTML z hlavy – **otevři si existující hotovou stránku a zkopíruj její strukturu**
(hlavičku vč. GA/fontů/`content.css?v=4`/`site.js?v=4`, `nav`, `footer`). Měň jen obsah,
`<title>`, meta, `canonical`, slug, `hreflang` a cíl přepínače jazyka.
- **CZ článek** ← vzor `/blog/nejlepsi-psi-do-bytu/index.html`
- **EN článek** ← vzor `/en/blog/how-much-does-a-dog-cost/index.html`
- **CZ plemeno** ← vzor `/slovnik/labrador/index.html`
- **EN plemeno** ← vzor `/en/dictionary/labrador/index.html`

Všechny cesty uváděj **kořenově** (`/blog/...`, `/en/...`, `/assets/...`, `/favicon.png`).

## Postup jednoho běhu (krok za krokem)
1. Přečti `content/backlog.md` a `content/done.md`.
2. Vyber **první článek** a **první plemeno** z backlogu, které nejsou v done.md.
3. Zvol dvojici slugů: **cz-slug** (malá písmena, bez diakritiky, pomlčky) a
   **en-slug** (anglická klíčovka, taky pomlčky).
4. Vytvoř **4 stránky** podle vzorových šablon výše. Reálné dnešní datum
   (`d. m. rrrr` v textu, `RRRR-MM-DD` ve schema/sitemap; EN např. `July 4, 2026`).
5. **Provázání jazyků** – na každé ze 4 stránek zkontroluj/uprav:
   - **hreflang** (3 řádky hned za `<link rel="canonical">`): `cs` = česká URL,
     `en` = anglická URL, `x-default` = URL téže stránky. Česká i anglická verze
     musí ukazovat na svůj protějšek.
   - **přepínač jazyka** (`.langsel` v `nav`): na CZ stránce vede EN odkaz na anglický
     protějšek (`/en/blog/<en-slug>/` resp. `/en/dictionary/<en-slug>/`); na EN stránce
     vede CZ odkaz na český protějšek. Aktuální jazyk je na tlačítku (CZ / EN).
6. **Rozcestníky a tabulky** – přidej:
   - kartu článku na začátek `.post-grid` v `/blog/index.html` **i** v `/en/blog/index.html`,
   - odkazovaný řádek plemene do tabulky `.breed-table > tbody` v `/slovnik/index.html`
     **i** v `/en/dictionary/index.html`.
7. **Sitemap** – přidej všechny **4 nové URL** do `/sitemap.xml` (s dnešním `lastmod`).
8. **Evidence** – zapiš do `content/done.md` téma i plemeno (název, obě URL, datum).
9. `git add -A && git commit -m "Obsah: <článek> + plemeno <plemeno> (CZ+EN)" && git push origin HEAD`.
10. Ověř, že nové stránky vrací HTTP 200 (build GitHub Pages může chvíli trvat; když je
    ještě 404, počkej a zkus znovu).

## Foto plemene (generuj ji sám)
Česká i anglická stránka plemene sdílí jednu fotku: obě `<img>` odkazují na
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
- Cache-busting: `content.css` a `site.js` odkazuj s `?v=4` (stejně jako vzorové stránky).
  Kdyby někdo v budoucnu ta sdílená CSS/JS měnil, verzi je potřeba zvednout napříč
  obsahovými stránkami – ale běžný obsahový běh je needituje.
