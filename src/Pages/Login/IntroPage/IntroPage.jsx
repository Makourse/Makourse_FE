import './IntroPage.css';
import { useEffect, useState } from 'react';

const KakaoLoginBtn = ({ show }) => {
    return (
        <div className={`kakaoLoginBox ${show ? 'show' : ''}`}>
            <img className='kakaoLogo' src='./kakaologo.svg' alt="kakao-login" />
            <p className='kakaoLoginText'>카카오 로그인</p>
        </div>        
    )
}

const NaverLoginBtn = ({ show }) => {
    return (
        <div className={`naverLoginBox ${show ? 'show' : ''}`}>
            <img className='naverLogo' src='./naverlogo.svg' alt="naver-login" />
            <p className='naverLoginText'>네이버 로그인</p>
        </div>        
    )
}

const GoogleLoginBtn = ({ show }) => {
    return (
        <div className={`googleLoginBox ${show ? 'show' : ''}`}>
            <img className='googleLogo' src='./googlelogo.svg' alt="google-login" />
            <p className='googleLoginText'>구글 로그인</p>
        </div>        
    )
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
                <KakaoLoginBtn show={showKakao} />
                <NaverLoginBtn show={showNaver} />
                <GoogleLoginBtn show={showGoogle} />
            </div>
        </div>
    )
}


export default IntroPage;