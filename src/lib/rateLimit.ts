type RateLimitRecord = {
  count: number;
  resetTime: number;
};

const ipCache = new Map<string, RateLimitRecord>();

const WINDOW_SIZE_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS = 60; // 60 requests per minute

/**
 * Checks if the requesting IP exceeds the rate limits.
 * Returns true if permitted, false if rate limited.
 */
export function rateLimiter(ip: string): { success: boolean; limit: number; remaining: number; reset: number } {
  const now = Date.now();
  const record = ipCache.get(ip);

  if (!record || now > record.resetTime) {
    const newRecord: RateLimitRecord = {
      count: 1,
      resetTime: now + WINDOW_SIZE_MS,
    };
    ipCache.set(ip, newRecord);
    return {
      success: true,
      limit: MAX_REQUESTS,
      remaining: MAX_REQUESTS - 1,
      reset: newRecord.resetTime,
    };
  }

  if (record.count >= MAX_REQUESTS) {
    return {
      success: false,
      limit: MAX_REQUESTS,
      remaining: 0,
      reset: record.resetTime,
    };
  }

  record.count += 1;
  return {
    success: true,
    limit: MAX_REQUESTS,
    remaining: MAX_REQUESTS - record.count,
    reset: record.resetTime,
  };
}

/**
 * Extract client IP from request headers or remote socket address
 */
export function getClientIp(req: Request): string {
  const xForwardedFor = req.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim();
  }
  return '127.0.0.1';
}
