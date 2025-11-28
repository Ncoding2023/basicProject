import { useState, useEffect } from 'react';
import './App.css';
import Board from './pages/Board';
import Auth from './pages/Auth';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [message, setMessage] = useState('서버 연결 대기 중...');
  const [users, setUsers] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  // 초기화 - hello 메시지 받기
  useEffect(() => {
    fetch('http://localhost:8080/api/hello')
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => setMessage('❌ 서버 연결 실패: 백엔드가 켜져 있나요?'));
  }, []);

  // 사용자 목록 받기
  const fetchUsers = () => {
    fetch('http://localhost:8080/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error('사용자 조회 실패:', error));
  };

  // 메시지 전송
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    try {
      const response = await fetch('http://localhost:8080/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: inputMessage })
      });
      const data = await response.json();
      setResponseMessage(`✅ 전송됨: ${data.receivedMessage}`);
      setInputMessage('');
    } catch (error) {
      setResponseMessage('❌ 전송 실패');
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>🚀 Node.js + React 풀스택 템플릿</h1>
        <nav className="navbar">
          <button
            className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentPage('home')}
          >
            🏠 홈
          </button>
          <button
            className={`nav-btn ${currentPage === 'board' ? 'active' : ''}`}
            onClick={() => setCurrentPage('board')}
          >
            📝 게시판
          </button>
          <button
            className={`nav-btn ${currentPage === 'auth' ? 'active' : ''}`}
            onClick={() => setCurrentPage('auth')}
          >
            🔐 회원
          </button>
        </nav>
      </header>
      <main>
        {currentPage === 'home' && (
          <>
            <div className="card">
              <h2>🔗 서버 연결 상태</h2>
              <p className="status-message">{message}</p>
            </div>

            <div className="card">
              <h2>👥 사용자 목록</h2>
              <button onClick={fetchUsers} className="btn">
                사용자 조회
              </button>
              {users.length > 0 && (
                <ul className="user-list">
                  {users.map((user) => (
                    <li key={user.id}>
                      {user.name} ({user.email})
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="card">
              <h2>📨 메시지 전송</h2>
              <div className="message-input">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="메시지를 입력하세요..."
                />
                <button onClick={sendMessage} className="btn">
                  전송
                </button>
              </div>
              {responseMessage && <p className="response">{responseMessage}</p>}
            </div>

            <div className="info">
              <p>📦 Frontend: React 18 + Vite</p>
              <p>🚀 Backend: Node.js + Express</p>
              <p>📚 API 문서: <a href="http://localhost:8080/api-docs" target="_blank" rel="noopener noreferrer">Swagger UI</a></p>
            </div>
          </>
        )}

        {currentPage === 'board' && <Board />}

        {currentPage === 'auth' && <Auth />}
      </main>
    </div>
  );
}

export default App;


