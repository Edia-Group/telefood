# Cambiamenti importanti che tutti devono sapere

## 27/06
 Aggiunta colonna "environment" sulla tabella tenants per distinguere quali istanze di bot devono essere startate in locale e quali no. Questo perchè solamente un singolo server può essere registrato al webhook a cui telegram inoltra le interazioni dell'utente col bot. Se lo stesso bot viene startato sia in locale che su Koyeb in prod, il bot non funziona più perchè i due backend vanno in conflitto. 
 - dev: istanze che devono essere eseguite solamente in locale sulla tua macchina
 - test: istanze che devono essere eseguite solamente sulla macchina di test di Koyeb
 - prod: istanze che devono essere eseguite solamente sulla macchina di produzione "reale" Koyeb



