# Zupaa
Starter theme with fast(er)(est) stack.

###Fonts
####Remote web fonts
If possible, include webfont JS with library. See [Adding stylesheets (CSS) and JavaScript (JS) to a Drupal 8 theme](https://www.drupal.org/docs/8/theming-drupal-8/adding-stylesheets-css-and-javascript-js-to-a-drupal-8-theme).

Example:

    my_library:
      css:
        component:
          https://fonts.googleapis.com/css?family=Ubuntu:400,700,400italic,700italic: { type: external, minified: true }

####Local web fonts
Place font files in `/fonts` directory and put @font-face declarations in `/styles/global/_fonts.scss`, start file path with `../`, because they will be called from 