import { createRemoteJWKSet, jwtVerify } from 'jose';

const supabaseUrl = process.env.SUPABASE_URL;

if (!supabaseUrl) {
  throw new Error('Missing SUPABASE_URL environment variable');
}

const JWKS = createRemoteJWKSet(new URL(`${supabaseUrl}/auth/v1/jwks`));

export async function verifyAccessToken(req, res, next) {
  try {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!token) return res.status(401).json({ success: false, message: 'Missing token' });

    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `${supabaseUrl}/auth/v1`,
    });

    req.user = payload; // contains custom claims, e.g., payload.user_role
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}
