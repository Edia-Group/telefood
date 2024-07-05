# Cambiamenti importanti che tutti devono sapere

## 05/07
Leggi guide su come testare e debuggare miniapp tg:
[text](https://docs.google.com/document/d/1ZFopIMfVqP2MgXgOA1dRU71IUQRWwqWZXjbPx3u5LLc/edit)
[text](https://core.telegram.org/bots/webapps#testing-mini-apps)

## 29/06
Se i server di localtunnel sono instabili, cioè se npm run start:dev non funziona, allora devi fare manualmente lt --port 3000 e poi su un altro terminale npm run start:dev:nest

## 27/06
 Aggiunta colonna "environment" sulla tabella tenants per distinguere quali istanze di bot devono essere startate in locale e quali no. Questo perchè solamente un singolo server può essere registrato al webhook a cui telegram inoltra le interazioni dell'utente col bot. Se lo stesso bot viene startato sia in locale che su Koyeb in prod, il bot non funziona più perchè i due backend vanno in conflitto. 
 - dev: istanze che devono essere eseguite solamente in locale sulla tua macchina
 - test: istanze che devono essere eseguite solamente sulla macchina di test di Koyeb
 - prod: istanze che devono essere eseguite solamente sulla macchina di produzione "reale" Koyeb



