import './TermsPage.css';
import { useState } from 'react';

const TermsPage = ({ onChecksChange }) => {
    const [checks, setChecks] = useState([false, false]);

    const handleCheck = (index) => {
        const newChecks = [...checks];
        newChecks[index] = !newChecks[index];
        setChecks(newChecks);
        onChecksChange(newChecks);
    }

    const handleCheckAll = () => {
        const newChecks = [true, true];
        setChecks(newChecks);
        onChecksChange(newChecks);
    }

    return (
        <div className="termsPage">
            <div className="termsPage-content">
                <div className="termsPage-content-title">회원가입 약관을</div>
                <div className="termsPage-content-title">확인해주세요.</div>
            </div>
            <div className="termsPage-terms">
                <div className="termsPage-terms-item">
                    <div className="terms-left">
                        <img 
                            className="termsPage-checkBtn" 
                            src={checks[0] ? "/term-checked.svg" : "/term-check.svg"} 
                            alt="check" 
                            onClick={() => handleCheck(0)}
                            style={{ opacity: checks[0] ? 1 : 0.8 }}
                        />
                        <div className="termsPage-terms-title">서비스 이용약관 | 필수</div>
                    </div>
                    <img className="termsPage-terms-arrow" src="/term-arrow.svg" alt="arrow" />
                </div>
                <div className="termsPage-terms-item">
                    <div className="terms-left">
                        <img 
                            className="termsPage-checkBtn" 
                            src={checks[1] ? "/term-checked.svg" : "/term-check.svg"} 
                            alt="check" 
                            onClick={() => handleCheck(1)}
                        />
                        <div className="termsPage-terms-title">개인 정보 수집 및 이용 동의 | 필수</div>
                    </div>
                    <img className="termsPage-terms-arrow" src="/term-arrow.svg" alt="arrow" />
                </div>
                <div className="termsPage-terms-agree" onClick={handleCheckAll}>
                    <div className="termsPage-terms-agree-btn"> 모두 동의</div>
                </div>
            </div>
        </div>
    )
}

export default TermsPage;