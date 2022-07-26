/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { getSession, GetSessionParams, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { setSubscriptionTicketUrl } from '@/services/api';
import prisma from '@/../lib/prisma';
import {
  //  ParticlesBackground,
  Styles,
  LinkedinButton,
  PrimaryButton,
} from '@/components';
import { TicketComponent } from '@/components/ticket/ticket';
import { tw } from 'twind';
import saveAs from 'file-saver';
import * as htmlToImage from 'html-to-image';
import { useS3Upload } from 'next-s3-upload';

export default function Home(props: any) {
  const { data: session } = useSession();

  const [imageIdentifier, setImageIdentifier] = useState<string | null>(null);

  const {
    user: { subscriptions },
  } = props;

  const currentSubscription = subscriptions[0];
  const participante = {
    imageUrl: session?.user?.image as string,
    nome: session?.user?.name as string,
    idTicket: (currentSubscription?.ticketNumber || 0) + 1350,
    modo: currentSubscription?.isRemote ? `Remoto` : `Presencial`,
  };

  const { uploadToS3 } = useS3Upload();
  const captureToBlob = async () => {
    const element = document.getElementById(`ticket`);
    if (element == null) {
      return null;
    }
    const img = await htmlToImage.toBlob(element, { cacheBust: true });
    return img;
  };

  const captureToPng = async () => {
    const element = document.getElementById(`ticket`);
    if (element == null) {
      return null;
    }
    const img = await htmlToImage.toPng(element, { cacheBust: true });

    return img;
  };

  const onCapture = async () => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari) {
      await captureToBlob();
      await captureToBlob();
      await captureToBlob();
    }

    const imgBlob = await captureToBlob();

    const { url } = await uploadToS3(new File([imgBlob!], `ticket.png`));
    setImageIdentifier(url.split(`/`)[url.split(`/`).length - 2]);
    await setSubscriptionTicketUrl({ id: currentSubscription?.id, url });
  };

  useEffect(() => {
    setTimeout(async () => {
      await onCapture();
    }, 1000);
  }, []);

  return (
    <div style={{ overflow: `hidden` }}>
      <Head>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <NextSeo
        title="RP.js - Inscrição confirmada!"
        description="The confirmation subscribe page of RP.js the JavaScript Community of Ribeirão Preto!"
      />
      <section>
        <div className={tw(`bg-black relative`, Styles.BackgroundColor)}>
          {/* <div className={tw(`absolute w-full h-full`)}>
            <ParticlesBackground id="tsparticles" url="/particles.json" />
          </div> */}
          <div className={tw(`max-w-7xl mx-4 lg:mx-auto pt-10`)}>
            <h1 className={tw(`text-black text-4xl lg:text-7xl font-bold text-center`)}>Inscrição confirmada!</h1>
            <div className={tw(`mx-auto`)}>
              <p className={tw(`text-gray-800 text-center text-xl mt-9 mb-3`)}>
                Compartilhe nas suas redes sociais clicando nos botões abaixo e divulgue para seus amigos!
              </p>

              <div style={{ display: `flex`, justifyContent: `center`, alignItems: `center` }}>
                <TicketComponent {...participante} size="small" />
                <TicketComponent {...participante} size="large" id="ticket" />
              </div>
              <div className="share-buttons">
                <LinkedinButton
                  disabled={imageIdentifier === null}
                  onClick={() => {
                    window.open(
                      `https://www.linkedin.com/shareArticle?mini=true&url=https://rpjs.com.br/${imageIdentifier}`,
                      `_blank`,
                    );
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    {/* eslint-disable-next-line max-len */}
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                  </svg>
                  <span className={tw(`ml-4`)}>
                    {imageIdentifier === null ? `Aguarde...` : `Compartilhar no linkedin`}
                  </span>
                </LinkedinButton>
                <div className={tw(`mx-2`)}>e</div>
                <PrimaryButton
                  disabled={imageIdentifier === null}
                  onClick={async () => {
                    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

                    if (isSafari) {
                      await captureToPng();
                      await captureToPng();
                      await captureToPng();
                    }

                    const imgPng = await captureToPng();

                    saveAs(imgPng!, `ticket.png`);
                  }}
                >
                  <span>{imageIdentifier === null ? `Aguarde...` : `Baixar`}</span>
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context: GetSessionParams | undefined) {
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
    include: { subscriptions: true },
  });
  if (!user) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
}
