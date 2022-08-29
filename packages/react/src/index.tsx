import React from 'react';

import { MuxPlayerProps } from '@mux/mux-player-react';

import Placeholder from './Placeholder';
import BrowserOnlySuspense from './BrowserOnlySuspense';

import usePoster from './hooks/usePoster';

const MuxPlayer = React.lazy(() => import('./MuxPlayer'));

interface Props extends MuxPlayerProps {
  className?: string;
  style?: React.CSSProperties;
}
const MuxPlayerSuspense = ({
  className = '',
  style,
  ...playerProps
}: Props) => {
  const poster = usePoster(playerProps.playbackId, playerProps.thumbnailTime);

  // TODO: this loads on browser load. Could we do on intersection instead?
  return (
    <div className={className} style={style} data-mux-player-lazy>
      <BrowserOnlySuspense fallback={<Placeholder poster={poster} />}>
        {/* 
          TODO: this still doesn't work the way I expect. 
          Since the poster has already been loaded for the placeholder component,
          I'd expect MuxPlayer would have the poster immediately upon loading.
          However, MuxPlayer loads with that black background
          and we have to wait a sec for the poster to load.
          Why? Or could we avoid the problem with a transparent-background player?
        */}
        <MuxPlayer {...playerProps} poster={poster} />
      </BrowserOnlySuspense>
    </div>
  );
};

export default MuxPlayerSuspense;
