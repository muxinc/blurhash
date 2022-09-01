<div data-mux-player-lazy-loading>
  <svg aria-hidden="true" viewBox="0 0 100 100">
    <path
      d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
    />
  </svg>
</div>

<style>
  /* Overlay loading indicator on placeholder */
  [data-mux-player-lazy-loading] svg {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10%;
    transform: translate(-50%, -50%) rotate(0deg);
    fill: var(--media-icon-color, #fff);
    z-index: 1;
    animation: rotate 1s linear infinite;
  }
  @keyframes rotate {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  [data-mux-player-lazy-loading]:after {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--media-control-background, rgba(20, 20, 30, 0.5));
  }
</style>
