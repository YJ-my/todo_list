const pendingList = document.querySelector(".js-pending"),
  finishedList = document.querySelector(".js-finished"),
  listForm = document.querySelector(".js-toDoForm"),
  toDoInput = document.querySelector("#toDoInput");


const PENDING = "PENDING";
const FINISHED = "FINISHED";

let pendingTasks, finishedTasks;

function getTaskObject(text) {
  return {
    id: String(Date.now()),
    text
  };
}

function savePendingTask(task) {
  pendingTasks.push(task);
}

function findInFinished(taskId) {
  return finishedTasks.find(function(task) {
    return task.id === taskId;
  });
}

function findInPending(taskId) {
  return pendingTasks.find(function(task) {
    return task.id === taskId;
  });
}

function removeFromPending(taskId) {
  pendingTasks = pendingTasks.filter(function(task) {
    return task.id !== taskId;
  });
}

function removeFromFinished(taskId) {
  finishedTasks = finishedTasks.filter(function(task) {
    return task.id !== taskId;
  });
}

function addToFinished(task) {
  finishedTasks.push(task);
}

function addToPending(task) {
  pendingTasks.push(task);
}

function deleteTask(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  removeFromFinished(li.id);
  removeFromPending(li.id);
  saveState();
}

function handleFinishClick(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  const task = findInPending(li.id);
  removeFromPending(li.id);
  addToFinished(task);
  paintFinishedTask(task);
  saveState();
}

function handleBackClick(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  const task = findInFinished(li.id);
  removeFromFinished(li.id);
  addToPending(task);
  paintPendingTask(task);
  saveState();
}

function buildGenericLi(task) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");
  span.innerText = task.text;
  deleteBtn.innerText = "❌";
  deleteBtn.addEventListener("click", deleteTask);
  li.append(span, deleteBtn);
  li.id = task.id;
  return li;
}

function paintPendingTask(task) {
  const genericLi = buildGenericLi(task);
  const completeBtn = document.createElement("button");
  completeBtn.innerText = "✅";
  completeBtn.addEventListener("click", handleFinishClick);
  genericLi.append(completeBtn);
  pendingList.append(genericLi);
}

function paintFinishedTask(task) {
  const genericLi = buildGenericLi(task);
  const backBtn = document.createElement("button");
  backBtn.innerText = "⏪";
  backBtn.addEventListener("click", handleBackClick);
  genericLi.append(backBtn);
  finishedList.append(genericLi);
}

function saveState() {
  localStorage.setItem(PENDING, JSON.stringify(pendingTasks));
  localStorage.setItem(FINISHED, JSON.stringify(finishedTasks));
}

function loadState() {
  pendingTasks = JSON.parse(localStorage.getItem(PENDING)) || [];
  finishedTasks = JSON.parse(localStorage.getItem(FINISHED)) || [];
}

function restoreState() {
  pendingTasks.forEach(function(task) {
    paintPendingTask(task);
  });
  finishedTasks.forEach(function(task) {
    paintFinishedTask(task);
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  const taskObj = getTaskObject(toDoInput.value);
  toDoInput.value = "";
  paintPendingTask(taskObj);
  savePendingTask(taskObj);
  saveState();
}

function init() {
  listForm.addEventListener("submit", handleFormSubmit);
  loadState();
  restoreState();
}
init();






/*const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");
    finishList = document.querySelector(".js-finishList");

const TODOS_LS = 'toDos';
const FINISH_LS = 'finish';

let toDoListTasks, finishTasks;

function getTaskObj(text) {
    return {
        id: String(Date.now()),
        text
    };
}

function saveToDoListTask(task) {
    toDoListTasks.push(task)
}

function finidInToDo(taskId) {
    return toDoListTasks.find(function(task) {
        return task.id === taskId;
    })
}


function findInFinish(taskId) {
    return finishTasks.find(function(task) {
        return task.id === taskId;
    });
}

function removeFromToDo(taskId) {
    toDoListTasks = toDoListTasks.filter(function(task){
        return task.id !== taskId;
    });
}

function removeFromFinish(taskId) {
    finishTasks = finishTasks.filter(function(task) {
        return task.id !== taskId;
    })
}

function addToDo(task) {
    toDoListTasks.push(task);
}

function addFinish(task) {
    finishTasks.push(task);
}

function deleteTask(e) {
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    removeFromToDo(li.id);
    removeFromFinish(li.id);
    saveState();
}

function finishClick(e) {
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    const task = findInPending(li.id);
    removeFromToDo(li.id);
    addFinish(task);
    paintfinish(task);
    saveState();
}

function backClick(e) {
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    const task = findInFinish(li.id);
    removeFromFinish(li.id);
    addToDo(task);
    paintToDo(task);
    saveState();
}

function buildGenericLi(task) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    
    span.innerText = text;
    delBtn.addEventListener("click", deleteTask);
    delBtn.innerText = "❌";
    

    li.append(span, delBtn);
    li.id = task.id;

    return li;
}

function paintToDo(task){
    const genericLi = buildGenericLi(task);
    const okBtn = document.createElement("button");
    okBtn.innerText = "⭕";
    okBtn.addEventListener("click", finishClick);
    genericLi.append(okBtn);
    toDoList.append(genericLi);
}

function paintfinish(task){
    const genericLi = buildGenericLi(task);
    const backBtn = document.createElement("button");
    backBtn.innerText = "⏪";
    backBtn.addEventListener("click", backClick);
    genericLi.append(backBtn);
    finishList.append(genericLi);
}

function restoreState(){
    toDoListTasks.forEach(function(task){
        paintToDo(task);
    });
    finishTasks.forEach(function(task){
        paintfinish(task);
    });
}


function handleSubmit(event){
    //event.preventDefault안해주면 todolist 작성할때마다 배경이 바뀜
    event.preventDefault();
    const currentValue = getTaskObj(toDoInput.value);
    
    //값 입력하면 제출하고 다시 wirte a to do 화면으로 넘어가기
    toDoInput.value ="";

    paintToDo(currentValue);
    saveToDo(currentValue);
    saveState();
}


function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    localStorage.setItem(FINISH_LS, JSON.stringify(finishTasks));
}


function loadToDos() {
    toDoListTasks = JSON.parse(localStorage.getItem(TODOS_LS)) || [];
    finishTasks = JSON.parse(localStorage.getItem(FINISH_LS)) || [];
}

function init() {
    toDoForm.addEventListener("submit", handleSubmit);
    loadToDos();
    restoreState();
    
    

}

init();

*/


/*

// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

//todolist를 생성할 때마다 toDos라는 array에 추가되도록 할거임
let toDos = [];

//x버튼 누르면 todolist 삭제
function deleteToDo(event) {
  /*event에 target이라는 것이 있어 button이 계쏙 뜨게 하는
  x버튼 눌렀을때 여러 x버튼중에서 내가 삭제할 버튼이 뭔지 알게 하는 = target
   */

/*

  //이벤트 발생시 정보 호출
  const btn = event.target;
  //버튼에 대한 부모요소 확인
  const li = btn.parentNode;
  toDoList.removeChild(li);

  //////////////////삭제하고나서 새로고침해도 삭제된게 유지되게

  //li에 없는 id인 toDos를 체크
  /*filter는 해당함수가 toDos의 모든 items들에게 실행하도록 하여
  true인 item으로 다시 배열 구성*/ 
/*  
  //filter함수는 각 항목을 확인하면서 return값이 true인 항목만 모아서 반환함
  const cleanToDos = toDos.filter(function (toDo) {
    //모든 toDos가 li의 id와 같지 않을 때
    //parseInt는 string을 숫자로 바꿀 수 있음
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

////////////////toDos를 가져와서 로컬에 저장
function saveToDos() {
  //JSON.stringify는 자바스크립트 object를 string으로 바꿔줌
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

///////////////todo입력하면 입력한 내용 보이게 하기
function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finishBtn = document.createElement("button");
  const span = document.createElement("span");
  //버튼을 눌렀을 때 어떤 li를 지워야 하는지 알기 위해
  const newId = toDos.length + 1;

  delBtn.innerText = "❌";
  finishBtn.innerText = "✔";

  //x버튼 누르면 todolist삭제
  delBtn.addEventListener("click", deleteToDo);
  //text는 submit function에서 온 값
  span.innerText = text;
  //span, btn을 li안에 넣기
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finishBtn);
  
  //버튼을 눌렀을 때 어떤 li를 지워야 하는지 알기 위해
  li.id = newId;

  toDoList.appendChild(li);

  //todolist를 생성할 때마다 toDos라는 array에 추가되도록 할거임
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  //엔터를 누르면 값이 console에 뜨면서 입력란에 글자 리셋됨
  //이 코드 추가 전에는 엔터 눌러도 입력란에 글자가 안사라졌음
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    /*toDos 불러오기 (새로고침하면 화면에 todolist는 사라지지만 locallist에는 남아있음
    그니까 locallist에 있는걸 불러와야돼)*/
    //근데 이렇게 해서 console.log(loadedToDos); 불러오니까 문자임
    //string을 object로 바꿔주기
/*    const parsedToDos = JSON.parse(loadedToDos);

    /*forEach는 기본적으로 함수를 실행하는데 array에 담겨있는 것들
    각각에 한번씩 함수를 실행시켜 주는거임
    */

    //새로고침해도 작성한 todolist 그대로 남아있음 화면에 안지워지고
/*    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();

*/