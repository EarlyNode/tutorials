import { NextRequest } from 'next/server';

import { localizationMiddleware } from './features/internationalization/localization-middleware';

// Matcher ignoring `/_next/` and `/api/` and svg files.
export const config = { matcher: ['/((?!api|_next|.*.svg$).*)'] };

export function middleware(request: NextRequest) {
  return localizationMiddleware(request);
}
