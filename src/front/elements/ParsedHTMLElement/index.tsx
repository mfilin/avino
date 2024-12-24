import React from 'react';
import HtmlToReact from 'html-to-react';

const Parser = HtmlToReact.Parser;
const htmlToReact = Parser();

interface IOwnProps {
  htmlText: string;
}

const ParsedHTMLElement: React.FC<IOwnProps> = (props) => {
  const { htmlText } = props;

  const memoizedReactComponent: React.ReactNode = React.useMemo(() => {
    return htmlToReact.parse(htmlText) as JSX.Element;
  }, [htmlText, htmlToReact]);

  return <>{memoizedReactComponent}</>;
};

export default ParsedHTMLElement;
