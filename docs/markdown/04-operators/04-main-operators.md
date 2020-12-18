<!-- .slide: class="transition bg-blue" -->

# Main Operators

##==##

# Understand Marble diagram

![full-center h-600](./assets/images/marble-diagram-anatomy.svg)

##==##

# Creator - Of

> Converts the arguments to an observable sequence.

![center hm-600](./assets/images/of.png)

##==##

# Creator - From

> Creates an Observable from an Array, an array-like object, a Promise, an iterable object, or an Observable-like object.

![center hm-600](./assets/images/from.png)

##==##

# Creator - merge

> Creates an output Observable which concurrently emits all values from every given input Observable.

![center hm-600](./assets/images/merge.png)

##==##

# Creator - concat

> Creates an output Observable which sequentially emits all values from given Observable and then moves on to the next.

![center hm-600](./assets/images/concat.png)

##==##

# Transformation - Map

> Applies a given project function to each value emitted by the source Observable, and emits the resulting values as an Observable.

![center hm-600](./assets/images/map.png)

Notes:
Transform le contenu d'un stream

##==##

# Transformation - Scan

> Applies an accumulator function over the source Observable, and returns each intermediate result, with an optional seed value

![center hm-600](./assets/images/scan.png)

##==##

# Transformation - Reduce

> Applies an accumulator function over the source Observable, and returns the accumulated result when the source completes, given an optional seed value.

![center hm-600](./assets/images/reduce.png)

##==##

# Filtering - Filter

> Filter items emitted by the source Observable by only emitting those that satisfy a specified predicate.

![center hm-600](./assets/images/filter.png)
##==##

# Time - Debounce

> Emits a value from the source Observable only after a particular time span determined by another Observable has passed without another source emission.

![center hm-600](./assets/images/debounce.png)

##==##

# Transformation - TakeUntil

> Emits the values emitted by the source Observable until a notifier Observable emits a value.

![center hm-600](./assets/images/takeUntil.png)

##==##

# Time - Delay

> Delays the emission of items from the source Observable by a given timeout or until a given Date.

![center hm-600](./assets/images/delay.png)

##==##

# Utility - Tap

> Perform a side effect for every emission on the source Observable, but return an Observable that is identical to the source.

![center hm-600](./assets/images/tap.png)
