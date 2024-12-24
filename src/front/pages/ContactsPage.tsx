import * as React from 'react';
import { usePortalStatic } from '../hooks/usePortalStatic';
import { Footer, LoadingIndicator } from '../components';
import { TopMenuContainer } from '../features/header/view/containers';
import MobileBottomMenu from '../components/MobileBottomMenu';
import { NextPage } from 'next/types';
import { useRouter } from 'next/router';
import featureContacts from '../features/contacts';

const { ContactsContainer } = featureContacts.containers;

const ContactsPage: NextPage = (props) => {
  const { pageProps } = usePortalStatic();
  const { isFallback } = useRouter();
  return (
    <>
      {isFallback ? (
        <LoadingIndicator />
      ) : (
        <>
          <TopMenuContainer pageProps={pageProps} />
          <ContactsContainer />
          <MobileBottomMenu />
          <Footer pageProps={pageProps} />
        </>
      )}
    </>
  );
};

export default ContactsPage;
