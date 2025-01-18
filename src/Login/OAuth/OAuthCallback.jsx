// src/Login/OAuth/OAuthCallback.jsx
import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../constant';

const OAuthCallback = () => {
  const { provider } = useParams();         // /account/:provider/callback => provider = 'kakao'
  const location = useLocation();           // ?code=xxxxx
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
        // 예: https://api-makourse.kro.kr/account/kakao/login
        const apiUrl = `${API_URL}/account/${provider}/login`;

        console.log('Provider:', provider);
        console.log('Code:', code);
        console.log('API URL:', apiUrl);

        // 서버로 인증코드 전송
        const response = await axios.post(
          apiUrl,
          { code },
          { withCredentials: true }
        );

        // 서버로부터 받은 토큰 예시
        const { accessToken, refreshToken, is_new } = response.data;

        // 로컬스토리지 혹은 쿠키에 저장
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

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
