const { addTask } = require('../controllers/taskController');
const TaskModel = require('../models/taskModel');

jest.mock('../models/taskModel');   // بنسخة وهمية/models/taskModel بستبدل 


describe('addTask function', () => {
  test('should add a task successfully', async () => {
    const mockRequest = {
      body: {
        task_name: 'Review Code Changes',
        task_description: 'Review and provide feedback on the recent code changes in the project',
        task_url: 'https://SuperCoding.com/project/code-changes',
      },
      user: {
        user_id: '4', 
      },  
    };  

    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };

    TaskModel.addTask.mockReturnValueOnce('mockedTaskId');  //عشان يعطي id وهمي

    await addTask(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Task added successfully', task_id: 'mockedTaskId' });

    expect(TaskModel.addTask).toHaveBeenCalledTimes(1);
  });
});
