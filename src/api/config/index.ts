import 'dotenv';
import path from 'path';
import fs from 'fs';
import commandLineArgs from 'command-line-args';

// const getGitRevision = async () => {
//   await require('child_process').exec('git rev-parse --short HEAD');
// };

const commandLineOptionsDefinition = [
  { name: 'skip-next-middleware', type: Boolean },
];

const commandLineOptions = commandLineArgs(commandLineOptionsDefinition, {
  stopAtFirstUnknown: false,
  partial: true,
});

const isDistFolder = Boolean(
  fs.existsSync(path.resolve(__dirname, '..', 'tsconfig.json')),
);

const MIGRATIONS_ROOT = isDistFolder
  ? path.resolve(__dirname, '..', 'migrations')
  : path.resolve(__dirname, '../../../', 'migrations');

const mocksPath = isDistFolder
  ? path.resolve(__dirname, '..', 'mock.json')
  : path.resolve(__dirname, '../../../', 'mock.json');
let mocks = {};
try {
  if (fs.existsSync(mocksPath)) {
    mocks = JSON.parse(fs.readFileSync(mocksPath).toString());
  }
} catch (error) {
  console.error(error);
}

export default () => {
  const apiPrefix = process.env.API_PREFIX || '/api';

  return {
    app: {
      skipNextMiddleware: Boolean(commandLineOptions['skip-next-middleware']),
      logs: process.env.LOGS?.toLowerCase().split(/\s{0,}\,\s{0,}/) || [
        'error',
        'warn',
      ],
      logFeatures:
        process.env.LOG_FEATURES?.toLowerCase().split(/\s{0,}\,\s{0,}/) || [],
      jwtKey: process.env.JWT_KEY || '',
      jwtCookieName: process.env.JWT_COOKIE_NAME || 'sid',
      passwordSalt: process.env.PASSWORD_SALT || '',
      cacheValidationKey: process.env.CACHE_VALIDATION_KEY || '',
    },
    port: parseInt(process.env.PORT, 10) || 4000,
    host: process.env.HOST || '127.0.0.1',
    migrationsRoot: MIGRATIONS_ROOT,
    apiPrefix: apiPrefix.startsWith('/') ? apiPrefix : `/${apiPrefix}`,
    database: {
      host: process.env.DBHOST,
      port: +(process.env.DBPORT || 3306),
      user: process.env.DBUSERNAME,
      password: process.env.DBPASSWORD,
      database: process.env.DBDATABASE,
    },
    elastic: {
      url: process.env.ELASTICURL,
    },
    mysql: {
      options: {
        group_concat_max_len: 40000000,
      },
    },
    mail: {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      user: process.env.MAIL_USER,
      password: process.env.MAIL_PASSWORD,
      from: process.env.MAIL_FROM,
      fromLabel: process.env.MAIL_FROM_LABEL || '',
      previewMode: process.env.EMAIL_PREVIEW === 'true',
      debugMode: process.env.SMTP_DEBUG_MODE === 'true',
      loggerEnabled: process.env.SMTP_LOGGER_ENABLED === 'true',
      ignoreTLS: process.env.SMTP_IGNORE_TLS === 'true',
      adminEmails: `${process.env.MAIL_ADMINISTRATION}`
        .replace(/\s{0,}([,;])\s{0,}/g, '$1')
        .split(/[\s,;]/),
    },
    mocks,
  };
};
