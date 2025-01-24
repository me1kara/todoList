import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [message, setMessage] = useState(''); //로그인 성공 메세지
  const navigate = useNavigate(); // 라우터 

  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  
  const handleRegist = async function(){
        if(!userId.trim() || !userPassword.trim()){
            alert('아이디 패스워드를 모두 입력해주세요!');
            !userId ? window.document.getElementById('userId').focus() : window.document.getElementById('userPassword').focus();
            return;
        }
        try{
            const response = await axios.post('http://localhost:5000/register',{
                userId : userId,
                userPassword : userPassword
            });
            if(response.data.status == 'EXIST'){
               alert('사용자가 이미 존재합니다.'); 
            }
            if(response.data.status == 'S'){
               alert('회원가입에 성공했습니다.');
               navigate('/todo');
            }
        }catch(error){
            console.log(error);
            alert('회원가입에 실패했습니다!');
        }

  }

  return (
    <>
        <section className='py-5'>
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                    <div className="card" style={{ borderRadius: '15px' }}>
                        <div className="card-body p-5">
                        <h2 className="text-uppercase text-center mb-5">회원가입</h2>

                        <form action='/' onSubmit={handleRegist}>
                            <div className="form-outline mb-4">
                            <input type="text" id="uesrId" className="form-control form-control-lg" onChange={(e) => setUserId(e.target.value)} />
                            <label className="form-label" htmlFor="uesrId">아이디</label>
                            </div>
                            <div className="form-outline mb-4">
                            <input type="password" id="userPassword" className="form-control form-control-lg" onChange={(e) => setUserPassword(e.target.value)}/>
                            <label className="form-label" htmlFor="userPassword">비밀번호</label>
                            </div>
                            <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-success btn-block btn-lg text-light">
                                가입하기
                            </button>
                            </div>
                        </form>

                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    </>
  );
}

export default Register;
