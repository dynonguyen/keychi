module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(.*)\((.*)\):\s(.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject']
    }
  },
  rules: {
    'header-max-length': [2, 'never', 120],
    'type-enum': [
      2,
      'always',
      [
        '✨ feat',
        '💥 update',
        '🐞 fix',
        '🔥 hotfix',
        '🔴 debug',
        '🚧 wip',
        '🌈 style',
        '📝 docs',
        `⚡ perf`,
        '🔁 revert',
        '🛠️  refactor',
        '🔨 build',
        '🧪 test',
        '🚀 deploy',
        '📦 publish',
        '🔀 merge',
        '🧹 clean'
      ]
    ],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'scope-empty': [2, 'never'],
    'subject-case': [0, 'never']
  }
};
