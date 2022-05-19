const DEFAULT_HOOKS_PATH = 'src/hooks';

const hookGenerator = {
    description: 'Creating a new hook',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'Hook name',
            default: 'hook',
        },
        {
          type: 'input',
          name: 'prefix',
          message: 'Hook prefix',
          default: 'use',
        },
        {
            type: 'input',
            name: 'path',
            message: 'The path by which the hook will be created',
            default: DEFAULT_HOOKS_PATH,
        }
    ],
    actions: ({path = DEFAULT_HOOKS_PATH}) => {
        // Слэш в конце всегда убирается что бы избежать ошибок
        path = path.replace(/(.*)(\/)$/, (_, pathWithoutEndSlash) => pathWithoutEndSlash)

        const actions = [
            // copy files
            {
                type: 'add',
                path: `../${path}/{{ name }}/index.ts`,
                templateFile: './hook/index.ts.hbs',
                abortOnFail: true,
            },
            {
                type: 'add',
                path: `../${path}/{{ name }}/{{ name }}.hook.ts`,
                templateFile: './hook/hookName.hook.ts.hbs',
                abortOnFail: true,
            },
            {
                type: 'add',
                path: `../${path}/{{ name }}/{{ name }}.types.ts`,
                templateFile: './hook/hookName.types.ts.hbs',
                abortOnFail: true,
            },
            {
                type: 'add',
                path: `../${path}/{{ name }}/{{ name }}.test.ts`,
                templateFile: './hook/hookName.test.ts.hbs',
                abortOnFail: true,
            },
            {
                type: 'add',
                path: `../${path}/{{ name }}/README.md`,
                templateFile: './hook/README.md.hbs',
                abortOnFail: true,
            },
            // add imports
            {
                type: 'append',
                path: `../src/index.tsx`,
                pattern: /^/,
                template: `export * from './hooks/{{ name }}';\n`,
                abortOnFail: false,
            },
        ];

        return actions;
    },
};

module.exports = plop => {
  plop.setHelper('fullName', (prefix, name) => `${prefix}${name.charAt(0).toUpperCase() + name.slice(1)}`);
  plop.setGenerator('hook', hookGenerator);
};
