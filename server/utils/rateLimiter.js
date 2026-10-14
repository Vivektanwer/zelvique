// A very small "rate limiter" that stops one person from sending the form again and again.
// It remembers the time of each request per IP address (in the server's memory).
// Example: createRateLimiter({ maxRequests: 5, windowMs: 15 * 60 * 1000 })
//          = at most 5 requests per 15 minutes for each visitor.
//
// Note: the memory is cleared when the server restarts. That is fine for a contact form.

export function createRateLimiter({ maxRequests = 5, windowMs = 15 * 60 * 1000 } = {}) {
  const requestsByIp = new Map(); // ip -> list of request times

  return function rateLimiter(req, res, next) {
    const now = Date.now();
    const ip = req.ip || "unknown";

    // Keep only the requests that happened inside the time window
    const recent = (requestsByIp.get(ip) || []).filter((time) => now - time < windowMs);

    if (recent.length >= maxRequests) {
      const retryAfterSeconds = Math.ceil((windowMs - (now - recent[0])) / 1000);
      res.set("Retry-After", String(retryAfterSeconds));
      return res.status(429).json({
        message: "You have sent several messages in a short time. Please wait a few minutes and try again.",
      });
    }

    recent.push(now);
    requestsByIp.set(ip, recent);

    // Clean the memory now and then so it never grows too big
    if (requestsByIp.size > 1000) {
      for (const [key, times] of requestsByIp) {
        if (times.every((time) => now - time >= windowMs)) requestsByIp.delete(key);
      }
    }

    next();
  };
}
