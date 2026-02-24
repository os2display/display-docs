---
title: Troubleshooting
layout: default
parent: Sådan bruger du OS2Display
nav_order: 13
has_children: false
---

# Troubleshooting

### Fejl ved indlæsning af klient, før der er oprettet netværksforbindelse 

Visse enheder kan have problemer med at indlæse klienten korrekt, hvis netværksforbindelsen først bliver oprettet efter indlæsning af klienten er påbegyndt. 
I Aarhus anvendes et fix, hvor alle maskiner starter op med en online check-side, som først videresender til den korrekte URL, når der er opnået forbindelse til netværket. 

[History for public/online-check/index.html - os2display/display-client · GitHub](https://github.com/os2display/display-client/commits/develop/public/online-check/index.html)
 
 
### Sådan finder du versionsnummer på OS2Display  
 
Du kan undersøge hvilken version af OS2Display som er installeret, ved at kigge i filen release.json som er tilgængelig via browseren. 
 
Adressen er URL til admin-grænsefladen efterfulgt af /release.json 
 
For København er det f. eks.   
https://kkos2display.dk/admin/release.json 
 
 
 
 
