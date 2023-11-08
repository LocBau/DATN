import UpdateTaskApi from './updateTaskApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeleteTaskFrontEnd = async ( task) => {
  let _newTask = await AsyncStorage.getItem('tasks');
  console.log(task);
  if (!_newTask) return;
  _newTask = JSON.parse(_newTask);
  _newTask = _newTask.task;
  if(!_newTask) return;
  let newTask = _newTask.filter((item)=>{
    if(item._id !=task._id) return item;
    return
  });
  // for (let i = 0; i < newTask.length; i++) {
  //   if (newTask[i]._id == task._id) {
  //     delete newTask[i];
  //     break;
  //   }
    
  // }
  console.log(newTask);
  await AsyncStorage.setItem(
    "tasks",
    JSON.stringify({ timestamp: Date.now(), task: newTask })
  );
  await AsyncStorage.removeItem("flag");
  // let token = await AsyncStorage.getItem("token");
  // UpdateTaskApi(token, { timestamp: Date.now(), task: newTask });

}

export default DeleteTaskFrontEnd;
