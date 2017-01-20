(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.zupaaDemo = {
    attach: function (context, settings) {

      // Log click event to console.

      $('a', context).on('click', function(e) {
        console.log(e);
      });

    }
  };

})(jQuery, Drupal);