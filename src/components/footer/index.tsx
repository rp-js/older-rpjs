import { tw } from 'twind';
import { signIn } from 'next-auth/react';

import { SecondaryButton, Styles } from '@/components';

const Footer = ({ user }: any) => (
  <nav className={tw(Styles.BackgroundColor)}>
    <div className={tw(`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`)}>
      <div className={tw(`flex items-center justify-center h-16`)}>
        <div className={tw(`flex items-center`)}>
          <div className={tw(`text-black font-sans font-bold text-xl hidden md:block mr-3`)}>Comunidade</div>
          <div className={tw(`flex-shrink-0 mr-4`)}>
            <img className={tw(`h-11 w-11`)} src="logo.svg" alt="logo" />
          </div>
          <div className={tw(`text-black font-sans font-bold text-xl hidden md:block`)}>RP.js</div>
        </div>
        <div className={tw(`ml-4 flex items-center md:ml-6`)}>
          {user?.name && user?.image ? (
            <span className={tw(Styles.HighlightWord)}>{user?.name}</span>
          ) : (
            <SecondaryButton
              onClick={() =>
                signIn(`github`, { callbackUrl: `${process.env.NEXT_PUBLIC_BASE_API_URL}confirm-subscription` })
              }
            >
              Se Inscrever
            </SecondaryButton>
          )}
        </div>
      </div>
    </div>
  </nav>
);

export async function getServerSideProps() {
  return {
    props: { url: process.env.REACT_APP_BASE_API_URL },
  };
}

export default Footer;
