import { OverlayProvider } from '@react-native-aria/overlays';
import { SSRProvider } from '@react-native-aria/utils';
import { ToastProvider, ToastRef, useToast } from 'native-base/src/components/composites/Toast';
import React from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import {
  Metrics,
  SafeAreaProvider,
  initialWindowMetrics as defaultInitialWindowMetrics,
} from 'react-native-safe-area-context';

import {
  INativebaseConfig,
  NativeBaseConfigProvider,
  defaultConfig,
} from 'native-base/src/core/NativeBaseContext';
import type { IColorModeProviderProps } from 'native-base/src/core/color-mode';
import HybridProvider from 'native-base/src/core/hybrid-overlay/HybridProvider';
import { ITheme, theme as defaultTheme } from 'native-base/src/theme';
import {
  getClosestBreakpoint,
  platformSpecificSpaceUnits,
} from 'native-base/src/theme/tools/utils';
import { ResponsiveQueryProvider } from 'native-base/src/utils/useResponsiveQuery';

// For SSR to work, we need to pass initial insets as 0 values on web.

// https://github.com/th3rdwave/react-native-safe-area-context/issues/132
const defaultInitialWindowMetricsBasedOnPlatform: Metrics | null = Platform.select(
  {
    web: {
      frame: { x: 0, y: 0, width: 0, height: 0 },
      insets: { top: 0, left: 0, right: 0, bottom: 0 },
    },
    default: defaultInitialWindowMetrics,
  }
);

export interface NativeBaseProviderProps {
  theme?: ITheme;
  colorModeManager?: IColorModeProviderProps['colorModeManager'];
  children?: React.ReactNode;
  initialWindowMetrics?: any;
  config?: INativebaseConfig;
  isSSR?: boolean;
  disableContrastText?: boolean;
  // Refer https://github.com/th3rdwave/react-native-safe-area-context#testing
}

const NativeBaseProvider = ({
  colorModeManager,
  config = defaultConfig,
  children,
  theme: propsTheme = defaultTheme,
  initialWindowMetrics,
  isSSR,
  disableContrastText,
}: NativeBaseProviderProps) => {
  const theme = config.theme ?? propsTheme;

  const newTheme = React.useMemo(() => {
    if (config.enableRem) {
      return platformSpecificSpaceUnits(theme);
    }
    return theme;
  }, [config.enableRem, theme]);

  const windowWidth = useWindowDimensions()?.width;

  const currentBreakpoint = React.useMemo(
    () => getClosestBreakpoint(newTheme.breakpoints, windowWidth),
    [windowWidth, newTheme.breakpoints]
  );

  return (
    <NativeBaseConfigProvider
      theme={newTheme}
      config={config}
      currentBreakpoint={currentBreakpoint}
      isSSR={isSSR}
      disableContrastText={disableContrastText}
    >
      <SafeAreaProvider
        initialMetrics={
          initialWindowMetrics ?? defaultInitialWindowMetricsBasedOnPlatform
        }
      >
        <ResponsiveQueryProvider disableCSSMediaQueries={!isSSR}>
          <HybridProvider
            colorModeManager={colorModeManager}
            options={theme.config}
          >
            <OverlayProvider isSSR>
              <ToastProvider>
                <InitializeToastRef />
                {
                  React.version >= '18' ?
                    children : <SSRProvider>{children}</SSRProvider>
                }
              </ToastProvider>
            </OverlayProvider>
          </HybridProvider>
        </ResponsiveQueryProvider>
      </SafeAreaProvider>
    </NativeBaseConfigProvider>
  );
};

const InitializeToastRef = () => {
  const toast = useToast();
  ToastRef.current = toast;
  return null;
};

export { NativeBaseProvider };
