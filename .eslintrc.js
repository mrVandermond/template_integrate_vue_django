module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    "plugin:vue/essential",
    "plugin:vue/strongly-recommended",
    "plugin:vue/recommended",
    "airbnb-base",
  ],
  plugins: [
    "vue",
  ],
  settings: {
    'import/resolver': {
      webpack: './webpack.config.js',
    },
  },
  rules: {
    'import/extensions': ['error', 'always', {
      'vue': 'never',
      'js': 'never'
    }],
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e', // for e.returnvalue
      ]
    }],
    'no-alert': 'off',
    'max-len': [2, {
      code: 120,
      ignoreComments: true,
    }],
    'import/prefer-default-export': 'off',
  },
}