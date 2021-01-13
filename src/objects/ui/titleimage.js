import { UiImage } from '../../util/ui-image';
import spriteSheet from '../../../resources/sprites/sprites.png';

export class RageTextImage extends UiImage {
  constructor() {
    super(108.5, 30, 0, 393, 141, 44, 3, 'title', spriteSheet);
  }
}

export class KillTextImage extends UiImage {
  constructor() {
    super(
      144.5, 170,
      0, 437,
      117, 44,
      3, 'title', spriteSheet
    );
  }
}

export class AuthorImage extends UiImage {
  constructor() {
    super(12, 480 - 20 * 4, 90, 667, 23, 17, 3, 'author', spriteSheet);
  }
}