import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paging from '../util/Paging';
import { useNavigate } from 'react-router-dom';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [page, setPage] = useState(1); // 현재 페이지
  const [pageSize, setPageSize] = useState(5); // 한 페이지에 보여줄 항목 수
  const navigate = useNavigate(); // 라우터 


  const fetchTodos = async () => {
    try {
      const response = await axios.post('http://localhost:5000/todo/list', {},{ 
        withCredentials: true // 쿠키 포함
    });
      setTodos(response.data); // 응답 데이터를 todos에 설정
    } catch (error) {
      console.log("호출 도중 에러 발생:", error);
    }
  };

  const fetchDeleteTodo = async (_id) => {
    try{
      const reponse = await axios.post('http://localhost:5000/todo/delete',{
        _id : _id
      },{ 
        withCredentials: true // 쿠키 포함
      });
      alert(reponse.data.message);
      fetchTodos();
    }catch(error){
      alert(error);
    }
  };
  
  const fetchDeleteTodos = async (_ids ) => {
    try{
      const reponse = await axios.post('http://localhost:5000/todo/deleteMany',{
        _ids : _ids
      },{ 
        withCredentials: true // 쿠키 포함
      });
      alert(reponse.data.message);
      fetchTodos();
    }catch(error){
      alert(error);
    }
  };
  // API 호출을 useEffect 내에서 처리
  useEffect(() => {
    fetchTodos(); // 컴포넌트 마운트 후 API 호출
  }, []); // 빈 배열 []을 넣어 한 번만 호출되게 설정

  // Todo 추가
  const handleAddClick = async () => {
    if(input.trim() && dateInput.trim()){
      try {
        // 백엔드 API로 로그인 요청
        const response = await axios.post('http://localhost:5000/todo/insert', {
          insertDate : dateInput,
          content : input
        },{ 
          withCredentials: true // 쿠키 포함
        });
        if(response.data.status == 'S'){
          alert('등록에 성공했습니다.');
          fetchTodos();
        } 
      } catch (error) {
        alert('등록도중 에러가 발생했습니다.');
        console.log(error);
      }
        setInput('');
        setDateInput('');
    } else {
      alert('일자 및 내용을 입력해주세요.');
      input.trim() ? document.getElementById('insertDate').focus() : document.getElementById('content').focus();
    }
  };

  // 체크박스 상태 변경
  const handleCheckboxChange = (_id) => {
    setTodos(todos.map(todo =>
      todo._id === _id ? { ...todo, checked: !todo.checked } : todo
    ));
  };

  // Todo 삭제
  const handleDeleteClick = async (_id) => {
    if(window.confirm('삭제하시겠습니까?')){
      fetchDeleteTodo(_id);
    }
  };

  // 전체 삭제
  const handleAllDelete = () => {
    if(window.confirm('체크된 항목들을 삭제하시겠습니까?')) {
      const checkedIds = todos.filter(todo => todo.checked).map(todo => todo._id);
      if(checkedIds.length == 0){
        alert("삭제할 항목이 없습니다.");
        return;
      }
      fetchDeleteTodos(checkedIds);
    }
  };

  // 페이징 처리: 현재 페이지에 맞는 todo 리스트 추출
  const startIdx = (page - 1) * pageSize;
  const paginatedTodos = todos.slice(startIdx, startIdx + pageSize);

  return (
    <div style={{ padding: '20px' }}>
      <section>
        <div className="container py-3 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: '15px' }}>
                <div className="card-body p-5">
                  <h6 className="mb-3">Todo List</h6>
                  <div className="d-flex align-items-center mb-4">
                    <div data-mdb-input-init className="form-outline d-flex">
                      <input type="date" id="insertDate" name="insertDate" placeholder="오늘 할 일이 무엇인가요?" className="form-control" value={dateInput} onChange={(e) => setDateInput(e.target.value)} />
                      <input type="text" id="content" name="content" placeholder="새 할 일 추가" className="form-control" 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddClick();
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddClick}
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-primary ms-2"
                    >
                      추가
                    </button>
                    <button
                      type="button"
                      onClick={handleAllDelete}
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-primary ms-2"
                    >
                      선택삭제
                    </button>
                  </div>
                  <ul className="list-group mb-0" style={{ minHeight: '365px' }}>
                    {paginatedTodos.map(todo => (
                      <li className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2" key={todo._id}>
                        <div className="d-flex align-items-center">
                          <input className="form-check-input me-2" type="checkbox" checked={todo.checked} onChange={() => handleCheckboxChange(todo._id)} />
                          <div style={{ minWidth: 200 }}>{todo.insertDate}</div> 
                          <div style={{ minWidth: 300 }}>{todo.content}</div>
                        </div>
                        <div><button className="btn" onClick={() => handleDeleteClick(todo._id)}><i className="bi bi-x text-primary"></i></button></div>
                      </li>
                    ))}
                  </ul>
                  <Paging
                    rowCount={todos.length}
                    pageSize={pageSize}
                    currentPage={page}
                    onPageChange={setPage} // 페이지가 변경되면 setPage 호출
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Todo;
