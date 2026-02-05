import * as migration_20260205_060627 from './20260205_060627';

export const migrations = [
  {
    up: migration_20260205_060627.up,
    down: migration_20260205_060627.down,
    name: '20260205_060627'
  },
];
