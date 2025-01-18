import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OAuthCallback = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
        
        // URL 경로에서 소셜 로그인 제공자 확인
        const provider = location.pathname.split('/')[2]; // 'google', 'kakao', 'naver'
        
        if (code) {
            sendAuthCode(code, provider);
        }
    }, [location]);

    const sendAuthCode = async (code, provider) => {
        try {
            console.log(code);
            const response = await axios.post(`${process.env.VITE_API_URL}/${provider}/login`, {
                code: code
            });
            
            // 서버로부터 받은 토큰 저장
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            
            if(response.data.is_new){
                navigate('/signup');
            }else{
                navigate('/home');
            }
            
        } catch (error) {
            console.error('OAuth 인증 실패:', error);
            navigate('/');
        }
    };

    return (
        <div>로그인 처리 중...</div>
    );
};

export default OAuthCallback; 