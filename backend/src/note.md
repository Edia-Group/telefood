# Librerie utili
Both class-transformer and class-validator are used for validation in Nestjs Pipes:
[Che robba so le pipe](https://docs.nestjs.com/pipes) e 
[nestjs Pipes validation](https://docs.nestjs.com/techniques/validation#using-the-built-in-validationpipe)

## [class-transformer](https://www.npmjs.com/package/class-transformer)
It is used to properly map Plain JS objects to entities or DTOs so that you can then use the various class methods for each object.
See the example of users in the docs link


## [class-validator](https://www.npmjs.com/package/class-validator)
Useful for using validation through validators placed on a class, such as @IsEmail(), @IsInt(), @Min(0), @Max(10) etc.


# Middleware
## [nestjs middlewares](https://docs.nestjs.com/middleware)
To register middleware, a module must implement NestModule and then you must indicate the controller or direct path to which to apply it.