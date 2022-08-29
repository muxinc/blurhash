import React from 'react';

interface Props {
  blurHashBase64: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
const Wrapper = ({
  blurHashBase64,
  width,
  height,
  className = '',
  style,
  children,
}: Props) => (
  <div className={className} style={style} data-mux-player-lazy>
    <img src={blurHashBase64} width={width} height={height} alt="" />
    {children}
  </div>
);

export default Wrapper;
