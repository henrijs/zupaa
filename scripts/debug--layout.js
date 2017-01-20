(function ($, Drupal) {

  'use strict';

  /**
   * Initialise the flexslider JS.
   */
  Drupal.behaviors.debugLayout = {
    attach: function (context, settings) {
      $('.l-container', context).wrapInner('<div class="debug-layout" />');
    }
  };

})(jQuery, Drupal);
