import { NextComponentType, NextPageContext } from "next";
import { Session } from "next-auth";
import { Router } from "next/router";

declare module "next/app" {
  type NextComponentTypeWithProps<P = Record<string, unknown>> =
    NextComponentType<NextPageContext, any, P> & {
      protected?: any;
    };
  type AppProps = {
    Component: NextComponentTypeWithProps;
    router: Router;
    __N_SSG?: boolean;
    __N_SSP?: boolean;
    pageProps: P & {
      session?: Session;
    };
  };
}

type ResponsiveScreenSize = {
  xxxxs: number;
  xxxs: number;
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xlg: number;
  xl: number;
  "2xl": number;
  max: number;
};