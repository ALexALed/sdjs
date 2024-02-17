IIFE for load module

Most compiled languages can handle circular dependencies easily: they compile each module into low-level instructions, then link those to resolve dependencies before running anything. But interpreted languages usually run code as they're loading it, so if X is in the process of loading Y and Y tries to call X, X may not (fully) exist yet.

import vs. require

Circular dependencies work JavaScript's import syntax because we can analyze files to determine what needs what, get everything into memory, and then resolve dependencies. We can't do this with require-based code because someone might create an alias and call require through that or eval a string that contains a require call. (Of course, they can also do these things with the function version of import.)
