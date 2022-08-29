import React from 'react';

type Props = {
  poster: string;
};
const Placeholder = ({ poster }: Props) => (
  <div data-mux-player-react-suspense-placeholder>
    <img src={poster} alt="" />
    <svg aria-hidden="true" viewBox="0 0 100 100">
      <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"></path>
    </svg>
  </div>
);

export default Placeholder;
