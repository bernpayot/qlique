import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";

export const authRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        message: 'Too many authentication attempts, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export const loginSlowDown = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 2,
    delayMs: 500,
    maxDelayMs: 20000,
});

