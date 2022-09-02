import React from 'react';

import { MuxPlayerProps } from '@mux/mux-player-react';

import Wrapper from './Wrapper';
import LoadingOverlay from './LoadingOverlay';
import BrowserOnlySuspense from './BrowserOnlySuspense';

const MuxPlayer = React.lazy(() => import('@mux/mux-player-react'));

interface Props extends MuxPlayerProps {
  blurHashBase64: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const MuxPlayerSuspense = ({
  className = '',
  style,
  blurHashBase64,
  width,
  height,
  ...playerProps
}: Props) => {
  // TODO: this loads on browser load. Could we do on intersection instead?
  // TODO: what happens if the user excludes these props?
  return (
    <Wrapper
      blurHashBase64={blurHashBase64}
      width={width}
      height={height}
      className={className}
      style={
        {
          '--media-background-color': 'transparent',
          ...style,
        } as React.CSSProperties
      }
    >
      <BrowserOnlySuspense fallback={<LoadingOverlay />}>
        <MuxPlayer {...playerProps} />
      </BrowserOnlySuspense>
    </Wrapper>
  );
};

export default MuxPlayerSuspense;
