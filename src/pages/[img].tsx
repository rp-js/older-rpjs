import { NextSeo } from 'next-seo';
import { Page, HeroSection, SpeakersSection } from '@/components';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect } from 'react';
import router from 'next/dist/client/router';

export default function Home({ img, isLogged }: { img: string | null; isLogged: boolean }) {
  useEffect(() => {
    const needRedirect = sessionStorage.getItem(`needRedirect`) === `true`;

    if (needRedirect && isLogged) {
      router.push(`/`);
    }
  }, []);

  return (
    <Page>
      <NextSeo
        title="RP.js - Comunidade JavaScript"
        description="The landing page of RP.js the JavaScript Community of Ribeirão Preto!"
      />
      {img && (
        <Head>
          <meta property="og:title" content="Eu vou para o meetup do RPJS!" />
          <meta
            property="og:image"
            content={`https://rpjs.s3.sa-east-1.amazonaws.com/next-s3-uploads/${img}/ticket.png`}
          />
          <meta property="og:description" content="Venha se reunir com a comunidade de JavaScript em Ribeirão Preto!" />
          <meta property="og:url" content={`https://rpjs.com.br/${img}`} />
        </Head>
      )}
      <HeroSection />

      <main>
        <SpeakersSection url="/speakers.json" />
      </main>
    </Page>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  return {
    props: { session, isLogged: !!session?.user, img: context?.params?.img || `` },
  };
}
