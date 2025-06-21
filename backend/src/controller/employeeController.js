
import EmployeeModel from '../models/employeeModel.js';

const create = async (req, res, next) => {
  try {
    const newEmployee = await EmployeeModel.createEmployee(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const employees = await EmployeeModel.getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};
const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updated = await EmployeeModel.updateEmployee(id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    await EmployeeModel.deleteEmployee(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export default { create, getAll,update, remove  };
