# 100-bonus-chevre-chaud instructions

## How to run?

```Bash
cd ./steps
npm run 100-bonus-chevre-chaud
```

## TODO

1. Créer le stream `painCuit$` qui va prendre une tranche de pain, puis la cuire (passer le pain au stream `cuisson$`)
2. Créer le stream `chevreChaud$` qui va assembler `painCuit$` et `fromageDeChevre$` et `miel` en les ajoutant dans un seul tableau
3. "Manger" le plat (faite un affichage dans la console)
