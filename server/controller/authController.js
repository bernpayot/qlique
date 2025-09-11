import { supabase, supabaseAdmin } from '../config/database.js';
import { z } from 'zod';
import {
    registerSchema,
    loginSchema
} from '../utils/authValidations.js';
import {
    handleSupabaseError,
    handleAuthError,
    handleValidationError,
    handleGenericError
} from '../utils/errorHandlers.js';

export const authController = {
    async register(req, res) {
        try {
            const validatedData = registerSchema.parse(req.body);
            const { email, password, name, phone, role } = validatedData;

            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { name, phone, role }
                }
            });

            if (error) {
                return handleAuthError(error, 'Registration', res);
            }

            if (!data.user) {
                return res.status(500).json({
                    success: false,
                    message: 'User creation failed'
                });
            }
            
            const safeUser = {
                id: data.user.id,
                email: data.user.email,
                email_confirmed_at: data.user.email_confirmed_at,
                name: data.user.user_metadata?.name || null,
                phone: data.user.user_metadata?.phone || null,
                role: data.user.user_metadata?.role || null
            };

            return res.status(201).json({
                success: true,
                message: 'User registered successfully',
                user: safeUser
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return handleValidationError(error, res);
            }
            return handleGenericError(error, 'Registration', res);
        }
    },   

    async login(req, res) {
        try {
            const validatedData = loginSchema.parse(req.body);
            const { email, password } = validatedData;

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                return handleAuthError(error, 'Login', res);
            }

            if (!data.user) {
                return res.status(401).json({
                    success: false,
                    message: 'Authentication failed'
                });
            }

            const userLoggedIn = {
                id: data.user.id,
                email: data.user.email,
                name: data.user.user_metadata?.name || null,
                phone: data.user.user_metadata?.phone || null,
                role: data.user.user_metadata?.role || null
            }

            res.json({
                success: true,
                message: 'Login successful.',
                user: userLoggedIn,
                session: {
                    access_token: data.session?.access_token,
                    refresh_token: data.session?.refresh_token,
                    expires_at: data.session?.expires_at
                }
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return handleValidationError(error, res);
            }
            return handleGenericError(error, 'Login', res);
        }
    },

    async logout(req, res) {
        try {
            const { error } = await supabase.auth.signOut();

            if (error) {
                return handleAuthError(error, 'Logout', res);
            }

            res.json({
                success: true,
                message: 'Logged out successfully.'
            });
        } catch (error) {
            return handleGenericError(error, 'Logout', res);
        }
    },

    async getCurrentUser(req, res) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: 'Missing access token'
                });
            }

            const { data: { user }, error } = await supabase.auth.getUser(token);

            if (error) {
                return handleAuthError(error, 'Get current user', res);
            }

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Not authenticated'
                });
            }

            const safeUser = {
                id: user.id,
                email: user.email,
                email_confirmed_at: user.email_confirmed_at,
                name: user.user_metadata?.name || null,
                phone: user.user_metadata?.phone || null,
                role: user.user_metadata?.role || null
            };

            return res.json({
                success: true,
                user: safeUser
            });
        } catch (error) {
            return handleGenericError(error, 'Get current user', res);
        }
    } 
}