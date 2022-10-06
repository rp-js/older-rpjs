import { tw } from 'twind/css';
import { signIn } from 'next-auth/react';
import { SocialMedia, SecondaryButton, Styles } from '@/components';

const HeroSection = () => {
  const discordLink = `https://discord.gg/eX28YPWmz3`;

  return (
    <header className={tw(Styles.BackgroundColor)}>
      <div className={tw(`flex flex-col justify-center max-w-4xl mx-auto py-16 px-14 sm:px-6 lg:px-8`)}>
        <div
          className={tw(
            `flex flex-row flex-wrap justify-center items-center font-sans font-bold text-4xl md:text-5xl
           lg:text-8xl leading-snug`,
          )}
        >
          <div className={tw(`mr-4`)}>Comunidade</div>
          <div className={tw(Styles.HighlightWord)}>JavaScript</div>
        </div>
        <div className={tw(`max-w-xl mx-auto`)}>
          <p className={tw(`mt-10 text-gray-800 text-center text-xl lg:text-3xl`)}>
            Faça parte da comunidade de Ribeirão Preto!
          </p>
        </div>
        <div className={tw(`mt-10 flex justify-center items-center w-full mx-auto`)}>
          <SecondaryButton
            onClick={() =>
              signIn(`github`, { callbackUrl: `${process.env.NEXT_PUBLIC_BASE_API_URL}confirm-subscription` })
            }
          >
            Se Inscrever
          </SecondaryButton>
        </div>
        <div className={tw(`mt-10 flex justify-center items-center w-full mx-auto`)}>
          <SocialMedia />
        </div>
        <div className={tw(`max-w-xl mx-auto`)}>
          <p className={tw(`mt-10 text-gray-800 text-center text-xl lg:text-3xl`)}>
            <a href={discordLink} className={tw(`hover:underline`)}>
              Dia 18/10 as 19:00 na FATEC Ribeirão Preto
            </a>
          </p>
        </div>
      </div>
    </header>
  );
};

export async function getServerSideProps() {
  return {
    props: { url: process.env.REACT_APP_BASE_API_URL },
  };
}

export default HeroSection;
