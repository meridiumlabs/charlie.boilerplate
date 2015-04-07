# FASAB 6F
Vi använder Sass som "pre processor" för css. Alla scss-filer ligger sparade under /content/styles. Gulp måste köra i bakgrunden för att scss-filerna ska kompileras och flyttas till /static/styles. Läs mer om hur gulp fungerar och konfigureras under /build/README.md

Följande struktur används:
- **Assets** - Ikoner och annat smått och gott.
- **Base** - Generell css som resets, konfiguration etc.
- **Components** - Fristående komponenter.
- **Layout** - Ramverk, t ex menyer. Saker som har en specifik plats och används på ett ställe.
- **Vendor** - Filer för tredjepartskomponenter.
- **Themes** - Konfiguration och css för teman.

Dela upp css:en i små hanterabara filer med ett ansvar. All css sammanfogas i `app.default.scss`. Varje tema har en specifik fil som heter `app.themename.scss` som bygger på `app.default.scss` tillsammans med den temaspecifika css som ligger under /content/styles/themes/.

#### Variabler
Använd variabler för färger, fonter etc som används på flera ställen. Överdriv dock inte. Används t ex en färg endast på ett ställe så finns ingen anledning att ha en variabel. Namnge variabler semantiskt, t ex `$color-error` och inte `$color-red`.

#### Mixins
I projektet finns ett antal mixins. Dessa ska dokumenteras i style guiden.

#### Nesting
Undvik i möjligaste mån nesting. Använd vår metodik istället. Undantag kan göras för element som ej kommer ha barn, pseudo-element eller olika states.

#### Extensions
Extensions kan vara kraftfullt men missbruka det inte.


## Metodik för att strukturera css
Vi använder en BEM-inspirerad metodik för att strukturera css uppbyggt av komponenter, element och modifierare.

### Komponenter
En komponent är en grupp av element. Komponenten ska kunna leva för sig själv var som helst på webbplatsen utan att påverkas av annan css eller av elementet klassen är satt på. Kan vara t ex vara en puff med bild, en länk och text.
```html
<div class="teaser">
</div>
```
Försök att namnge en kompenent med ett semantiskt ord. Inte vad det används till utan vad det är.

Var extremt försiktig om du ändrar i en befintlig komponent.

### Element
Ett element är en del av en komponent och namnges av komponentens namn följt av elementets namn. Elementets utseende ska inte påverkas av vilket html-element klassen är satt på. Rubriken i följande exempel skulle lika gärna kunna vara en `<h3>` eller en `<strong>`.
```html
<div class="teaser">
	<img src="foo.jpg" alt="" class="teaser-image" />
	<h2 class="teaser-heading">Lorem ipsum</h2>
	<p class="teaser-lead">Lorem ipsum dolor sit amet.</p
</div>
```
Undvik att använda element utanför sin komponent. Dock så kan komponenter ligga i andra komponenter.

### Modifierare
En modifierare förändrar utseendet på en komponent eller ett element och namnges med dubbla streck, t ex `teaser—solid`. Följande exempel sätter en bakgrundsfärg på vår puff. 
```html
<div class="teaser teaser—solid">
	<img src="foo.jpg" alt="" class="teaser-image" />
	<h2 class="teaser-heading">Lorem ipsum</h2>
	<p class="teaser-lead">Lorem ipsum dolor sit amet.</p
</div>
```
Gör endast små förändringar med modifierare. Överväg att skapa en ny komponent eller ett nytt element om förändringarna är större.

## ID:n och klasser
Undvik att använda id:en för att hänga upp css på. Använd enbart klasser. Applicera aldrig css direkt på ett element och använd dig inte av "cascading" (t ex `div p { color:red; }`). Undantag kan vara när du inte kan sätta en klass på ett element eller när elementet aldrig kommer att ha flera barn.

## Storlekar och relativa mått
Relativa måttenheter (em och %) ska användas. Webbplatsens basfontstorlek är 16px. Det finns en mixin som omvandlar pixlar till em.
```scss
font-size:em(10px);
```
Det går även att skicka in en ny basstorlek om den har ändrats.
```scss
font-size:em(10px);
margin:em(5px, 10px);
```
Försök sätta storleken så djupt som möjligt. T ex om paragrafer i en komponent ska vara 12px. Sätt storleken på `<p>` och inte på komponenten i sig.

## States (focus, active och hover)
Det är viktigt att kontrollera att alla states ser ok ut på den funktionalitet som byggs. Tabba igenom sidan och kontrollera att tabbordningen är logisk och att fokus ser bra ut och stämmer överens med webbplatsen i övrigt.

Vid fokus ska länkar bli inverterade. Detta måste justeras när andra element än endast text länkas. 

## Vendor prefixes
Använd den standard som w3c föreslår. gulp-autoprefixer kommer att lägga på de prefix som behövs.