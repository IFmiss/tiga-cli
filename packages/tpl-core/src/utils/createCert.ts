import mkcert from 'mkcert';
import { existsSync, readFileSync } from 'fs-extra';
import { writeFileSync } from '@tiga-cli/utils';
import path from 'path';

type CACert = Partial<{
  organization: string;
  countryCode: string;
  state: string;
  locality: string;
  validityDays: number;
}>;

type TypeCreateCaParams = {
  host: string;
  CACert?: CACert;
  domains?: Array<string>;
};

const cacheDirPath = path.resolve(__dirname, '../.tiga_cache');

const isExitCert = (host) =>
  existsSync(path.resolve(cacheDirPath, `./${host}cert.pem`));

export const existCert = async (
  host
): Promise<Record<'key' | 'cert', Buffer> | undefined> => {
  const isExit = isExitCert(host);
  if (isExit) {
    return {
      key: readFileSync(path.resolve(cacheDirPath, `./${host}cert.pem`)),
      cert: readFileSync(path.resolve(cacheDirPath, `./${host}cert_key.pem`))
    };
  }
};

export default async function createCert(
  params: TypeCreateCaParams
): Promise<Record<'key' | 'cert', Buffer> | undefined> {
  const { host, CACert = {}, domains = [] } = params;
  if (isExitCert(host)) {
    return existCert(host);
  }

  const ca = await mkcert.createCA({
    organization: 'TIGA-CLI',
    countryCode: 'CN',
    state: 'SHANGHAI',
    locality: 'SONGJIANG',
    validityDays: 365,
    ...CACert
  });

  const certFile = await mkcert.createCert({
    domains: [host, '127.0.0.1', 'localhost'],
    validityDays: 365,
    caKey: ca.key,
    caCert: ca.cert
  });

  writeFileSync(path.resolve(cacheDirPath, `./${host}cert.pem`), certFile.cert);
  writeFileSync(
    path.resolve(cacheDirPath, `./${host}cert_key.pem`),
    certFile.key
  );

  return existCert(host);
}
