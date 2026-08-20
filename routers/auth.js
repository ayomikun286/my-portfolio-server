import express from "express";
import { contactForm } from "../controller/contact-form.js";
import { Login } from "../controller/login-controller.js";
import {createTestimonial,getApprovedTestimonials,getTestimonials} from "../controller/testimonial.js";

import { getAllProjects } from "../controller/projects-controller.js";
const router = express.Router();

router.post("/Login", Login)
router.post("/contact", contactForm)
router.post("/create-testimonial", createTestimonial);
router.get("/testimonial", getApprovedTestimonials);
router.get("/AllTestimonial", getTestimonials)
router.get("/projects", getAllProjects);
export default router