#!/usr/bin/env node
import arg from 'arg';
import muxBlurHash from './index.js';

const args: Record<string, any> = arg(
  {
    '--blur-width': Number,
    '--blur-height': Number,
    '--time': Number,
    '--token': String
  },
  { permissive: false, argv: process.argv.slice(3), stopAtPositional: false }
);

const playbackId = process.argv[2];
const options = {
  blurWidth: args['--blur-width'],
  blurHeight: args['--blur-height'],
  time: args['--time'],
  thumbnailToken: args['--token']
};

muxBlurHash(playbackId, options).then(({ blurHashBase64, sourceWidth, sourceHeight }) => {
  console.log(`${sourceWidth} x ${sourceHeight}`);
  console.log(blurHashBase64);
});
