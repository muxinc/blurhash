import React from 'react';
import dynamic from 'next/dynamic';

import { MuxPlayerProps } from '@mux/mux-player-react';

const MuxPlayer = dynamic(() => import('./MuxPlayer'), { ssr: false });

export default function NextStaticPlayer(props: MuxPlayerProps) {
  return <MuxPlayer {...props} />;
}
