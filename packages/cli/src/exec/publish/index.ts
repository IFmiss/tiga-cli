import {
  deleteTag,
  getVersionTagPrefix,
  isWorkingTreeClean,
  lastGitTag,
  removeLastCommit,
  repoVersion
} from '@tiga-cli/tpl-core';
import { logError, logInfo, resolveCwd } from '@tiga-cli/utils';
import { sh, shSync } from '@tiga-cli/utils';
import chalk from 'chalk';
import { QuestionCollection } from 'inquirer';
import inquirer from 'inquirer';
import onetime from 'onetime';

const questionPublishType = (nextVersionMap: object): QuestionCollection => ({
  name: 'type',
  message: 'Choose the type of version you want to publish',
  type: 'list',
  choices: () => {
    return [
      ...Object.keys(nextVersionMap)?.map((item) => {
        return {
          name: `${item}  ${chalk.gray(`(${nextVersionMap[item]})`)}`,
          value: item
        };
      })
    ];
  },
  when: () => {
    return true;
  }
});

const questionPreid = (version: string): QuestionCollection => ({
  name: 'preid',
  message: ({ type }) => {
    const v = repoVersion.next(version, type, 'beta');
    return `Do you want to set preid? For example: beta, it will generate ${v}, if not set, please press enter`;
  },
  type: 'input',
  when: ({ type }) => type.indexOf('pre') === 0
});

const questionComfirm = (
  version: string,
  name: string
): QuestionCollection => ({
  name: 'comfirm',
  message: ({ preid, type }) => {
    const resultVersion = repoVersion.next(version, type, preid);
    return `Project: ${chalk.yellow(
      name
    )} , version: ${resultVersion}, immediate release?`;
  },
  type: 'confirm'
});

/** 回滚 npm version 生成的tag */
const rollback = onetime(async () => {
  const verisonPrefix = (await getVersionTagPrefix())?.trim();
  const latestTag = await lastGitTag();
  const tagVersion = latestTag.slice(verisonPrefix.length);

  try {
    const pkg = await import(resolveCwd('./package.json'));
    const { version } = pkg;

    if (tagVersion !== version?.trim()) {
      await deleteTag(latestTag);
      await removeLastCommit();
    }
  } catch (error) {
    logError(`回滚失败! error:\n${error}`);
  }
});

// publish
export default async function publish() {
  const pkg = require(resolveCwd('./package.json'));
  const { version, name } = pkg;
  const nextVersionMap = repoVersion.nextMap(version);

  const isClearn = await isWorkingTreeClean();

  if (!isClearn) {
    return logError('Unclean working tree. Commit or stash changes first.');
  }

  const config = await inquirer.prompt([
    questionPublishType(nextVersionMap),
    questionPreid(version),
    questionComfirm(version, name)
  ]);

  const preidStr = config.preid ? `--preid ${config.preid}` : '';
  const npmVersionStr = `npm version ${config.type} ${preidStr}`;

  try {
    await shSync(npmVersionStr);
    await shSync(`npm publish`);
  } catch (e) {
    // revert
    rollback();
  }
}
