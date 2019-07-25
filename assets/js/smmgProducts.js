(function($) {
  Drupal.behaviors.smmgProductsBehavior = {
    $elements: {},
    product: {},
    tracklist: {},
    current_track: 0,
    attach(context, settings) {
      $('#smmg-products', context)
        .once('smmgProductsBehavior')
        .each(() => {
          // Tracklist toggle Info

          this.product = drupalSettings.product;
          this.tracklist = this.getTracklist();
          const $tracklistItem = $('.product-track-list-item-trigger');

          const $playerContainer = $('.audio-player-container');
          const $togglePlayerButton = $('.product-listen-all-previews-trigger');
          const $playButton = $('.audio-player-play-trigger');
          const $pauseButton = $('.audio-player-pause-trigger');
          const $nextTrackButton = $('.audio-player-next-track-trigger');
          const $previewTrackButton = $('.audio-player-preview-track-trigger');

          this.$elements = {
            playerContainer: $playerContainer,
            togglePlayerButton: $togglePlayerButton,
            playButton: $playButton,
            pauseButton: $pauseButton,
            nextTrackButton: $nextTrackButton,
            previewTrackButton: $previewTrackButton,
          };

          console.log('this.product', this.product);

          const scope = this;

          $playButton.click(function() {
            scope.playAll();
          });

          $pauseButton.click(function() {
            scope.pause();
          });

          $nextTrackButton.click(function() {
            scope.nextTrack();
          });

          $previewTrackButton.click(function() {
            scope.previewTrack();
          });

          $togglePlayerButton.click(function() {
            scope.togglePlayer();
          });

          return $tracklistItem.each(function(index) {
            console.log('index', index);
            const infoElemName = this.dataset.listItem;

            const $infoElem = $('.product-track-list-item-info-' + index);
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
    /**
     *
     */
    togglePlayer() {
      this.$elements.playerContainer.toggle();
    },

    /**
     *
     */
    playAll() {
      console.log('playAll');
      this.play();
    },

    play() {
      console.log('play');

      this.toggleAudioActivityBars();
      this.$elements.playButton.hide();
      this.$elements.pauseButton.show();
      const ct = this.current_track;

      const number = this.tracklist[ct].number;
      const title = this.tracklist[ct].title;
      const url = this.tracklist[ct].url;
      const sound = this.tracklist[ct].sound;

      this.showAudioTitle(number + '. ' + title);
      sound.play();

    },

    /**
     *
     */
    pause() {
      console.log('pauseAll');

      this.toggleAudioActivityBars();
      this.$elements.playButton.show();
      this.$elements.pauseButton.hide();

      const ct = this.current_track;
      const sound = this.tracklist[ct].sound;
      sound.pause();


    },

    /**
     *
     */
    nextTrack() {
      console.log('nextTrack');
      const ct = this.current_track;
      const max = this.tracklist.length;
      const sound = this.tracklist[ct].sound;

      let next_track = ct + 1;

      console.log('next_track', next_track);
      console.log('max', max);

      if (next_track < max) {
        sound.pause();

        this.current_track = next_track;
      }

      this.play();
    },

    /**
     *
     */
    previewTrack() {
      console.log('previewTrack');
      const ct = this.current_track;
      const sound = this.tracklist[ct].sound;

      let next_track = ct - 1;

      if (next_track < 0) {
        next_track = 0;
      }
      sound.pause();


      this.current_track = next_track;

      this.play();
    },

    /**
     *
     */
    toggleAudioActivityBars() {
      $('.bar').toggleClass('sound-on');
    },

    /**
     *
     */
    showAudioTitle(title) {
      $('.audio-player-display-content').text(title);
    },

    /**
     *
     * @return {number,title,url}
     */
    getTracklist() {
      const product = this.product;

      let trackList = [];

      let list = product.tracks.filter(track => {
        if (track.has_preview) {
          const number = track.number;
          const title = track.name;
          const url = track.preview.media_link;

          const sound = new Audio();
          sound.src = url;

          const new_track = {
            number: number,
            title: title,
            url: url,
            sound: sound,
          };

          trackList.push(new_track);
          return track;
        }
      });

      return trackList;
    },
  };
})(jQuery, Drupal, drupalSettings);
