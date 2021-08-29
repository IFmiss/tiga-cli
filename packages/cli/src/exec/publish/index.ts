import { checkGitPushed, repoVersion } from '@tiga-cli/tpl-core';
import { logError, logInfo, resolveCwd } from '@tiga-cli/utils';
import { shSync } from '@tiga-cli/utils';
import chalk from 'chalk';
import { QuestionCollection } from 'inquirer';
import inquirer from 'inquirer';

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

// publish
export default async function publish() {
  const pkg = require(resolveCwd('./package.json'));
  const { version, name } = pkg;
  const nextVersionMap = repoVersion.nextMap(version);

  const isPushed = checkGitPushed();
  if (!isPushed) {
    return logError('Unclean working tree. Commit or stash changes first.');
  }

  const config = await inquirer.prompt([
    questionPublishType(nextVersionMap),
    questionPreid(version),
    questionComfirm(version, name)
  ]);

  const preidStr = config.preid ? `--preid ${config.preid}` : '';
  const npmVersionStr = `npm version ${config.type} ${preidStr}`;

  shSync(npmVersionStr);
  shSync(`npm publish`);
}
