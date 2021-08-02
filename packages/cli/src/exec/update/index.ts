import { logInfo, sh, Spinner } from '@tiga-cli/utils';
import chalk from 'chalk';

export default async function update() {
  Spinner.loading('Updating version...');
  await sh('npm install @tiga-cli/cli -g', {
    errorText: chalk.red('update failed ! \n\n')
  });
  logInfo('🎉 update completed !');
}
