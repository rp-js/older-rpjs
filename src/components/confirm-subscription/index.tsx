import { tw } from 'twind/css';
import { PrimaryButton, SecondaryButton, SocialMedia, Styles } from '@/components';

const ConfirmSubscription = () => (
  <section className={tw(`h-screen flex flex-col justify-center`, Styles.BackgroundColor)}>
    <div className={tw(`flex flex-col justify-center max-w-4xl mx-auto py-16 px-14 sm:px-6 lg:px-8`)}>
      <div
        className={tw(
          `flex flex-row flex-wrap justify-center items-center font-sans font-bold text-4xl md:text-4xl
           lg:text-6xl leading-snug`,
        )}
      >
        <div className={tw(Styles.HighlightWord)}>Escolha como participar</div>
      </div>
      <div className={tw(`mt-10 flex justify-center items-center w-full mx-auto`)}>
        <PrimaryButton>Remotamente</PrimaryButton>
        <span className={tw(`mx-2`)}>ou</span>
        <SecondaryButton>Presencialmente</SecondaryButton>
      </div>
      <div className={tw(`mt-10 flex justify-center items-center w-full mx-auto`)}>
        <SocialMedia />
      </div>
    </div>
  </section>
);

export default ConfirmSubscription;
