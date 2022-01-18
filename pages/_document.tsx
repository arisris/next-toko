import Document, { Html, Head, Main, NextScript } from 'next/document';
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link href="/favicon.ico" rel="shortcut icon" />
          {/* <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/icons/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/icons/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/icons/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/icons/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/icons/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/icons/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/icons/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/icons/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/icons/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/icons/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/favicon-16x16.png"
          />
          <link rel="manifest" href="/icons/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-TileImage"
            content="/icons/ms-icon-144x144.png"
          /> */}
          <meta name="theme-color" content="#ffffff" />
          {/* <meta name="google-site-verification" content="HqRlPHb6rKQHLdM0ifiL0wHexR1qaUVFr_5f0dr0bKI" /> */}
          {/* WhY?: Alternative to google analytics help me to improve my site. Use self hosted umami writen in next.js hosted at vercel with planetscale serverless MySQL database. Its safe just me can control this */}
          {/* {process.env.NODE_ENV === 'production' && (
            <script
              async
              defer
              data-website-id="11ffac4d-485a-45c7-a0fd-3d0a624ce238"
              src="https://umamiapp.vercel.app/umami.js"
            ></script>
          )} */}
          {/* <link href="https://fonts.googleapis.com/css?family=Rubik:300,400,500&amp;display=swap" rel="stylesheet" /> */}
        </Head>
        <body className="bg-gray-100 text-gray-700">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
