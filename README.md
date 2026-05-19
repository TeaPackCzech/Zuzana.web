# KMS STUDIO Zuzana Műller

Statický prezentační web pro kosmetické studio v Poličce.

## Struktura

- `index.html` - obsah webu, SEO meta tagy a sekce
- `style.css` - responzivní design, animace a vizuální styl
- `script.js` - mobilní menu, reveal animace, počítadla, lightbox, CTA logika

Vizuály jsou napojené na reálné fotografie z Unsplash CDN. Před ostrým spuštěním je vhodné je nahradit vlastními fotografiemi studia, nehtů, řas a kosmetických detailů.

## Rezervační odkaz

Po získání Notino profilu stačí v `script.js` doplnit URL do konstanty:

```js
const RESERVATION_URL = "https://...";
```

Web je připravený k nahrání na běžný statický hosting.
