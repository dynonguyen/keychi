// Reference: https://www.npmjs.com/package/cz-customizable

const TYPES = {
  feat: '✨ feat',
  update: '💥 update',
  fix: '🐞 fix',
  debug: '🔴 debug',
  wip: '🚧 wip',
  docs: '📝 docs',
  perf: `⚡ perf`,
  refactor: '🛠️  refactor',
  build: '🔨 build',
  test: '🧪 test',
  deploy: '🚀 deploy',
  clean: '🧹 clean'
};

const SCOPES = ['api', 'mobile', 'web', 'desktop', 'extension', 'shared', 'codebase', 'misc'];

module.exports = {
  types: [
    { value: TYPES.feat, name: `${TYPES.feat}: Add a new feature` },
    { value: TYPES.update, name: `${TYPES.update}: Update/ Upgrade a feature` },
    { value: TYPES.debug, name: `${TYPES.debug}: Debugging` },
    { value: TYPES.fix, name: `${TYPES.fix}: Fix a bug` },
    { value: TYPES.wip, name: `${TYPES.wip}: Work In Progress` },
    { value: TYPES.docs, name: `${TYPES.docs}: Add or update documentation, README.md` },
    { value: TYPES.perf, name: `${TYPES.perf}: A code change that improves performance` },
    { value: TYPES.refactor, name: `${TYPES.refactor}: Enhance or refactoring` },
    { value: TYPES.build, name: `${TYPES.build}: Add or update regards to build process` },
    { value: TYPES.test, name: `${TYPES.test}: Add tests` },
    { value: TYPES.deploy, name: `${TYPES.deploy}: Deploying stuff` },
    { value: TYPES.clean, name: `${TYPES.clean}: Clean code` }
  ],
  scopes: SCOPES.map((s) => ({ name: s })),
  messages: {
    type: "Select the type of change that you're committing: ",
    scope: 'Denote the SCOPE of this change (optional): ',
    customScope: 'Denote the SCOPE of this change: ',
    subject: 'Write a SHORT, IMPERATIVE tense description of the change: ',
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line: ',
    breaking: 'List any BREAKING CHANGES (optional): ',
    confirmCommit: 'Are you sure you want to proceed with the commit above? '
  },
  allowBreakingChanges: [TYPES.fix, TYPES.hotfix, TYPES.revert, TYPES.tag],
  allowCustomScopes: true,
  skipEmptyScopes: true,
  scopeOverrides: {},
  subjectLimit: 120,
  typePrefix: '',
  typeSuffix: '',
  skipQuestions: ['footer'],
  upperCaseSubject: true
};
