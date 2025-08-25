import { supabase } from "../config/database.js";

export const userController = {
    async getProfile(req, res) {
        try {
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError || !user) {
                return res.status(401).json({ success: false, message: 'Not authenticated'});
            } 

            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error) throw error;
            
            res.json({
                success: true,
                data
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    async updateProfile(req, res) {
        try {
            const { user_id } = req.params;
            const updates = req.body;

            const allowedFields = ['name', 'phone', 'profile_photo'];
            const filteredUpdates = {};

            Object.keys(updates).forEach(key => {
                if (allowedFields.includes(key)) {
                    filteredUpdates[key] = updates[key];
                }
            });

            const { data, error } = await supabase
                .from('users')
                .update(filteredUpdates)
                .eq('user_id', user_id)
                .select()
                .single();
            
            if (error) throw error;

            res.json({
                success: true,
                message: 'Profile updated successfully',
                data
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    async getUserByEmail(req, res) {
        try {
            const { email } = req.params;

            const { data, error } = await supabase
                .from('User')
                .select('*')
                .eq('email', email)
                .single();

            if (error) throw error;

            res.json({
                success: true,
                data
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    /** ADMIN ONLY */
    async getAllUsers(req, res) {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('user_id, name, email, phone, role, created_at')
                .order('created_at', { ascending: false });

            if (error) throw error;
            
            res.json({
                success: true,
                data
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    /** ADMIN ONLY */
    async deleteUser(req, res) {
        try {
            const { user_id } = req.params;

            const { error } = await supabase
                .from('User')
                .delete()
                .eq('user_id', user_id);

            if (error) throw error;

            res.json({
                success: true,
                message: 'User deleted successfully'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
};