import JobModel from '../models/jobModel.js';

const createJobApplicant = async (req, res, next) => {
  try {
    const newApplicant = await JobModel.createApplicant(req.body);
    res.status(201).json(newApplicant);
  } catch (err) {
    next(err);
  }
};

const getAllApplicants = async (req, res, next) => {
  try {
    const applicants = await JobModel.getAllApplicants();
    res.status(200).json(applicants);
  } catch (err) {
    next(err);
  }
};

export default { createJobApplicant, getAllApplicants };
