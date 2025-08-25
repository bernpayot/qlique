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
    
    // Check if error.errors exists and is an array (Zod error structure)
    if (error.errors && Array.isArray(error.errors)) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: error.errors.map(err => ({
                field: err.path && Array.isArray(err.path) ? err.path.join('.') : 'unknown',
                message: err.message || 'Validation error'
            }))
        });
    }
    
    // Check if it's a Zod error with issues property (alternative structure)
    if (error.issues && Array.isArray(error.issues)) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: error.issues.map(issue => ({
                field: issue.path && Array.isArray(issue.path) ? issue.path.join('.') : 'unknown',
                message: issue.message || 'Validation error'
            }))
        });
    }
    
    // Fallback for cases where error structure is unknown
    return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: [{
            field: 'unknown',
            message: error.message || 'Validation error'
        }]
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