import { json } from "@shopify/remix-oxygen"
import {AppSession} from '~/lib/session';

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({context, request}) {
  const session = await AppSession.init(request, [context.env.SESSION_SECRET])
  const requestUrl = new URL(request.url)
  const origin =
    requestUrl.protocol === 'http:'
      ? requestUrl.origin.replace('http', 'https')
      : requestUrl.origin;

  const code = requestUrl.searchParams.get('code')
  // const state = requestUrl.searchParams.get('state')
  const codeVerifier = session.get('customerAccount',)?.codeVerifier
  const clientId = context.env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID
  const redirectUri = origin + '/account/authorize';

  return context.customerAccount.authorize();
  // return json({
  //   grant_type: "authorization_code",
  //   client_id: clientId,
  //   redirect_uri: redirectUri,
  //   code: code,
  //   code_verifier: codeVerifier,
  //   origin: origin,
  // })
}

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
