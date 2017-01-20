(function ($, Drupal) {

  'use strict';

  /**
   * Initialise the flexslider JS.
   */
  Drupal.behaviors.debugBrowserync = {
    attach: function (context, settings) {
      $('body', context).append('<script async src="http://' + location.hostname + ':3000/browser-sync/browser-sync-client.js?v=2.18.5"></script>');
    }
  };

})(jQuery, Drupal);
