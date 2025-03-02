# How to use Angular CLI to create/generate components & services for your Angular project:

## How to generate a new component:

Navigate to your main project directory. Run the following command:

```bash
ng g c components/header
``` 

Explanation: 
* g stands for generate
* c stands for component
* header is the name of the component 

The above command will generate a new component with the name HeaderComponent in the components/header folder.

## How to generate a page component:

Navigate to your main project directory. Run the following command:

```bash
ng g c pages/product-details
``` 

Explanation: 
* g stands for generate
* c stands for component
* product-details is the name of the component 

The above command will generate a new component with the name ProductComponent in the pages/product folder.

## How to generate a new service:

Navigate to your main project directory. Run the following command:

```bash
ng g s services/auth
```

Explanation: 
* g stands for generate
* s stands for service
* auth is the name of the service 

The above command will generate a new service with the name AuthService in the services/auth folder.

## How to generate a new directive:

Navigate to your main project directory. Run the following command:

```bash
ng g d directives/click-outside
```

Explanation: 
* g stands for generate
* d stands for directive
* click-outside is the name of the directive 

The above command will generate a new directive with the name ClickOutsideDirective in the directives/click-outside folder.

## How to generate a new pipe:

Navigate to your main project directory. Run the following command:

```bash
ng g p pipes/capitalize
```

Explanation: 
* g stands for generate
* p stands for pipe
* capitalize is the name of the pipe 

The above command will generate a new pipe with the name CapitalizePipe in the pipes/capitalize folder.

## How to generate a new module:

Navigate to your main project directory. Run the following command:

```bash
ng g m modules/auth
```

Explanation: 
* g stands for generate
* m stands for module
* auth is the name of the module 

The above command will generate a new module with the name AuthModule in the modules/auth folder.

## How to generate a new routing module:

Navigate to your main project directory. Run the following command:

```bash
ng g m modules/auth
```

Explanation: 
* g stands for generate
* m stands for module
* auth is the name of the module 

The above command will generate a new module with the name AuthModule in the modules/auth folder.

## How to generate a new guard:

Navigate to your main project directory. Run the following command:

```bash
ng g g guards/auth
```

Explanation: 
* g stands for generate
* g stands for guard
* auth is the name of the guard 

The above command will generate a new guard with the name AuthGuard in the guards/auth folder.

## How to generate a new resolver:

Navigate to your main project directory. Run the following command:

```bash
ng g r resolvers/auth
```

Explanation: 
* g stands for generate
* r stands for resolver
* auth is the name of the resolver 

The above command will generate a new resolver with the name AuthResolver in the resolvers/auth folder.

## How to generate a new interceptor:

Navigate to your main project directory. Run the following command:

```bash
ng g i interceptors/auth
```

Explanation: 
* g stands for generate
* i stands for interceptor
* auth is the name of the interceptor 

The above command will generate a new interceptor with the name AuthInterceptor in the interceptors/auth folder.

## How to generate a new class:

Navigate to your main project directory. Run the following command:

```bash
ng g c classes/auth
```

Explanation: 
* g stands for generate
* c stands for class
* auth is the name of the class 

The above command will generate a new class with the name AuthClass in the classes/auth folder.

## How to generate a new interface:

Navigate to your main project directory. Run the following command:

```bash
ng g i interfaces/auth
```

Explanation: 
* g stands for generate
* i stands for interface
* auth is the name of the interface 

The above command will generate a new interface with the name AuthInterface in the interfaces/auth folder.

## How to generate a new enum:

Navigate to your main project directory. Run the following command:

```bash
ng g e enums/auth
```

Explanation: 
* g stands for generate
* e stands for enum
* auth is the name of the enum 

The above command will generate a new enum with the name AuthEnum in the enums/auth folder.

## Notes: 
Only generate the components, services, directives, pipes, modules, guards, resolvers, interceptors, classes, interfaces, enums in the same folder. Otherwise, the Angular CLI will throw an error.

Only generate the needed components, services, directives, pipes, modules, ... You might not be needing all of them.