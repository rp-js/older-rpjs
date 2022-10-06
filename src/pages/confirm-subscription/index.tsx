/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react';
import { tw } from 'twind';
import { NextSeo } from 'next-seo';
import { GetServerSideProps } from 'next';
import { getSession, GetSessionParams, useSession } from 'next-auth/react';
import { useRouter } from 'next/dist/client/router';

import { setSubscription } from '@/services/api';
import { User } from '@prisma/client';
import { Page, PrimaryButton, SecondaryButton, SocialMedia, Styles } from '@/components';
import prisma from '../../../lib/prisma';

type BodyType = {
  email?: string;
  isRemote: boolean;
};

interface IUser {
  user?: {
    email: string;
    id: string;
    image: string;
    name: string;
  };
}

export default function Home({ id }: User) {
  const { data: session } = useSession();

  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(``);

  async function handleSubscribe({ isRemote }: BodyType) {
    try {
      await setSubscription({ userId: id, eventId: `633c1fcebbe2dc4a7a0d4db8`, isRemote });
      router.push(`/register-success`);
    } catch (e) {
      if (e instanceof Error) {
        setIsError(true);
        setErrorMsg(e?.message);
      }
    }
  }

  return (
    <Page user={session?.user as IUser}>
      <NextSeo
        title="RP.js - Confirme sua inscrição"
        description="The confirm subscription page of RP.js the JavaScript Community of Ribeirão Preto!"
      />

      <main className={tw(`h-screen w-full`)}>
        <section className={tw(`h-screen w-full flex flex-col justify-center`, Styles.BackgroundColor)}>
          <div className={tw(`flex flex-col justify-center max-w-4xl mx-auto py-16 px-14 sm:px-6 lg:px-8`)}>
            <div
              className={tw(
                `flex flex-row flex-wrap justify-center items-center font-sans font-bold text-4xl md:text-4xl
           lg:text-6xl leading-snug`,
              )}
            >
              <div className={tw(Styles.HighlightWord)}>Escolha como participar</div>
            </div>
            <div className={tw(`mt-10 flex flex-col justify-center items-center`)}>
              <PrimaryButton onClick={() => handleSubscribe({ isRemote: true })}>Remotamente</PrimaryButton>
              <span className={tw(`mx-2`)}>ou</span>
              <SecondaryButton onClick={() => handleSubscribe({ isRemote: false })}>Presencialmente</SecondaryButton>
            </div>
            <div className={tw(`mt-10 flex justify-center items-center w-full mx-auto`)}>
              <SocialMedia />
            </div>
          </div>
        </section>
      </main>
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: GetSessionParams | undefined) => {
  const session = await getSession(context);

  if (!session?.user) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email as string },
  });

  if (user) {
    const isSub = await prisma.subscription.findMany({
      where: { userId: user?.id, eventId: `633c1fcebbe2dc4a7a0d4db8` },
    });
    if (isSub.length === 0) {
      return { props: user };
    }
    return {
      redirect: {
        destination: `/already-registered`,
        permanent: false,
      },
    };
  }

  const newuser = await prisma.user.create({
    data: {
      email: session.user.email as string,
      name: session.user.name as string,
      image: session.user.image as string,
    },
  });

  return {
    props: {
      user: newuser,
    },
  };
};
