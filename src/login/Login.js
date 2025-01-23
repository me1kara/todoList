import React, { useState } from 'react';
import axios from 'axios';
import loginStyles from './login.module.css';  // CSS 모듈
import { useNavigate } from 'react-router-dom';

function Login() {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [message, setMessage] = useState(''); //로그인 성공 메세지
  const navigate = useNavigate(); // 라우터 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 백엔드 API로 로그인 요청
      const response = await axios.post('http://localhost:5000/login', {
        userId: userId,
        userPassword: userPassword,
      });

      // 로그인 성공 시
      setMessage(response.data.message);
      //window.location.pathname = '/todo';
      navigate('/todo'); 
    } catch (error) {
      // 로그인 실패 시
      setMessage(error.response.data.message);
    }
  };

  return (
    <>
      <section>
        <div className="container-fluid">
          <div className='row'>
            <div className="text-black">
              <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <form style={{width: '23rem'}} action="/" className={loginStyles.loginForm} onSubmit={handleLogin}>
                  <h3 className="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Log in</h3>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input className="form-control form-control-lg" type="text" id="userId" name="userId" value={userId} onChange={(e) => setUserId(e.target.value)} />
                    <label className="form-label" htmlFor="userId">아이디</label>
                  </div>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="password" className="form-control form-control-lg" id="userPassword" name="userPassword" value={userPassword} onChange={(e) => setUserPassword(e.target.value)}/>
                    <label className="form-label" htmlFor="userPassword">비밀번호</label>
                  </div>
                  {message && <p className='text-danger'>{message}</p>}
                  <div className="pt-1 mb-4">
                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-info btn-lg text-light btn-block" type="submit">Login</button>
                  </div>
                  <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">회원정보를 잊어버리셨나요?</a></p>
                  <p>회원이 아니신가요? <a href="#!" className="link-info">회원가입</a></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <form action="/" className={loginStyles.loginForm} onSubmit={handleLogin}>
        <div>
          <label htmlFor="userId">아이디</label>
          <input
            id="userId"
            name="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="userPassword">비밀번호</label>
          <input
            id="userPassword"
            name="userPassword"
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>
        <div className={loginStyles.btnList}>
          <button type="submit">로그인</button>
        </div>
      </form> */}
    </>
  );
}

export default Login;
