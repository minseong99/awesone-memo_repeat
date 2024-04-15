//delete
const deleteMemo = async (event) => {
  const id = event.target.dataset.id;
  console.log(id);
  const res = await fetch(`/memos/${id}`, {
    method: "DELETE",
  });
  readMemo();
};

// update
const editMemo = async (event) => {
  const id = event.target.dataset.id;
  const editInput = prompt("pls input the edit value");
  const res = await fetch(`/memos/${id}`, {
    // 값을 수정할 때는 PUT을 넣는것이 좋다.
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      content: editInput,
    }),
  });
  readMemo();
};

//read
function displayMemos(memo) {
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");
  li.innerText = `'${memo.content}'`;

  //eddit button
  const editBtn = document.createElement("button");
  editBtn.innerText = "edit";
  editBtn.addEventListener("click", editMemo);
  editBtn.dataset.id = memo.id;

  const delBtn = document.createElement("button");
  delBtn.innerText = "delete";
  delBtn.addEventListener("click", deleteMemo);
  delBtn.dataset.id = memo.id;

  li.appendChild(editBtn);
  li.appendChild(delBtn);
  ul.appendChild(li);
}

async function readMemo() {
  const res = await fetch("/memos");
  const jsonRes = await res.json(); //jsonRes = [{id:123, content:"~~~"},....]
  // ul 초기화
  // ul을 초기화 안하면 기존값이 있는 상태에서 계속 appendChild하기 때문에
  // 같은것이 계속 업데이트 된다.
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";
  jsonRes.forEach(displayMemos);
}

//create
const createMemo = async (memo) => {
  // 그냥 fetch하면 get요청
  // 값을 서버에 추가하기 위해서는 post요청을 해야한다.
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: memo,
    }),
  });
  readMemo();
};
const handleSubmit = (event) => {
  // submit 이벤트는 redirect(새로고침)를 해서 이것을 방지하기 위해 사용
  event.preventDefault();
  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  input.value = "";
};

const form = document.querySelector("#memo-form");

form.addEventListener("submit", handleSubmit);
readMemo();
