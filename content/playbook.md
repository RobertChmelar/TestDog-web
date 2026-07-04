# TestDog – SEO obsahový playbook (pro autonomního agenta)

Tenhle soubor je návod pro AI agenta, který **automaticky** rozšiřuje web testdog.app
o nový obsah. Každé spuštění začíná bez paměti – řiď se VÝHRADNĚ tímto souborem a
soubory `content/backlog.md` a `content/done.md` ve stejném repozitáři.

## Cíl jednoho běhu
Vytvoř **1 nový blogový článek** a **1 nové plemeno** ve slovníku (pokud není v zadání
jinak). Obsah musí být **originální, česky, opravdu užitečný** a napojený na aplikaci
TestDog. Po vytvoření vše commitni a pushni; GitHub Pages nasadí web automaticky.

## Kvalita (nepřekročitelné)
- Piš pro člověka, ne pro robota. Žádný vatový, opakující se nebo generický text.
- Rozsah článku ~600–900 slov, plemeno ~400–600 slov. Konkrétní, praktické, pravdivé.
- Každá stránka cílí na **jeden hlavní vyhledávaný dotaz** (z backlogu) + pár souvisejících.
- **Nikdy neduplikuj** téma ani plemeno, které už je v `content/done.md`.
- Neuváděj vymyšlená čísla jako fakta; ceny/statistiky formuluj jako orientační.
- Gramatika a diakritika bezchybně. Gendrově neutrální tón.

## Rozvržení repozitáře (= kořen webu, GitHub Pages ho servíruje)
```
/index.html                 hlavní stránka
/assets/content.css         sdílený styl obsahových stránek (POUŽÍVEJ ho)
/blog/index.html            rozcestník blogu (přidej sem kartu nového článku)
/blog/<slug>/index.html     článek
/slovnik/index.html         slovník ras (přidej sem řádek + odkaz na nové plemeno)
/slovnik/<slug>/index.html  stránka plemene
/sitemap.xml                mapa webu (přidej sem každou novou URL)
/content/*.md               tyto řídicí soubory (nepublikují se, viz robots.txt)
```

## Postup jednoho běhu (krok za krokem)
1. Přečti `content/backlog.md` a `content/done.md`.
2. Vyber **první článek** z backlogu, který ještě není v done.md. (Volitelně témata
   ověř/aktualizuj přes web – Google napovídač, „Další dotazy", Google Trends – a
   případně doplň nová horká témata na začátek backlogu.)
3. Vyber **první plemeno** z backlogu (řazeno dle popularity), které není v done.md.
4. Vytvoř soubor článku `/blog/<slug>/index.html` podle ŠABLONY ČLÁNKU níže.
5. Přidej kartu článku na začátek mřížky v `/blog/index.html` (element `.post-grid`).
6. Vytvoř stránku plemene `/slovnik/<slug>/index.html` podle ŠABLONY PLEMENE níže.
7. Přidej do tabulky v `/slovnik/index.html` (`.breed-table > tbody`) nový řádek,
   kde je název plemene **odkaz** na jeho stránku.
8. Přidej obě nové URL do `/sitemap.xml` (s dnešním `lastmod`).
9. Zapiš oba nové kusy do `content/done.md` (název, URL, datum).
10. `git add -A && git commit && git push`. Pak ověř, že stránky vrací HTTP 200.

## Pravidla pro slug a odkazy
- Slug = malá písmena bez diakritiky, slova spojená pomlčkou (např. „Francouzský
  buldoček" → `francouzsky-buldocek`).
- Cesty uváděj **kořenově** (`/blog/...`, `/assets/content.css`, `/favicon.png`).
- Do každého článku dej **2–3 interní odkazy** na související stránky (jiné články,
  slovník) a povinně **CTA na appku** (viz šablona).

## Datum
Používej reálné dnešní datum ve formátu `d. m. rrrr` (text) a `RRRR-MM-DD` (schema, sitemap).

---

## ŠABLONA ČLÁNKU  (`/blog/<slug>/index.html`)
Nahraď `{{...}}`. Hlavičku (GA, fonty, styl) zkopíruj přesně.

```html
<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{{TITULEK ~50-60 znaků s hlavním klíčovým slovem}}</title>
<meta name="description" content="{{META POPIS ~150 znaků, přirozeně s klíčovým slovem}}">
<link rel="canonical" href="https://testdog.app/blog/{{slug}}/">
<meta property="og:type" content="article">
<meta property="og:title" content="{{TITULEK}}">
<meta property="og:description" content="{{KRÁTKÝ POPIS}}">
<meta property="og:url" content="https://testdog.app/blog/{{slug}}/">
<meta property="og:image" content="https://testdog.app/dog.png">
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@500;700;800;900&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/content.css">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-63QT21LDHM"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-63QT21LDHM');</script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Article","headline":"{{TITULEK}}","description":"{{POPIS}}","image":"https://testdog.app/dog.png","author":{"@type":"Organization","name":"TestDog"},"publisher":{"@type":"Organization","name":"TestDog","logo":{"@type":"ImageObject","url":"https://testdog.app/favicon.png"}},"mainEntityOfPage":"https://testdog.app/blog/{{slug}}/","datePublished":"{{RRRR-MM-DD}}","dateModified":"{{RRRR-MM-DD}}"}
</script>
</head>
<body>
<nav class="site">
  <div class="nav-inner">
    <a href="/" class="brand"><img src="/favicon.png" alt="TestDog"> TestDog</a>
    <div class="nav-links">
      <a href="/blog/" class="hide-sm">Blog</a>
      <a href="/slovnik/" class="hide-sm">Slovník ras</a>
      <a href="/#stahnout" class="nav-cta">Stáhnout</a>
    </div>
  </div>
</nav>
<main>
  <div class="wrap">
    <div class="breadcrumb"><a href="/">Domů</a> › <a href="/blog/">Blog</a> › {{KRÁTKÝ NÁZEV}}</div>
    <article class="post">
      <h1>{{H1 – může se mírně lišit od titulku}}</h1>
      <p class="post-meta">Aktualizováno {{d. m. rrrr}} · čtení {{X}} minut</p>
      <p class="lead">{{Úvodní odstavec, který slibuje odpověď.}}</p>

      {{2–4×: <h2>Podnadpis</h2> + odstavce/seznamy. Používej <ul>/<ol>, <strong>, <blockquote>.}}

      <div class="cta-box">
        <h3>{{Výzva navazující na téma}}</h3>
        <p>{{1–2 věty: TestDog = hra, kde se v reálném čase staráš o virtuálního psa;
           krmení v oknech a procházky podle krokoměru. Test připravenosti pro celou rodinu.}}</p>
        <a class="store-btn" href="https://apps.apple.com/cz/app/testdog/id6784382251" target="_blank" rel="noopener">
          <svg viewBox="0 0 384 512" fill="currentColor" aria-hidden="true"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zM262.1 104.5c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
          <span><span class="st-sub">Stáhnout na</span><span class="st-main">App Store</span></span>
        </a>
      </div>

      {{Další sekce + závěr. Vlož 2–3 interní odkazy na související stránky.}}
    </article>
  </div>
</main>
<footer class="site">
  <a href="/" class="brand"><img src="/favicon.png" alt="" style="width:28px;height:28px;border-radius:8px"> TestDog</a>
  <p>Trenažér zodpovědnosti pro budoucí psí páníčky.</p>
  <div class="links">
    <a href="/">Domů</a><a href="/blog/">Blog</a><a href="/slovnik/">Slovník ras</a><a href="/soukromi/">Soukromí</a>
  </div>
</footer>
</body>
</html>
```

### Karta do `/blog/index.html` (na začátek `.post-grid`)
```html
<a class="post-card" href="/blog/{{slug}}/">
  <span class="tag">{{Kategorie}}</span>
  <h2>{{Krátký název}}</h2>
  <p>{{1 věta shrnutí}}</p>
  <span class="more">Číst článek →</span>
</a>
```

---

## ŠABLONA PLEMENE  (`/slovnik/<slug>/index.html`)
Stejná hlavička jako článek (GA, fonty, styl, canonical na `/slovnik/{{slug}}/`).
Obsah: povaha, vhodnost k dětem (hvězdičky ★–★★★★★), náročnost, péče, pro koho se hodí,
na co pozor. Použij `article.post` a stejný nav/footer. Přidej CTA box jako v článku.
Titulek ve stylu: `{{Plemeno}}: povaha, péče a vhodnost k dětem`.

**Foto plemene:** hned za `<p class="post-meta">…</p>` (před `<p class="lead">`) vlož:
```html
<figure class="breed-photo"><img src="/slovnik/img/{{slug}}.jpg" alt="{{Plemeno}}" loading="lazy" onerror="this.closest('figure').style.display='none'"></figure>
```
Samotný soubor fotky `/slovnik/img/{{slug}}.jpg` doplňuje majitel zvlášť (AI generovaná
fotka). Když soubor ještě neexistuje, `onerror` místo elegantně skryje – stránka je OK i bez fotky.
Ve svém shrnutí běhu připomeň, že k novému plemeni je potřeba dodat fotku.

### Řádek do tabulky v `/slovnik/index.html` (`.breed-table > tbody`)
```html
<tr><td><a href="/slovnik/{{slug}}/">{{Plemeno}}</a></td><td>{{povaha}}</td><td><span class="stars">{{★…}}</span></td><td>{{náročnost}}</td><td>{{velikost}}</td></tr>
```

---

## Přidání do `/sitemap.xml`
Před `</urlset>` vlož:
```xml
<url><loc>https://testdog.app/blog/{{slug}}/</loc><lastmod>{{RRRR-MM-DD}}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>
<url><loc>https://testdog.app/slovnik/{{slug}}/</loc><lastmod>{{RRRR-MM-DD}}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>
```

## Publikace
```
git add -A
git commit -m "Obsah: {{název článku}} + plemeno {{plemeno}}"
git push origin HEAD
```
Pak ověř `curl -s -o /dev/null -w "%{http_code}" https://testdog.app/blog/{{slug}}/` == 200
(build GitHub Pages může chvíli trvat; případně zkontroluj za pár minut).

## Bezpečnostní brzdy
- Když je backlog prázdný, vygeneruj 5 nových nápadů (z Trends/napovídače) a zapiš je do backlogu; teprve pak pokračuj.
- Když si nejsi jistý faktem, formuluj opatrně nebo téma přeskoč.
- Nikdy neměň herní logiku appky ani ceny bez podkladu; tohle je jen web.
