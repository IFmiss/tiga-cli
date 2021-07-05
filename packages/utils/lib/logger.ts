import { Signale } from 'signale';

const LOGO = '🌈';

const signale = new Signale({
  scope: 'TIGA',
  types: {
    warn: {
      color: 'yellow',
      label: 'warning',
      badge: LOGO
    },
    info: {
      color: 'cyan',
      label: 'info',
      badge: LOGO
    },
    success: {
      color: 'green',
      label: 'success',
      badge: LOGO
    },
    error: {
      color: 'red',
      label: 'error',
      badge: LOGO
    }
  }
});

// ✨
// 🌈
// 📦
// ❌
// ✅

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
