import { tw } from 'twind';
import { NextSeo } from 'next-seo';
import { useSession } from 'next-auth/react';
import { Page, Styles, LinkButton } from '@/components';

interface IUser {
  user?: {
    email: string;
    id: string;
    image: string;
    name: string;
  };
}

export default function Home() {
  const { data: session } = useSession();

  return (
    <Page user={session?.user as IUser}>
      <NextSeo
        title="RP.js - Confirme sua inscrição"
        description="The confirm subscription page of RP.js the JavaScript Community of Ribeirão Preto!"
      />

      <main>
        <section className={tw(`h-screen flex flex-col justify-center`, Styles.BackgroundColor)}>
          <div className={tw(`flex flex-col justify-center max-w-4xl mx-auto py-16 px-14 sm:px-6 lg:px-8`)}>
            <div
              className={tw(
                `flex flex-row flex-wrap justify-center items-center font-sans font-bold text-4xl md:text-4xl
           lg:text-6xl leading-snug`,
              )}
            >
              <div className={tw(`mb-5`, Styles.HighlightWord)}>Obaa, parece que você já está inscrito!</div>
              <div className={tw(`mt-10 flex flex-col justify-center items-center`)}>
                <LinkButton linkTo={`${process.env.NEXT_PUBLIC_BASE_API_URL}register-success`}>
                  Veja seu ticket
                </LinkButton>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Page>
  );
}
