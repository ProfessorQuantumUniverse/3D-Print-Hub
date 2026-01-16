
# DESIGN- & ENGINEERING-DOKUMENTATION: 3D-PRINT-HUB

## 1. GESAMTEINDRUCK & STIL

*   **Visuelle Stimmung:** Die Seite vermittelt eine „Maker-Space“-Atmosphäre. Sie kombiniert industrielle Elemente (3D-Druck, Technik) mit einem zugänglichen, fast spielerischen UI-Design. Der Stil ist direkt, funktional und nutzt starke Kontraste.
*   **Design-Niveau:** Ambitioniertes Small-Business- / Portfolio-Level. Es wirkt nicht wie ein steriles Corporate-Design, sondern wie eine maßgeschneiderte Lösung für eine enthusiastische Zielgruppe.
*   **Zielgruppe:** Maker, Hobbyisten, Ingenieure und Privatpersonen, die 3D-Druck-Dienstleistungen benötigen.
*   **Wahrgenommene Wertigkeit:** Solide und vertrauenswürdig durch Transparenz (Status-Tracking, Preisrechner), aber mit einem persönlichen Touch („Ihre Profis“).
*   **Besonderheit:** Die Seite nutzt eine Mischung aus modernem „Glassmorphism“ (leicht transparente Container) und retro-technischen Texturen (Raster-Hintergründe).

## 2. LAYOUT & GRID

*   **Container-Strategie:**
    *   **Header:** Full-Width.
    *   **Hero-Section:** Full-Width Visuell, Inhalt zentriert.
    *   **Content-Bereiche:** Zentrierte Container (Max-Width ca. 1000px - 1200px) mit großzügigem Padding an den Seiten.
*   **Grid-System:**
    *   Flexibles Grid. Viele Sektionen nutzen ein 2-Spalten-Layout (Bild links/Text rechts oder umgekehrt).
    *   Die „Team“-Sektion und „Materialien“-Sektion nutzen ein 2er- bzw. 3er-Grid für Karten.
*   **Abstände (Spacing):** Die Elemente haben deutlichen visuellen Abstand zueinander (Luftigkeit), insbesondere die Formulare und Karten schweben isoliert auf dem Hintergrund.
*   **Scroll-Verhalten:** Standard vertikales Scrollen. Teilweise horizontale Scroll-Container (Slider) in der Galerie-Sektion.

## 3. SEITENSTRUKTUR & FLOW

Die Website wirkt wie eine Single-Page-Application (SPA) oder eine Multi-Page-Site mit sehr flacher Hierarchie.

### A. Globaler Header (Navigation)
*   **Links:** Logo-Symbol (Monitor mit Ausrufezeichen) in einem abgerundeten Rechteck.
*   **Mitte:** Großer Schriftzug „HOME“ (variiert je nach Seite).
*   **Rechts:** Sprachwechsler (Flagge DE), Navigationslinks: Home, Buchen, Order Status, Modell aussuchen.
*   **Stil:** Dunkler Hintergrund (fast schwarz/dunkelgrau), weiße Schrift.

### B. Homepage (Landing)
1.  **Hero Sektion:**
    *   Hintergrund: Bewegtbild oder großes Foto einer 3D-Druck-Werkstatt/Drucker in Aktion.
    *   Zentrales Element: Riesige Typografie „3D-PRINT-HUB“.
    *   Overlay-Card: Ein abgerundetes Rechteck (Beige/Orange-Ton) mit Begrüßungstext und Pfeil nach unten.
    *   **Interaktionsebene:** Beim Klick/Scroll öffnet sich ein erweitertes Menü/Overlay mit:
        *   Darkmode-Toggle (Switch).
        *   Drei großen Pill-Shape Buttons: „Buchen“, „Status“, „Mehr erfahren!“.
        *   Newsletter-Box darunter mit Drucker-Icon.
2.  **Showcase Slider:**
    *   Horizontaler Slider mit Bildern von Druckbeispielen (z.B. grünes Boot, Zahnrad, Design-Objekte).
    *   Overlay-Texte auf den Bildern (z.B. „Hochqualitative Drucke“).
    *   Button: „Discover more“ (länglich, orange).
3.  **Über uns (About):**
    *   Textlastiger Block auf texturiertem Hintergrund (Kupfer/Braun Raster).
    *   Inhalt: Willkommenstext, Bulletpoints („Warum 3D Print Hub?“).
4.  **Team Sektion („Ihre Profis“):**
    *   Zwei markante Profilkarten.
    *   Runde Profilbilder, Namen, Titel („Co-CEO“).
    *   Hintergrund der Karten: Auffällige Farbverläufe (Aurora-Stil: Blau/Lila vs. Weiß/Orange).
    *   Action-Buttons in den Karten: „Besuche mich auf...“ (schwarz mit weißer Schrift).
5.  **Footer:**
    *   Minimalistisch, Copyright-Hinweis, Impressum-Link.

### C. Buchen (Booking Flow)
*   **Hintergrund:** Durchgehendes Raster-Muster (Orange/Braun).
*   **Formular-Container:** Weißer, schwebender Container mit abgerundeten Ecken.
*   **Schritt 1:** Dropdown zur Auswahl der Bestellart (Datei, Text, Link).
*   **Schritt 2:** Eingabefelder (Name, Email, Datei-Upload, Checkboxen).
*   **Preise-Info:** Unterhalb des Formulars eine grafische Erklärung der Preisgestaltung (Würfel-Icon = Volumenpreis, Uhr-Icon = Zeitpreis, Beispielrechnung).

### D. Order Status
*   Zentrales Eingabefeld für „Deine Bestellnummer“.
*   Darunterliegende Ergebnistabelle (Code, Status, Details & Name, Prozent).
*   Design: Tabelle ist transparent oder halbtransparent auf dem Raster-Hintergrund, weiße Schrift oder hoher Kontrast.

### E. Galerie & Materialien
*   **Modell aussuchen:** Split-Screen Auswahl zwischen externen Quellen (Logos von „Thingiverse“ und „MakerWorld“).
*   **Galerie:** Full-Width Slider mit Pfeil-Navigation.
*   **Materialien:** 3-Spalten-Layout. Jede Spalte zeigt eine Materialart (PLA Rot, Grün, Orange) mit Beschreibung, „Jetzt bestellen“-Button und einem Bild einer Vase in der entsprechenden Farbe.

## 4. TYPOGRAFIE

*   **Haupt-Schriftart (Headings):** Eine fette, kondensierte Sans-Serif Schrift (ähnlich *Impact*, *Bebas Neue* oder *Oswald*). Wirkt industriell und laut.
    *   Anwendung: „3D-PRINT-HUB“, „PREISE“, „GALERIE“.
*   **Sekundär-Schriftart (Body & UI):** Eine moderne, gut lesbare Sans-Serif (ähnlich *Roboto*, *Open Sans* oder *Inter*).
    *   Anwendung: Fließtexte, Button-Beschriftungen, Formularfelder.
*   **Hierarchie:** Extrem großer Kontrast zwischen den Display-Überschriften (sehr groß) und dem Informationstext.

## 5. FARB- & DESIGN-SYSTEM

*   **Primärfarbe (Akzent):** Ein warmes, entsättigtes Orange / Terrakotta / Kupfer (ca. `#D97E55` oder `#CC6A45`). Wird für Hintergründe, Overlay-Karten und Buttons genutzt.
*   **Sekundärfarbe (Basis):** Dunkelgrau / Fast Schwarz (`#222222`) für Header und Textelemente.
*   **Hintergrund:**
    *   Spezifisches Muster: Ein feines Raster (Grid) auf dem orangen Hintergrund, das an eine Heizbett-Platte eines 3D-Druckers oder Millimeterpapier erinnert.
*   **UI-Elemente:** Weiß (`#FFFFFF`) für Formular-Container und Eingabefelder.
*   **Verläufe:** Starke Nutzung von „Aurora“-Gradients (verschwommene Farbwolken) in den Team-Karten.

## 6. KOMPONENTEN & UI-ELEMENTE

*   **Buttons:**
    *   Form: Stark abgerundet (Pill-Shape) oder abgerundete Ecken (ca. 8-12px Radius).
    *   Stil: Solid Color (Weiß mit schwarzem Text ODER Orange mit weißem Text).
    *   Schatten: Leichte Drop-Shadows für Tiefe.
*   **Input-Felder:**
    *   Weißer Hintergrund, grauer Border, abgerundete Ecken (ca. 6px).
    *   Fokus-Status: Blauer oder oranger Rahmen.
*   **Karten (Cards):**
    *   Überwiegend abgerundete Ecken (ca. 16-24px).
    *   Inhalt zentriert.
*   **Toggle Switch (Darkmode):**
    *   Großes UI-Element, Pill-Shape, Kreis als Indikator.
*   **Chat Widget:**
    *   Floating Action Button (FAB) unten rechts, orange, Sprechblasen-Icon.

## 7. INTERAKTION & BEWEGUNG

*   **Micro-Interactions:** Buttons haben vermutlich einen Scale-Effekt oder Farbwechsel bei Hover.
*   **Slider:** Manuelle Navigation über Pfeile links/rechts.
*   **Modals/Overlays:** Die „Willkommen“-Karte auf der Home-Seite wirkt wie ein festes Overlay, das Inhalte verdeckt oder enthüllt.
*   **Formular-Logik:** Konditionale Anzeige (Schritt-für-Schritt). Nach Auswahl im Dropdown erscheint der Rest des Formulars.

## 8. BILDER & MEDIEN

*   **Hero-Hintergrund:** Sollte Tech-Vibe ausstrahlen (Nahaufnahmen von Extrudern, Druckbetten, mechanischen Teilen).
*   **Produktfotos:** Freigestellte Objekte (Vas, Benchy-Boot) oder Makro-Aufnahmen, um die Druckqualität (Layer-Lines) zu zeigen.
*   **Icons:** Minimalistische Line-Icons oder gefüllte Icons (Drucker, Würfel, Uhr) zur visuellen Unterstützung der Preisliste.

## 9. RESPONSIVE VERHALTEN

*   **Mobile:**
    *   Die horizontalen Slider werden zu Swipe-Containern oder stapeln sich vertikal.
    *   Das Grid der Team-Sektion und Materialien bricht auf 1 Spalte um.
    *   Die Schriftgröße der massiven Headlines („3D-PRINT-HUB“) skaliert herunter, bleibt aber dominant.
    *   Formulare nutzen die volle Breite des Bildschirms abzüglich Padding.

## 10. TECHNISCHE ABLEITUNG (Für GitHub Pages)

*   **HTML:** Semantische Struktur (`<header>`, `<main>`, `<section>`, `<footer>`). Nutzung von `<form>` für die Booking-Sektion.
*   **CSS:**
    *   Nutzung von CSS Grid für das Layout und Flexbox für die Komponenten-Ausrichtung.
    *   CSS Variables für die Farben (Orange, Grau, Weiß) um Dark-Mode einfach umzusetzen.
    *   Hintergrund-Pattern via CSS `background-image: repeating-linear-gradient(...)` oder einem SVG-Pattern realisieren.
*   **JavaScript:**
    *   Logik für den Slider.
    *   Logik für das Multi-Step-Formular (Ein-/Ausblenden von Feldern).
    *   Einfache Preisberechnungs-Logik (Client-Side).
    *   Darkmode-Toggle Logik (Klasse auf `body` toggeln).

## 11. DESIGN-ZUSAMMENFASSUNG (Die "Goldenen Regeln")

1.  **Background Texture is Key:** Das orange/braune Raster-Muster ist das identitätsstiftende Merkmal der Content-Seiten.
2.  **Typography Contrast:** Kombiniere massive, industrielle Headlines mit sauberer, kleinerer Body-Text-Schrift.
3.  **Roundness:** Fast alle Container, Buttons und Eingabefelder haben deutlich abgerundete Ecken. Nichts ist komplett scharfkantig.
4.  **Floating Elements:** Content-Boxen (insb. Formulare) müssen sich durch Schatten und weiße Farbe klar vom farbigen Hintergrund abheben („Card Look“).
5.  **Vibrant Accents:** Nutze Verläufe in den Profilkarten, um Modernität in das sonst eher technisch-mechanische Design zu bringen.
