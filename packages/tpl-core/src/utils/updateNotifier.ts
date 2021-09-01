import chalk from 'chalk';
import updateTip from 'update-notifier';

export default function updateNotifier(pkg: {
  version: string;
  name: string;
  [props: string]: unknown;
}) {
  const notifier = updateTip({
    pkg,
    updateCheckInterval: 1000 * 60 * 60 * 24 * 7,
    shouldNotifyInNpmScript: true
  });

  const info = notifier.update;

  if (!info) {
    return;
  }

  const message = `update available! ${chalk.gray(
    info.current
  )} → ${chalk.green(info.latest)} \n
  run ${chalk.cyan('tiga upgrade')} or ${chalk.cyan(
    `npm install @tiga-cli/cli -g`
  )} to update !`;

  if (notifier.update) {
    notifier.notify({ message });
  }
}
