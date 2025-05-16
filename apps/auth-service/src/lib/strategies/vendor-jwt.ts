import { env } from '@/configs/env';
import { vendorRepository } from '@/repositories/vendor.repository';
import type { AccessTokenPayload } from '@/types/token';
import { logger } from '@/utils/logger';
import passport from 'passport';
import { ExtractJwt, Strategy, type StrategyOptionsWithoutRequest } from 'passport-jwt';

const opts: StrategyOptionsWithoutRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.ACCESS_TOKEN_SECRET,
  ignoreExpiration: false,
};

export default passport.use(
  'vendor-jwt',
  new Strategy(opts, async (payload: AccessTokenPayload, done) => {
    try {
      console.log('payload', payload);
      // Only verify vendor tokens here
      if (payload.role !== 'vendor') {
        return done(null, false);
      }

      const vendor = await vendorRepository.getVendorByEmail(payload.email);
      if (!vendor) {
        return done(null, false);
      }
      done(null, vendor, { payload });
    } catch (err) {
      logger.error('Error verifying vendor access token', err);
      done(err, false);
    }
  })
);
