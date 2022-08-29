import { useState, useEffect } from 'react';

import useIsBrowser from './useIsBrowser';
import getPoster from '../utils/getPoster';

/**
 * A magic hook which returns a placeholder poster url
 * which is swapped out for a full-res poster url once it's downloaded
 */
const usePoster = (
  playbackId: string | undefined,
  thumbnailTime: number | undefined = 0
) => {
  // TODO: what happens for like, signed urls?
  // TODO: what if a user defines their own poster?
  // TODO: should we add an option to skip the blur placeholder?
  const [poster, setPoster] = useState(
    () => getPoster(playbackId, thumbnailTime, true) || ''
  );

  // on load, start downloading a higher-resolution poster
  const isBrowser = useIsBrowser();
  // TODO: what are the SEO implications of having a low-res poster at first?
  //       and speaking of, will google even pick up a lazy-loaded mux player?
  useEffect(() => {
    if (isBrowser) {
      const hiResPoster = getPoster(playbackId, thumbnailTime, false);
      if (hiResPoster) {
        const image = new Image();
        const setHiResPoster = () => setPoster(hiResPoster);

        image.addEventListener('load', setHiResPoster);
        image.src = hiResPoster;
        return () => image.removeEventListener('load', setHiResPoster);
      }
    }
  }, [playbackId, thumbnailTime, isBrowser]);

  return poster;
};

export default usePoster;
