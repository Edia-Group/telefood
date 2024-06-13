# Librerie utili
sia class-transformer che class-validator sono usati per la validazione nelle Pipe di Nestjs:
[Che robba so le pipe](https://docs.nestjs.com/pipes) e 
[nestjs Pipes validation](https://docs.nestjs.com/techniques/validation#using-the-built-in-validationpipe)

## [class-transformer](https://www.npmjs.com/package/class-transformer)
Serve a mappare bene Plain JS objects verso entità o DTO in modo da poter poi usare i vari metodi di classe per ogni oggetto.
Vedi esempio degli utenti nel link dei docs

## [class-validator](https://www.npmjs.com/package/class-validator)
Utile per usare validazione tramite validatori messi su una classe, come @IsEmail(), @IsInt(), @Min(0), @Max(10) ecc


# Middleware
## [nestjs middlewares](https://docs.nestjs.com/middleware)
Per registrare dei middleware, un modulo deve implementare NestModule e poi devi indicare controller o path diretto su quali applicarlo
