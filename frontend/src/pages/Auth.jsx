import { useState } from 'react';
import '../styles/Auth.css';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState('');
  const [showUsers, setShowUsers] = useState(false);

  // 회원가입
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setMessage('❌ 모든 필드를 입력하세요.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ 회원가입 성공! 로그인해주세요.');
        setFormData({ username: '', email: '', password: '' });
        setIsLogin(true);
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ 회원가입 실패');
      console.error(error);
    }
  };

  // 로그인
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setMessage('❌ 사용자명과 비밀번호를 입력하세요.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setCurrentUser(data.user);
        setMessage(`✅ 로그인 성공! 환영합니다, ${data.user.username}님!`);
        setFormData({ username: '', email: '', password: '' });
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ 로그인 실패');
      console.error(error);
    }
  };

  // 가입자 목록 조회
  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/auth/users');
      const data = await res.json();
      setUsers(data.users);
      setShowUsers(true);
    } catch (error) {
      console.error('사용자 목록 조회 실패:', error);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setMessage('✅ 로그아웃되었습니다.');
  };

  return (
    <div className="auth-container">
      <h2>🔐 인증 시스템</h2>

      {currentUser ? (
        <div className="user-profile">
          <div className="profile-card">
            <h3>👤 {currentUser.username}</h3>
            <p>이메일: {currentUser.email}</p>
            <p>ID: {currentUser.id}</p>
            <button onClick={handleLogout} className="btn btn-logout">
              로그아웃
            </button>
          </div>

          <button onClick={fetchUsers} className="btn">
            {showUsers ? '가입자 목록 닫기' : '모든 가입자 보기'}
          </button>

          {showUsers && (
            <div className="users-list">
              <h4>가입된 사용자 ({users.length}명)</h4>
              {users.map((user) => (
                <div key={user.id} className="user-item">
                  <strong>{user.username}</strong> - {user.email}
                  <small>{new Date(user.createdAt).toLocaleDateString()}</small>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="auth-form">
          <div className="form-toggle">
            <button
              className={`toggle-btn ${isLogin ? 'active' : ''}`}
              onClick={() => {
                setIsLogin(true);
                setMessage('');
              }}
            >
              로그인
            </button>
            <button
              className={`toggle-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => {
                setIsLogin(false);
                setMessage('');
              }}
            >
              회원가입
            </button>
          </div>

          <form onSubmit={isLogin ? handleLogin : handleRegister}>
            <input
              type="text"
              placeholder="사용자명"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />

            {!isLogin && (
              <input
                type="email"
                placeholder="이메일"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            )}

            <input
              type="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            <button type="submit" className="btn-submit">
              {isLogin ? '로그인' : '회원가입'}
            </button>
          </form>

          {message && <p className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</p>}
        </div>
      )}
    </div>
  );
}

