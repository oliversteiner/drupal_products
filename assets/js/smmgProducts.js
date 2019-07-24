(function($) {
  Drupal.behaviors.smmgProductsBehavior = {
    attach(context, settings) {
      $('#smmg-products', context)
        .once('smmgProductsBehavior')
        .each(() => {
          console.log('smmgProductsBehavior 8');

          // Tracklist toggle Info

          const $tracklistItem = $('.product-track-list-item-trigger');

          console.log('$tracklistItem', $tracklistItem);

          return $tracklistItem.each(function(index) {
            console.log('index', index);
            const infoElemName = this.dataset.listItem;

            const $infoElem = $(
              '.product-track-list-item-info-' + index,
            );
            const $playerElem = $(
              '.product-track-list-item-preview-player-' + index,
            );
            $(this).click(function() {
              console.log('click');
              console.log($infoElem);

              $infoElem.toggle();
              $playerElem.toggle();
            });
          });
        });
    },
  };
})(jQuery, Drupal, drupalSettings);
