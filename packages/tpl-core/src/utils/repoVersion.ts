import semver from 'semver';

import { RepoPublishType } from '../types';

const versionType: Array<RepoPublishType> = [
  'patch',
  'major',
  'minor',
  'prepatch',
  'premajor',
  'preminor',
  'prerelease'
];

export function next(version: string, type?: RepoPublishType, preid?: string) {
  const v = semver.inc(version, type, preid);
  return v;
}

export function nextMap(
  version: string,
  preid?: string
): {
  [k in RepoPublishType]?: string;
} {
  const map = {};
  for (const type of versionType) {
    map[type] = next(version, type, preid);
  }
  return map;
}
