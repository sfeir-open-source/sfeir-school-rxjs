# Exercise 0

Exercise taken from advent of code 2019 day 1.

Fill the 3 following methods in code.ts: getModuleMasses/getRequiredFuel/getTotalRequiredFuel (see after)

1. Replace in main.ts the import of `solution` by `code`
1. Remove `declare` for the function `getModuleMasses`, `getRequiredFuel`, `getTotalRequiredFuel`
1. Implement the functions

## getModuleMasses

You should return the list of number of the file data.txt and transform it to numbers. You should use `readInputFile` for this method. Each line represent a mass.

## getRequiredFuel

You should get the sum of all requiredFuel for each masses coming from file. Use `getRequiredFuelForMass` to calculate the requiredFull for one mass.

## getTotalRequiredFuel

getRequiredFuel gives you the fuel need but it implies that it will add new masses. So getTotalRequiredFuel need to calculate the total of sub-masses of all masses. To get the sub-masses of 1 mass, use `accumulateFuelForMass` for this. Warning accumulateFuelForMass is a generator !

## Tips

Arrays.flatMap flatten an array of array ;)
You could create an Array of a generator (if finite values) using [...myGenerator()]
