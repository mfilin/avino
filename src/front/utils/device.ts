import { isMobile, setUserAgent } from 'react-device-detect';

let isMobilePrivate = isMobile;

function parseUserAgent(userAgent: string) {
  const res = setUserAgent(userAgent);
  isMobilePrivate = res.getDevice().type === 'mobile';

  return isMobilePrivate;
}

export { parseUserAgent as setUserAgent, isMobilePrivate as isMobile };
