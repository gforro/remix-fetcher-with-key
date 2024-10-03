import { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/react';

export async function loader({ params }: LoaderFunctionArgs) {
  const waitTime = Number(params['time']);

  await new Promise((r) => setTimeout(r, waitTime));
  return json({ now: new Date().toUTCString() });
}