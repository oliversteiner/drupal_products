<?php

namespace Drupal\products\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'AlbumTracksBlock' block.
 *
 * @Block(
 *  id = "album_tracks",
 *  admin_label = @Translation("Album tracks block"),
 * )
 */
class AlbumTracksBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $build['#theme'] = 'album_tracks';
     $build['album_tracks']['#markup'] = 'Implement AlbumTracksBlock.';

    return $build;
  }

}
