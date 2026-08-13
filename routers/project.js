import express from "express";
import upload from "../middleware/upload.js";

import {
    getAllProjects,
    createProject,
    deleteProject,
} from "../controller/projects-controller.js";

const router = express.Router();

router.get("/projects", getAllProjects);

router.post(
    "/projects",
    upload.fields([
        {
            name: "thumbnail",
            maxCount: 1,
        },
        {
            name: "images",
            maxCount: 10,
        },
    ]),
    createProject
);

router.delete("/projects/:id", deleteProject);

export default router;