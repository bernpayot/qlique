// Removed unused import from 'zod'

export const handleSupabaseError = (error, operation, res) => {
    console.error(`${operation} error:`, error);
    
    if (error.code === '23505') { // Unique constraint violation
        return res.status(409).json({
            success: false,
            message: 'Resource already exists'
        });
    }
    
    if (error.code === '23503') { // Foreign key violation
        return res.status(400).json({
            success: false,
            message: 'Invalid reference data'
        });
    }
    
    return res.status(500).json({
        success: false,
        message: `${operation} failed`,
        error: error.message
    });
};

export const handleAuthError = (error, operation, res) => {
    console.error(`${operation} auth error:`, error);
    
    if (error.message.includes('Invalid login credentials')) {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password'
        });
    }
    
    if (error.message.includes('Email not confirmed')) {
        return res.status(401).json({
            success: false,
            message: 'Please confirm your email before logging in'
        });
    }
    
    if (error.message.includes('Too many requests')) {
        return res.status(429).json({
            success: false,
            message: 'Too many login attempts. Please try again later'
        });
    }
    
    return res.status(400).json({
        success: false,
        message: `${operation} failed`,
        error: error.message
    });
};

export const handleValidationError = (error, res) => {
    console.error('Validation error:', error);
    
    // ZodError -> stable shape via flatten()
    if (typeof error?.flatten === 'function') {
        const { fieldErrors, formErrors} = error.flatten();
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: fieldErrors,
            formErrors
        });
    }

    // Fallback for cases where error structure is unknown
    return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: { _errors: [error?.message || 'Validation error'] }
    });
};

export const handleGenericError = (error, operation, res) => {
    console.error(`${operation} error:`, error);
    return res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
};

// Additional utility functions for common error scenarios
export const handleNotFoundError = (resource, res) => {
    return res.status(404).json({
        success: false,
        message: `${resource} not found`
    });
};

export const handleUnauthorizedError = (message = 'Unauthorized access', res) => {
    return res.status(401).json({
        success: false,
        message
    });
};

export const handleForbiddenError = (message = 'Access forbidden', res) => {
    return res.status(403).json({
        success: false,
        message
    });
};

export const handleBadRequestError = (message = 'Bad request', res) => {
    return res.status(400).json({
        success: false,
        message
    });
};