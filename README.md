# React SSR mit (S)CSS Modules

## Up and Running

```bash
# development
npm start

# production
npm run build
npm run start:prod
```

## Vorteile

- Scoped styles (nicht global)
  - Klassennamen können nicht mehr kollidieren (man kann auch 5x die Klasse `.button` benutzen)
  - Weniger mentaler Aufwand beim Ausdenken der Klassennamen
- Klasennamen werden obfuscated (Externe können sich nicht drauf verlassen und wir brechen nichts wenn wir's mal ändern) + etwas schmalleres HTML ;)

## Nachteile

- Immer noch separates .scss file
- SCSS (Finden manche outdated)
- Etwas aufwändig zu konfigurieren für SSR
- Ohne zusätzliche Plugins "stringly"-typed (und Fehler werden verschluckt)

## Weiterführende Links

- [typed-css-modules](https://github.com/Quramy/typed-css-modules): Generiert Typescript definition files für css modules (für typesafe styles)
- [babel-plugin-react-css-modules](https://github.com/gajus/babel-plugin-react-css-modules): Styles mit `styleName` statt `className`, wirft Fehler wenn Style nicht gefunden wurde
