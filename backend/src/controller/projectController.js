
import ProjectModel from '../models/projectModel.js';

export const createProject = async (req, res, next) => {
  try {
    const { projectName, managedBy, startDate } = req.body;

    if (!projectName) {
      return res.status(400).json({ message: 'projectName is required' });
    }

    const newProject = await ProjectModel.createProject({ projectName, managedBy, startDate });
    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
};

export const getAllProjects = async (req, res, next) => {
  try {
    const projects = await ProjectModel.getAllProjects();
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};
export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { projectName, managedBy, startDate } = req.body;

    if (!projectName || !startDate) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const updated = await ProjectModel.updateProject(id, { projectName, managedBy, startDate });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ProjectModel.deleteProject(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
