// The URLs of our backend API.
// server.js mounts this file at /api, so this route is:  POST /api/contact

import { Router } from "express";
import { handleContactForm } from "../controllers/contactController.js";
import { createRateLimiter } from "../utils/rateLimiter.js";

const router = Router();

// At most 5 form submissions per 15 minutes for each visitor
const contactRateLimiter = createRateLimiter({ maxRequests: 5, windowMs: 15 * 60 * 1000 });

router.post("/contact", contactRateLimiter, handleContactForm);

export default router;
