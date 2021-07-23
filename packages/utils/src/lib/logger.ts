import { Signale } from 'signale';

const signale = new Signale({
  scope: 'Tiga'
  // types: {
  //   warn: {
  //     color: 'yellow',
  //     label: 'warning',
  //     badge: '❕'
  //   },
  //   info: {
  //     color: 'cyan',
  //     label: 'info',
  //     badge: '🐤'
  //   },
  //   success: {
  //     color: 'green',
  //     label: 'success',
  //     badge: '✨'
  //   },
  //   error: {
  //     color: 'red',
  //     label: 'error',
  //     badge: '❌'
  //   }
  // }
});

export function warn(message?: any, ...optionalArgs: any[]) {
  signale.warn(message, ...optionalArgs);
}

export function success(message?: any, ...optionalArgs: any[]) {
  signale.success(message, ...optionalArgs);
}

export function info(message?: any, ...optionalArgs: any[]) {
  signale.info(message, ...optionalArgs);
}

export function error(message?: any, ...optionalArgs: any[]) {
  signale.error(message, ...optionalArgs);
}

export default signale;
