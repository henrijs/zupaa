(function ($, Drupal) {

  'use strict';

  /**
   * Initialise the flexslider JS.
   */
  Drupal.behaviors.debugLayout = {
    attach: function (context, settings) {
      $('.layout-container', context).wrapInner('<div class="js-debug-layout" />');
    }
  };

})(jQuery, Drupal);
