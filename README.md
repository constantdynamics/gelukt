# Kids Habit Tracker App 🚂

Een eenvoudige, visueel aantrekkelijke habit tracker app speciaal ontworpen voor kinderen van 2-3 jaar en hun ouders.

## ✨ Kenmerken

- **Kind-vriendelijke interface**: Extra grote knoppen en emoji's perfect voor kleine handjes
- **Dagdeel systeem**: Ochtend, Middag en Avond, elk met een eigen lucht en kleur
- **Groeiende trein**: Elke volledig afgeronde dag is een wagon — de trein blijft doorgroeien
- **Leuke animaties**: Sterren, confetti, ballonnen, vuurwerk en hartjes
- **Geluidseffecten**: Drie ingebouwde geluiden, of je eigen stem per taak
- **Eigen opname**: Neem per taak je eigen "Gelukt!" op met de microfoon
- **Ouder controle**: Volledig beheer over taken, naam, avatar en instellingen
- **Automatische reset**: Elke nacht om 00:00 staan de taken weer klaar
- **100% Lokaal**: Alle data wordt opgeslagen op je apparaat, geen internet nodig

## 🚀 Hoe te gebruiken

### 🌐 Live App (GitHub Pages) - AANBEVOLEN

**De app is beschikbaar als Progressive Web App op:**

https://constantdynamics.github.io/gelukt/

**Installeer als app op je telefoon/tablet:**

#### iOS (iPhone/iPad):
1. Open de link in Safari
2. Tik op het "Deel" icoon (vierkant met pijl omhoog)
3. Scroll naar beneden en tik "Voeg toe aan beginscherm"
4. Tik "Toevoegen"
5. De app verschijnt nu op je beginscherm! 🎉

#### Android:
1. Open de link in Chrome
2. Tik op het menu (drie puntjes)
3. Tik "Toevoegen aan startscherm" of "App installeren"
4. Tik "Installeren"
5. De app verschijnt nu op je startscherm! 🎉

### 💻 Lokaal Gebruik (Offline)

1. **Download het bestand**: `kids-habit-tracker.html` of `index.html`
2. **Open het bestand**: Dubbelklik op het bestand of open het met je browser
3. **Gebruik op mobiel**:
   - Stuur het bestand naar je telefoon/tablet via email of cloud storage
   - Open het bestand in je mobiele browser (Chrome, Safari, etc.)
   - Voor iOS Safari: tik op "Deel" → "Voeg toe aan beginscherm" voor een app-achtige ervaring

### Eerste Keer Instellen

1. **Open de app** - Je ziet de kind-modus met een leeg scherm
2. **Tik op het tandwiel** (⚙️) rechtsboven om naar ouder-modus te gaan
3. **Voeg taken toe**:
   - Kies uit 10 voorgedefinieerde templates
   - Tik op een template om deze toe te voegen aan een dagdeel
   - Bewerk de taken om verificatie woorden, animaties en geluiden aan te passen
4. **Ga terug** naar kind-modus via de "← Terug" knop

## 🎮 Hoe het werkt

### Voor Kinderen (Kind-modus)

1. **Selecteer dagdeel**: Ochtend 🐓, Middag 🌞 of Avond 🌛
2. **Tik op een taak cirkel**: De grote kleurrijke cirkel met emoji
3. **Geef device aan ouder**: Voor verificatie
4. **Na voltooiing**:
   - Leuke animatie speelt af
   - Geluid wordt afgespeeld
   - Taak wordt groen met vinkje
5. **Bekijk de trein**: Onderaan het scherm, tik erop voor meer details

### Voor Ouders (Ouder-modus)

#### Taken Beheren Tab

- **Kind**: Stel de naam en avatar in die je kind in de app ziet
- **Templates toevoegen**: Kies eerst een dagdeel, tik dan op een template. Elke template kan aan
  elk dagdeel worden toegevoegd — de ⭐ geeft alleen het aanbevolen dagdeel aan
- **Taken bewerken**:
  - Wijzig het verificatie woord
  - Kies een andere animatie
  - Kies een ander geluid, of neem je eigen stem op
- **Taken verwijderen**: Tik op de prullenbak (🗑️)
- **Reset vandaag**: Zet alle taken van vandaag terug naar niet-voltooid
- **Hele trein resetten**: Wist alle wagons en zet de teller op 0 (met bevestiging)

#### Voortgang Tab

- **Trein visualisatie**: Alle verdiende wagons, per rij van 7
- **Deze week**: Per dag drie bolletjes (🐓 ochtend, 🌞 middag, 🌛 avond) die groen kleuren
  zodra dat dagdeel klaar is. Een 🏆 markeert een volledig afgeronde dag
- **Totaal teller**: Aantal voltooide dagen in totaal + hoeveel daarvan deze week vallen

## 🎨 Beschikbare Templates

| Taak | Emoji | Aanbevolen Dagdeel |
|------|-------|-------------------|
| Tanden poetsen | 🪥 | Ochtend |
| Aankleden | 👕 | Ochtend |
| Handen wassen | 🧼 | Middag |
| Jas ophangen | 🧥 | Middag |
| Schoenen uit | 👟 | Middag |
| Bordje leeg | 🍽️ | Middag |
| Hele weg gelopen | 🚶 | Middag |
| Opruimen speelgoed | 🧸 | Avond |
| Naar bed gaan | 😴 | Avond |
| In bed blijven | 🛏️ | Avond |

## 🎭 Animaties

- **⭐ Sterren**: Sterretjes die uiteen spatten
- **🎊 Confetti**: Kleurrijke confetti die valt
- **🎈 Ballonnen**: Ballonnen die omhoog zweven
- **🎆 Vuurwerk**: Vuurwerk explosies
- **💕 Hartjes**: Zwevende hartjes

## 🔊 Geluiden

- **Pling!**: Kort, vrolijk belgeluid
- **Hoera!**: Juichend geluid
- **Gelukt!**: Succes melodie
- **🎤 Eigen opname**: Neem per taak je eigen stem op (max 5 seconden). Elke taak kan zijn
  eigen opname hebben — bijvoorbeeld papa bij tandenpoetsen en mama bij opruimen

> Opnemen vraagt eenmalig toestemming voor de microfoon. De opname blijft op het apparaat
> (IndexedDB) en wordt nooit verstuurd.

## 🏆 Trein Systeem

De trein is het beloningssysteem:

1. **Start**: een locomotief zonder wagons
2. **Wagon verdienen**: zodra alle drie de dagdelen van een dag klaar zijn, komt er een wagon bij.
   Een dagdeel zonder taken telt automatisch mee als klaar
3. **Doorgroeien**: de trein blijft groeien — 8, 9, 10+ wagons. Elke rij van 7 wagons wordt
   gevierd met vuurwerk en een gouden scherm
4. **Geen automatische reset**: de trein reset nooit vanzelf. De ouder kan hem handmatig
   resetten via "🚂 Hele trein resetten"

## 🌙 Dagelijkse reset

Om 00:00 worden alle vinkjes automatisch gewist zodat de nieuwe dag klaarstaat. De trein en het
weekoverzicht blijven bewaard — alleen de taken van vandaag gaan terug naar open. Wil je eerder
opnieuw beginnen, gebruik dan "🔄 Reset vandaag".

## 💾 Data Opslag

- **Lokaal opgeslagen**: Alle data blijft op je apparaat via localStorage
- **Geen internet nodig**: Werkt volledig offline
- **Privacy**: Geen data wordt verzonden of gedeeld
- **Persistent**: Data blijft bewaard zelfs na het sluiten van de app

## ⚠️ Belangrijk

- **Verificatie**: Elke taak vereist dat een ouder het juiste woord intypt voordat de taak als voltooid wordt gemarkeerd. Hoofdletters maken niet uit: `TANDEN` = `tanden` = `TaNdEn`
- **Ongedaan maken**: Tik op een voltooide (groene) taak en typ "UNDO" om deze terug te zetten
- **Reset**: Gebruik de "🔄 Reset Vandaag" knop in ouder-modus om alle taken te resetten (verwijdert GEEN taken, alleen voltooiing status)
- **Browser data**: Als je je browser data/cache wist, gaan alle taken, voortgang en opnames verloren

## 📱 Browser Compatibiliteit

- ✅ Chrome (Desktop & Mobile)
- ✅ Safari (Desktop & Mobile/iPad)
- ✅ Firefox (Desktop & Mobile)
- ✅ Edge (Desktop & Mobile)
- ✅ Samsung Internet

## 🛠️ Technische Details

- **Progressive Web App (PWA)**: Installeerbaar als native app
- **Service Worker**: Voor offline functionaliteit en caching
- **Single Page Application**: Alles in één HTML bestand
- **Framework**: Vanilla JavaScript, geen externe dependencies en geen CDN — de app werkt
  volledig offline vanaf de eerste keer laden
- **Styling**: Eigen CSS design system met custom properties
- **Storage**: localStorage voor taken, voortgang en profiel; IndexedDB voor eigen opnames
- **Audio**: Web Audio API (gegenereerde tonen) + MediaRecorder voor eigen opnames
- **Animaties**: CSS animations, met respect voor `prefers-reduced-motion`
- **Manifest**: Web App Manifest voor installatie en app-achtige ervaring

## 🎯 Tips voor Ouders

1. **Start klein**: Begin met 2-3 taken per dagdeel
2. **Consistent zijn**: Gebruik de app dagelijks voor beste resultaten
3. **Positieve versterking**: Vier voltooide taken samen met je kind
4. **Personaliseer**: Pas verificatie woorden aan naar woorden die je kind herkent
5. **Visueel**: Laat je kind de trein regelmatig zien om voortgang te visualiseren

## 🐛 Problemen?

Als je problemen ondervindt:

1. **Refresh de pagina**: Los vaak tijdelijke problemen op
2. **Check browser versie**: Gebruik een moderne browser (laatste 2 jaar)
3. **JavaScript enabled**: Controleer dat JavaScript aan staat in je browser
4. **Private mode**: Sommige browsers beperken localStorage in private mode

## 🚀 GitHub Pages Deployment (voor ontwikkelaars)

Als je deze app zelf wilt hosten op GitHub Pages:

1. **Fork de repository** op GitHub
2. **Ga naar Settings** van je repository
3. **Klik op Pages** in het linker menu
4. **Source**: Selecteer je branch (bijv. `main` of `claude/make-this-now-011CUsDp1TdKkh7QZPH765UF`)
5. **Folder**: Selecteer `/ (root)`
6. **Klik Save**
7. **Wacht even** - GitHub Pages bouwt je site
8. **Je app is live!** Op: `https://[jouw-username].github.io/gelukt/`

### PWA Bestanden

De volgende bestanden zijn nodig voor PWA functionaliteit:
- `index.html` - Hoofd HTML bestand
- `manifest.json` - Web App Manifest
- `sw.js` - Service Worker voor offline functionaliteit
- `icon-192.svg` & `icon-512.svg` - App icons

### Icons Aanpassen

Om je eigen icons te maken:
1. Open `generate-icons.html` in je browser
2. Download de gegenereerde PNG icons
3. Vervang `icon-192.svg` en `icon-512.svg` (of gebruik PNG)
4. Update `manifest.json` als je PNG gebruikt

## 📄 Licentie

Dit is een open source project. Gebruik het vrij voor persoonlijk gebruik!

---

**Versie**: 2.0 (PWA)
**Datum**: September 2026
**Ontwikkeld met**: ❤️ voor ouders en kinderen
**Repository**: https://github.com/constantdynamics/gelukt
