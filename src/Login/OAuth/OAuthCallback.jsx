// src/Login/OAuth/OAuthCallback.jsx
import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../constant';

const OAuthCallback = () => {
  const { provider } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // URL의 query string 에서 code 추출
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    
    if (!provider || !code) {
      console.error('Provider 또는 code가 없습니다.');
      navigate('/');
      return;
    }

    (async () => {
      try {
        const apiUrl = `${API_URL}/account/${provider}/login/`;
        // 서버로 인증코드 전송
        const response = await axios.post(
          apiUrl,
          {
            "code": code,
            "address":0 //로컬에서 할 경우 1 배포 환경에서 할 경우 0
          }
        );
        console.log(response.data);
        // 서버로부터 받은 토큰 예시
        const { access, refresh, is_new } = response.data;

        // 로컬스토리지 혹은 쿠키에 저장
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);

        // 새 유저인지 여부에 따라 분기
        if (is_new) {
          navigate('/signup');
        } else {
          navigate('/home');
        }
      } catch (error) {
        console.error('OAuth 인증 실패:', error.response || error);
        navigate('/');
      }
    })();
  }, [provider, location.search, navigate]);

  return <div>로그인 처리 중...</div>;
};

export default OAuthCallback;
