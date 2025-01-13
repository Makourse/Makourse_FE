import './SignUpPage.css';
import TermsPage from './TermsPage';
import SetProfilePage from './SetProfilePage';
import { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const SignUpPage = () => {
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [progress, setProgress] = useState(0);
    const [name, setName] = useState('');

    const handleChecksChange = (checks) => {
        setIsAllChecked(checks.every(check => check === true));
    }

    const handleNameChange = (name) => {
        setName(name);
    }

    const handleNext = () => {
        setProgress(progress + 1);
    }

    const handleBack = () => {
        setProgress(progress - 1);
        setIsAllChecked(false);
    }

    return (
        <div className='signUpPage'>
            <header className="signUpPage-header">
                <div className="back-button" onClick={progress > 0 ? handleBack : undefined}>
                    <img src='/header-goback.svg' alt="back" />
                </div>
                <h1>회원가입</h1>
            </header>
            {progress === 0 && <TermsPage onChecksChange={handleChecksChange} />}
            {progress === 1 && <SetProfilePage onNameChange={handleNameChange} />}
            <div className="signUpPage-progress">
                <div className="signUpPage-progress-bar">
                    <TransitionGroup>
                        <CSSTransition
                            key={progress}
                            timeout={300}
                            classNames="fade"
                        >
                            <img 
                                src={progress === 0 ? "/progressBarL.svg" : "/progressBarR.svg"} 
                                alt="progress" 
                            />
                        </CSSTransition>
                    </TransitionGroup>
                </div>
            </div>
            <div className={`signUpPage-next ${
                (progress === 0 && isAllChecked) || 
                (progress === 1 && name.trim().length > 0) ? 'active' : ''
            }`} onClick={
                ((progress === 0 && isAllChecked) || 
                (progress === 1 && name.trim().length > 0)) ? handleNext : undefined
            }>
                <div className={`signUpPage-next-btn ${
                    (progress === 0 && isAllChecked) || 
                    (progress === 1 && name.trim().length > 0) ? 'active' : ''
                }`}>
                    다음
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;