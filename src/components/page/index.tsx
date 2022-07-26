import Head from 'next/head';
import { Navigation } from '@/components';
import { tw } from 'twind';

interface IUser {
  user?: {
    email: string;
    id: string;
    image: string;
    name: string;
  };
}
interface IProps {
  children: React.ReactNode;
  user?: IUser;
}

const Page = ({ children, user }: IProps) => (
  <div className={tw(`h-screen w-full flex flex-col`)}>
    <Head>
      <link rel="icon" href="/logo.svg" />
    </Head>
    <div className={tw(`min-h-screen flex flex-col`)}>
      <Navigation user={user as IUser} />
      {children}
    </div>
  </div>
);

export default Page;
