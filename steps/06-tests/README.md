# 06-tests instructions

## How to run?

```Bash
cd ./steps
npm run 06-tests
```

## TODO

### 6.1

1. Écrivez un test qui valide l'objet qu'on reçoit quand on appelle `AppleService.getApples()` (\_type = 'Apple', a une propriété color, color vaut 'green' ou 'red', a une propriété isRotten)
2. Écrivez des tests pour `CompoteBakingService.bakeCompote()` et `ApplePieBakingService.bakeApplePie()` (objet reçu valide et cas d'erreur)

### 6.2

1. Écrivez un test qui valide qu'on a bien 1 seconde entre chaque pomme quand on appelle `AppleService.getApples()`
2. Écrivez un test pour vérifier le temps de cuisson de `CompoteBakingService.bakeCompote()`
3. Écrivez un test pour vérifier le temps de cuisson de `ApplePieBakingService.bakeApplePie()`
