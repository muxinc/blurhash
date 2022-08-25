import type { NextPage } from 'next';

import MuxPlayer from '@mux/mux-player-next';

const Home: NextPage = () => {
  return (
    <>
      <MuxPlayer
        streamType="on-demand"
        playbackId="FuJSYrK0014ec2LPnm11bzC2MAySAQPqA"
      />
    </>
  );
};

export default Home;
