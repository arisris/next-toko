import type { PrismaClient } from "@prisma/client";
import type {
  NextApiRequest,
  NextApiResponse,
  NextComponentType,
  NextPageContext
} from "next";
import type { Session } from "next-auth";
import type { Router } from "next/router";

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
  type ResolverContext = {
    prisma: PrismaClient,
    session: Session,
    req: NextApiRequest,
    res: NextApiResponse
  }
  type ResolverCallback<ParentType = undefined> = (parent: ParentType, args: Record<any, any>, context: ResolverContext) => any
  type Resolvers<ParentType = undefined> = Record<string, ResolverCallback<ParentType>>
}
