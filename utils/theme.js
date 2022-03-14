import { extendTheme } from '@chakra-ui/react'

const components = {
    Container: {
      baseStyle: {
        maxW: 'container.xl',
      },
    },
};

const config = {
    initialColorMode: 'dark',
};

const theme = extendTheme({ config, components })

export default theme;