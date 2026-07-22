export const formatDate = (date) => `${date.toLocaleDateString()}`;

export const validateTask = (task = {}) => {
    const {title, dueDate} = task;
    return Boolean(title && dueDate); 
}

export const mergeTaskUpdate = (original, ...updates) => {
  return { ...original, ...updates.reduce((merged, update) => ({ ...merged, ...update }), {}) };
};

class TaskValidationError extends Error {
  constructor(message){
    super(message);
    this.name = "TaskValidationError";
    this.statusCode = 404;
  }
}

export const createTask = (task) => {
  if (!validateTask(task)){
    throw new TaskValidationError("Invalid task data");
  }

  return { id: Date.now(), completed: false, ...task };
}