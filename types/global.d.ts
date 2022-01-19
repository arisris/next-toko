import { PrismaAbility, Subjects } from "@casl/prisma";
import { Posts, PrismaClient, Users } from "@prisma/client";
import type {
  NextApiRequest,
  NextApiResponse,
  NextComponentType,
  NextPageContext
} from "next";
import { Session } from "next-auth";
import { Router } from "next/router";

declare module "next/app" {
  type AppProps<P = Record<string, unknown>> = {
    Component: NextComponentType<NextPageContext, any, P>;
    router: Router;
    __N_SSG?: boolean;
    __N_SSP?: boolean;
    pageProps: P & {
      /** Initial session passed in from `getServerSideProps` or `getInitialProps` */
      session?: Session;
    };
  };
}

declare global {
  type ServerControllerProps = {
    req: NextApiRequest;
    res: NextApiResponse;
    session: Session;
    prisma: PrismaClient;
  };
  type ServerControllerHandler<Res = any> = (
    context: ServerControllerProps
  ) => Promise<Res> | Promise<any>;
}
