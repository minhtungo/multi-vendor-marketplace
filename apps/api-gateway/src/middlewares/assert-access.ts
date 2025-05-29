import { optionalAuth, requireAuth, requireVendorRole } from '@/middlewares/auth';
import { RequestHandler } from 'express';

export const publicAccess: RequestHandler[] = [];

export const optionalAccess: RequestHandler[] = [optionalAuth];

export const authenticatedAccess: RequestHandler[] = [requireAuth];

export const vendorAccess: RequestHandler[] = [requireAuth, requireVendorRole];
