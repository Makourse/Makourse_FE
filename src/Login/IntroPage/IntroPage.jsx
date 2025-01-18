import './IntroPage.css';
import { KAKAO_ID, GOOGLE_ID, NAVER_ID, REDIRECT_URI, LOCAL_REDIRECT_URI } from '../constant';
import { useEffect, useState } from 'react';

const KakaoLoginBtn = ({ show, onClick }) => {
    return (
        <div className={`kakaoLoginBox ${show ? 'show' : ''}`} onClick={onClick}>
            <img className='kakaoLogo' src='./kakaologo.svg' alt="kakao-login" />
            <p className='kakaoLoginText'>카카오 로그인</p>
        </div>        
    )
}

const NaverLoginBtn = ({ show, onClick }) => {
    return (
        <div className={`naverLoginBox ${show ? 'show' : ''}`} onClick={onClick}>
            <img className='naverLogo' src='./naverlogo.svg' alt="naver-login" />
            <p className='naverLoginText'>네이버 로그인</p>
        </div>        
    )
}

const GoogleLoginBtn = ({ show, onClick }) => {
    return (
        <div className={`googleLoginBox ${show ? 'show' : ''}`} onClick={onClick}>
            <img className='googleLogo' src='./googlelogo.svg' alt="google-login" />
            <p className='googleLoginText'>구글 로그인</p>
        </div>        
    )
}

    const kakaoLogin = () => {
        const link = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_ID}&redirect_uri=${LOCAL_REDIRECT_URI}/account/kakao/callback/`;
        console.log('카카오 로그인 요청 URL:', link);
        window.location.href = link;
    }
    const googleLogin = () => {
        const link = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${GOOGLE_ID}&redirect_uri=${LOCAL_REDIRECT_URI}/account/google/callback/&scope=email%20profile`;
        window.location.href = link;
    }
    const naverLogin = () => {
        const link = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_ID}&redirect_uri=${LOCAL_REDIRECT_URI}/account/naver/callback/&state=test123`;
        window.location.href = link;
    }


const IntroPage = () => {
    const [animate, setAnimate] = useState(false);
    const [showKakao, setShowKakao] = useState(false);
    const [showNaver, setShowNaver] = useState(false);
    const [showGoogle, setShowGoogle] = useState(false);
    useEffect(() => {
        const timer1 = setTimeout(() => {
            setAnimate(true);
        }, 1000);

        const timer2 = setTimeout(() => {
            setShowKakao(true);
            setShowNaver(true);
            setShowGoogle(true);
        }, 1500); // 로고가 올라간 후 0.5초 뒤에 카카오 버튼 표시

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    return (
        <div className="intro-page">
            <div className='intro-background'>
                <div className={`intro-container ${animate ? 'slide-up' : ''}`}>
                    <img 
                        className='intro-logo' 
                        src='./intro-logo4.png' 
                        alt="logo"
                        loading="eager"
                        width="245"
                        height="245"
                        decoding="async"
                    />
                    <div className='intro-title-container'>
                        <h2 className='intro-subtitle'>당신의 데이트 베이스</h2>
                        <h1 className='intro-title'>Makourse</h1>
                    </div>
                </div>
                <KakaoLoginBtn show={showKakao} onClick={kakaoLogin}/>
                <NaverLoginBtn show={showNaver} onClick={naverLogin}/>
                <GoogleLoginBtn show={showGoogle} onClick={googleLogin}/>
            </div>
        </div>
    )
}


export default IntroPage;