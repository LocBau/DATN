import UpdateTaskApi from './updateTaskApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateTaskFrontEnd = async ( task) => {
  let newTask = await AsyncStorage.getItem('tasks');
  if (!newTask) return;
  newTask = JSON.parse(newTask);
  newTask = newTask.task;
  let nochange = true;
  for (let i = 0; i < newTask.length; i++) {
    if (newTask[i]._id == task._id) {
      newTask[i] = task;
      nochange = false;
      break;
    }
    
  }
  if (nochange) newTask.push(task);
  
  console.log(newTask);
  console.log(task);
  await AsyncStorage.setItem(
    "tasks",
    JSON.stringify({ timestamp: Date.now(), task: newTask })
  );
  await AsyncStorage.removeItem("flag");
  let token = await AsyncStorage.getItem("token");
  UpdateTaskApi(token, { timestamp: Date.now(), task: newTask });

}

export default UpdateTaskFrontEnd;
