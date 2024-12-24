import React from 'react';
import clsx from 'clsx';
import Text from '../../../../../components/Typography/Text';
import ParsedHTMLElement from '../../../../../elements/ParsedHTMLElement';

import styles from './TastingNotes.module.scss';
import { useDeviceInfo } from '../../../../../hooks/device';

interface IOwnProps {
  tastingNotes: {
    text: string;
    title: string;
    key: string;
    icon: React.JSX.Element;
  }[];
}
const TastingNotes: React.FC<IOwnProps> = ({ tastingNotes }) => {
  const { isMobile } = useDeviceInfo();

  return (
    <div
      className={clsx(styles.TastingNotes, { [styles.MobileView]: isMobile })}
      id="tastingNotes"
    >
      <Text
        level={isMobile ? 's18h20w800' : 's24h32w700'}
        className={styles.TastingNotesTitle}
      >
        {' '}
        Дегустационные заметки{' '}
      </Text>
      <div className={styles.Notes}>
        {tastingNotes.map((note) => {
          return (
            <div key={note.key} className={styles.Note}>
              {note.icon}
              <div>
                <Text level={isMobile ? 's14h16w600' : 's18h15w600'}>
                  {note.title}
                </Text>
                <Text level={isMobile ? 's13h16w400' : 's14h20w400'}>
                  <ParsedHTMLElement htmlText={note.text} />
                </Text>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default TastingNotes;
