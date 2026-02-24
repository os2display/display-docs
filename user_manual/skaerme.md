---
title: Skærme
layout: default
parent: Sådan bruger du OS2Display
nav_order: 5
has_children: false
---
# Skærme

INDSÆT BILLEDE

På oversigten over skærme, kan du se status på skærmene: 

**Grøn**: Klienten modtager data. Hvis klienten holder op med at modtage data, vil den forblive grøn den første time for ikke at advare om midlertidige netværksproblemer eller lignende. 

**Rød**: Klienten har ikke modtaget data den seneste time. 

**Gul**: Klienten kører ikke sidste version af koden. Denne fejlmeddelelse skyldes typisk, at skærmen har været offline siden sidste opdatering af koden. 

**Tilkobl**: Skærmen er ikke koblet til en klient. 

## Opret ny skærm

INDSÆT BILLEDE

Beskrivende felter:
- Skærmens navn
- Beskrivelse af skærmen
- Skærmens lokation
- Størrelse på skærmen
- Skærmens opløsning
- Skærmens orientering

 Disse felter er alle udelukkende beskrivende for skærmen og gør ikke nogen forskel for dens funktion. 
 Koden tager automatisk hensyn til skærmens opløsning uafhængigt af, hvad der måtte stå i feltet. 

#### Layout 

Under layout kan du vælge et af de tilgængelige layouts på skærmen. Det mest enkle layout er fuld skærm, hvor der blot vises ét billede på skærmen ad gangen. 
Men det er også muligt at dele skærmen op i flere **regioner**. 

Layoutet **Touch** skiller sig ud ved at inkludere trykknapper i bunden af skærmen. Alle regioner på skærmen kan indeholde én eller flere **spillelister**. 

INDSÆT BILLEDE

Under spillelister tilknyttet regionen, kan du fremsøge og udvælge de spillelister, som skal vises i de forskellige regioner. 
Hvis der er flere spillelister i en region, vil alle slides fra den ene spilleliste blive vist, hvorefter alle fra den næste spilleliste i rækken bliver vist. 
Hvis der kun er en spilleliste med ét slide, vil regionen blot vise dette ene slide konstant. 
Det er ikke muligt at tilknytte slides direkte til regionerne. De skal altså først tilknyttes en spilleliste, selvom man blot ønsker at vise et fast slide i feltet. 

#### Touch 

Hvis en region er defineret som touch, vil spillelister indsat i området automatisk vises som en knap for hvert slide i spillelisten. 
Antallet af knapper udvides og mindskes automatisk alt efter hvor mange slides, der er i spillelisten. 

#### Vis delte spillelister 

Hvis man sætter flueben i Vis delte spillelister, vil rullemenuen kun vise spillelister, som er delt fra andre områder. Disse slides vil automatisk få adgang til tema og medier fra kilde-området. 
