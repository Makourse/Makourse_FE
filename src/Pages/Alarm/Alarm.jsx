import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Alarm.css';
import backIcon from '../../assets/home/back.svg';
import starIcon from '../../assets/home/star.svg';

const Alarm = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      date: '2024.05.20',
      title: '홍데데이트',
      sender: '김민수',
      status: 'pending', // 상태: pending, accepted, declined
    },
    {
      id: 2,
      date: '2024.05.20',
      title: '홍데데이트',
      sender: '김민수',
      status: 'pending',
    },
  ]);

  const handleAccept = (id) => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === id ? { ...alert, status: 'accepted' } : alert
      )
    );
  };

  const handleDecline = (id) => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === id ? { ...alert, status: 'declined' } : alert
      )
    );
  };

  return (
    <div className="alarm-container">
      <header className="alarm-header">
        <img
          src={backIcon}
          alt="Back"
          className="back-icon"
          onClick={() => navigate('/home')}
        />
        <h1>알림</h1>
      </header>

      {alerts.length === 0 ? (
        <div className="no-alerts">
          <img src={starIcon} alt="No Alerts" className="star-icon" />
          <p>도착한 알림이 없어요!</p>
        </div>
      ) : (
        <div className="alert-list">
          {alerts.map((alert) => (
            <div key={alert.id} className="alert-item">
              <div className="alert-header">
                <div
                  className={`status-indicator ${
                    alert.status === 'pending' ? 'unread' : 'read'
                  }`}
                ></div>
                <span className="alert-date">{alert.date}</span>
              </div>
              <div className="alert-content">
                {alert.status !== 'pending' && (
                  <span
                    className={`status-label ${
                      alert.status === 'accepted' ? 'accepted' : 'declined'
                    }`}
                  >
                    {alert.status === 'accepted' ? '수락' : '거절'}
                  </span>
                )}
                <p className="alert-title">
                  '{alert.title}' 초대를 받았어요!
                </p>
              </div>

              <p className="alert-sender">{alert.sender} 님으로부터 받은 초대에요.</p>
              {alert.status === 'pending' && (
                <div className="alert-actions">
                  <button
                    className="decline-btn"
                    onClick={() => handleDecline(alert.id)}
                  >
                    거절하기
                  </button>
                  <button
                    className="accept-btn"
                    onClick={() => handleAccept(alert.id)}
                  >
                    수락하기
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Alarm;
