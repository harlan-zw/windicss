import plugin from '../index';

export default plugin(
  function ({ addUtilities, addDynamic, theme, variants }) {
    addUtilities({
      '.aspect-none': {
        position: 'static',
        paddingBottom: '0',
        '> *': {
          position: 'static',
          height: 'auto',
          width: 'auto',
          top: 'auto',
          right: 'auto',
          bottom: 'auto',
          left: 'auto',
        },
      },
    }, { layer: 'components' });
    addDynamic('aspect-w', ({ Utility, Style }) => {
      const prop = Utility.handler
        .handleStatic(theme('aspectRatio'))
        .handleNumber(1, undefined, 'float')
        .value;
      if (!prop) return;
      return Style.generate(Utility.class, {
        '--tw-aspect-w': prop,
        position: 'relative',
        paddingBottom: 'calc(var(--tw-aspect-h) / var(--tw-aspect-w) * 100%)',
        '> *': {
          position: 'absolute',
          height: '100%',
          width: '100%',
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
        },
      });
    }, {
      layer: 'components',
      variants: variants('aspectRatio'),
    });

    addDynamic('aspect-h', ({ Utility }) => {
      return Utility.handler
        .handleStatic(theme('aspectRatio'))
        .handleNumber(1, undefined, 'float')
        .createProperty('--tw-aspect-h');
    }, {
      layer: 'components',
      variants: variants('aspectRatio'),
    });

    addDynamic('aspect', ({ Utility, Style }) => {
      // aspect-h/w
      const value = Utility.handler.handleFraction().value;
      if (value) {
        return Style.generate(Utility.class, {
          position: 'relative',
          paddingBottom: value,
          '> *': {
            position: 'absolute',
            height: '100%',
            width: '100%',
            top: '0',
            right: '0',
            bottom: '0',
            left: '0',
          },
        });
      }
    }, {
      layer: 'components',
    });
  },
  {
    theme: {
      aspectRatio: {
      },
    },
    variants: {
      aspectRatio: ['responsive'],
    },
  }
);
