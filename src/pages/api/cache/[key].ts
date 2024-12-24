import React from 'react';
import { NextPage } from 'next';
import { Response } from 'express';
import { revalidatePath, revalidateTag } from 'next/cache';

// const Page: NextPage = () => {
//   return <div>OK 1</div>;
// };

// export async function getServerSideProps({ req, res, query }) {
//   const serviceKey = res.locals?.configService?.get('app.cacheValidationKey');
//   const requestKey = query.key;
//
//   if (serviceKey === requestKey) {
//     // console.log('REVALIDATE EXECUTION');
//     // revalidatePath('/status');
//     revalidateTag('status');
//     // console.log('revalidate: ', res.unstable_revalidate);
//   }
//
//   return {
//     props: {},
//   };
// }

// export default Page;
export default async function handler(req, res) {
  // console.log('res: ', { req, res });
  const serviceKey = res.locals?.configService?.get('app.cacheValidationKey');
  const { key: requestKey } = req.query;

  // console.trace('/api/cache/[key].ts trace');

  if (serviceKey === requestKey) {
    res.revalidate('/');
    res.revalidate('/404');
    res.revalidate('/about');
    res.revalidate('/cart');
    res.revalidate('/checkout');
    res.revalidate('/comparison');
    res.revalidate('/contacts');
    res.revalidate('/favorite');
    res.revalidate('/how');
    res.revalidate('/privacy');
    res.revalidate('/search');

    return res.json({ revalidated: true });
  }
  // console.log('revalidate: ', res?.revalidate);
  // res.revalidate('/');
  return res.status(404).end();
}
