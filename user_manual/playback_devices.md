---
title: Afspilningsenheder
layout: default
parent: Brugermanual
nav_order: 1
has_children: false
---

OS2Display kan bruges med mange forskellige afspilningsenheder.

## Krav til afspilningsenheden
- Ved opstart skal den automatisk kunne åbne en webbrowser i fuld skærm og vise en bestemt URL (det der ofte kaldes kiosk-mode)
- Browseren skal være en moderne standard-browser, der understøtter javascript
- Computeren skal have nok RAM til at vise video, hvis det er et behov man har

## Styring af afspilningsenheder
Har man mange storskærme på flere lokationer opstår hurtigt et behov for at kunne overvåge og fjernadministere afspilningsenhederne.

- Overvåge om skærme er tændt og viser det de skal
- Ændre tænd/sluk tidspunkt
- Opdatere operativsystem og software på afspilningsenheden
- Genstarte afspilningsenheden

Disse funktioner ligger IKKE i OS2Display. OS2Display bruges kun til at lægge indhold i spillelister som knyttes til skærme. "Device management" er ikke i scope for OS2Display.


Har man brug for styring af sine afspilningsenheder skal det ske via et andet system. 



## Eksempler på afspilningsenheder

### OS2BorgerPC Kiosk 
OS2BorgerPC Kiosk er en slank Ubuntu Linux installation særlig beregnet til kiosk computere. Det installeres nemt på kiosk-computeren via image på et USB-stick. OS2BorgerPC-systemet har webmodul til enhedsstyring.

*Benyttes f. eks. på DOKK1, i Københavns Kommune og i Sønderborg Kommune*

OS2BorgerPC Kiosk kan installeres på de fleste computere med 64-bit Intel/AMD-arkitektur. 

Der er også lavet en udgave til Raspberry Pi 4.

Link til [OS2BorgerPC](https://www.os2.eu/os2borgerpc)


### Chrome Enterprise licens på Cromebox
Chromeboxe kan sættes i kiosk-tilstand. Det er et krav at  enheden er tilmeldt en enterprise-administrationskonto (Google Workspace, Chrome Enterprise eller har en Chrome Device Management-licens).

*Benyttes i Aarhus Kommune*

### Windows Enterprise licens på PC
Et script sætter computeren i kiosk-mode. Konfiguration sker efter Windows Best Practices for Windows Kiosk PC.

*Benyttes f. eks. i Aarhus Kommune, hvor det er under udfasning*



### Porteus Kiosk 
Et Linux-baseret system der kan installeres på computere med 64-bit Intel/AMD-arkitektur. Det installeres via USB-stick. Porteus Kiosk  indeholder ikke modul til enhedsstyring.

*Benyttes i Ringkøbing-Skjern Kommune*

Link til [Porteus Kiosk](https://porteus-kiosk.org/)







