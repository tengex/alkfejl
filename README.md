# Alkalmazások fejlesztése feladat dokumentációja
## Cég belső szállítmányozását nyilvántartó rendszer

!!! https://github.com/pessaai/ckd193-beadando

### 1. Követelményanalízis

##### 1.1. Célkitűzés

A cél olyan program létrehozása, mely egy cég belső szállítmányozását nyilvántartó alkalmazás leegyszerűsített változata. A dolgozók be tudjanak jelentkezni, tudják saját túráikat felvenni, lezárni; továbbá az ehhez szükséges adatok kezelésére (járművek, telephelyek adatai, stb.) is legyen lehetőség egy admin felhasználó által.

##### 1.2. Szakterületi fogalomjegyzék
- Dolgozó (Employee): a cég alkalmazottja, aki a szállítmányt elszállítja egyik telephelyről a másikra egy járművel. Employee ID-val, nicknévvel, teljes névvel, nemmel, email címmel, telefonszámmal és jelszóval rendelkező objektum. Státusza lehet aktív vagy inaktív.
- Jármű (Vehicle): a cég flottájába tartozó teherautó, melyet szállításra használnak. Vehicle ID-val, rendszámmal, gyártóval, típussal és kategóriával rendelkező objektum. Státusza egyrészt lehet aktív vagy inaktív, másrészt szabad vagy foglalt (utóbbi kettő csak aktív státusz esetén értelmezett).
- Telephely (Site): a cég telephelyei között történik a szállítás. Site ID-val, névvel, országgal, várossal, címmel és irányítószámmal rendelkező objektum.
- Túra (Trip): a szállítás adatait tartalmazza egy túra. Trip ID-val, induló- és céltelephellyel, dolgozóval, szállítmánnyal, járművel és időintervallummal rendelkező objektum. Ha nem befejezett, van lehetőség törölni.
- Szállítmány (Shipment): a szállítmány adatait tartalmazza. Egy szállítmányt többször is szállíthatnak. Shipment ID-val, szöveges leírással, típussal és súllyal rendelkező objektum.

##### 1.3. Funkcionális elvárások
- Guestként szeretném tudni kilistázni az összes dolgozót, járművet és telephelyet, adataikat megtekinteni.
- Employeeként szeretnék tudni bejelentkezni az oldalra.
- Employeeként szeretnék tudni kijelentkezni az oldalról.
- Employeeként szeretném tudni az adataimat módosítani.
- Employeeként szeretném tudni kilistázni az összes dolgozót, járművet és telephelyet, adataikat megtekinteni.
- Employeeként szeretnék tudni az általam eddig vezetett járművekre szűrt listát megtekinteni.
- Employeeként szeretnék tudni a jelenleg szabad járművekre szűrt listát megtekinteni.
- Employeeként szeretném tudni kilistázni az összes szállítmányt, adataikat megtekinteni.
- Employeeként szeretnék tudni létrehozni új szállítmányt.
- Employeeként szeretném tudni kilistázni a saját túráimat, adataikat megtekinteni.
- Employeeként szeretnék tudni létrehozni új saját túrát.
- Employeeként szeretném tudni saját megkezdett túrámat befejezni.
- Adminként szeretném tudni az Employee funkciókat használni.
- Adminként szeretnék tudni felhasználókat felvenni és aktívvá/inaktívvá tenni, adataikat módosítani.
- Adminként szeretnék tudni létrehozni új járművet.
- Adminként szeretném tudni a járművek adatait módosítani és járműveket aktívvá/inaktívvá tenni.
- Adminként szeretném tudni a túrák adatait módosítani és nem befejezett túrákat törölni.
- Adminként szeretném tudni a szállítmányok adatait módosítani.

##### 1.4. Nem funkcionális elvárások
- Felhasználóbarát elrendezés és kinézet.
- Gyors működés.
- A rendszer az esetek legalább 90%-ában rendelkezésre áll.
- Biztonságos működés: jelszavak biztonságosan vannak tárolva, bizonyos funkciók csak megfelelő jogkörrel érhetők el. Hibásan bevitt adatok esetén a program jelezzen a felhasználónak az érintett mezőknél.

##### 1.5. Szerepkörök

- Guest: az összes dolgozó, jármű és telephely adatának megtekintésére képes.
- Employee: a Guest jogaival rendelkezik, továbbá saját túrái kezelésére (létrehozás, befejezés) képes, és az ehhez szükséges szállítmánykezelésre (létrehozás, adatok megtekintése).
- Admin: az Employee jogaival rendelkezik, továbbá kezelheti a dolgozókat (létrehozhat, módosíthat vagy aktiválhat/inaktiválhat), kezelheti a járműveket (létrehozhat, módosíthat vagy aktiválhat/inaktiválhat), kezelheti a túrákat (módosíthat és nem befejezett túrát törölhet), valamint módosíthatja a szállítmányok adatait. Csak egy admin van.

##### 1.6. Használati eset diagramok: a szerepkörök és az elérhető funkciók kapcsolatát jelenítik meg, ha kell, akkor esetenként rövid magyarázó szöveggel.

##### 1.7. Egy folyamat részletezése
1. A dolgozó az oldalon bejelentkezik.
2. Bejelentkezés után megnyomja az "Új szállítmány" gombot.
3. Felviszi a szállítmány adatait.
4. Megnyomja a "Mentés" gombot.
5. Az "Új túra" gombra kattint.
6. A megjelenő oldalon kiválasztja az első listából a szállítandó szállítmányt.
7. A második listából kiválasztja az induló telephelyet.
8. A harmadik listából kiválasztja az érkező telephelyet.
9. A negyedik listából kiválaszt egy szabad járművet.
10. Ezután megnyomja a "Túra kezdése" gombot.
11. Ekkor látszódik a főoldalon, hogy folyamatban van egy túra.
12. Miután megérkezett a szállítmánnyal a célhoz, ennél a túránál a "Túra befejezése" gombra kattint.

### II. Tervezés

### III. Implementáció

### IV. Tesztelés

### V. Felhasználói dokumentáció
