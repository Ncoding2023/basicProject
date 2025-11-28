import { useState, useEffect } from 'react';
import '../styles/Board.css';

export default function Board() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', author: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  // 게시글 목록 조회
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8080/api/posts');
      const data = await res.json();
      setPosts(data.posts);
    } catch (error) {
      console.error('게시글 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // 게시글 작성/수정
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.author) {
      alert('모든 필드를 입력하세요.');
      return;
    }

    try {
      let res;
      if (editingId) {
        res = await fetch(`http://localhost:8080/api/posts/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        res = await fetch('http://localhost:8080/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }

      if (res.ok) {
        fetchPosts();
        setFormData({ title: '', content: '', author: '' });
        setShowForm(false);
        setEditingId(null);
        alert(editingId ? '수정되었습니다!' : '작성되었습니다!');
      }
    } catch (error) {
      console.error('게시글 저장 실패:', error);
    }
  };

  // 게시글 삭제
  const handleDelete = async (id) => {
    if (!window.confirm('삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`http://localhost:8080/api/posts/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        fetchPosts();
        setSelectedPost(null);
        alert('삭제되었습니다!');
      }
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
    }
  };

  // 게시글 상세보기
  const handleSelectPost = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/posts/${id}`);
      const post = await res.json();
      setSelectedPost(post);
    } catch (error) {
      console.error('게시글 조회 실패:', error);
    }
  };

  // 수정 버튼
  const handleEdit = (post) => {
    setFormData({ title: post.title, content: post.content, author: post.author });
    setEditingId(post.id);
    setShowForm(true);
    setSelectedPost(null);
  };

  return (
    <div className="board-container">
      <h2>📝 게시판</h2>

      <button
        className="btn-write"
        onClick={() => {
          setShowForm(!showForm);
          setEditingId(null);
          setFormData({ title: '', content: '', author: '' });
        }}
      >
        {showForm ? '취소' : '✏️ 글쓰기'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="form-container">
          <h3>{editingId ? '게시글 수정' : '새 게시글'}</h3>
          <input
            type="text"
            placeholder="작성자"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          />
          <input
            type="text"
            placeholder="제목"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <textarea
            placeholder="내용"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
          <button type="submit" className="btn-submit">
            {editingId ? '수정 완료' : '작성'}
          </button>
        </form>
      )}

      {loading ? (
        <p>로딩 중...</p>
      ) : selectedPost ? (
        <div className="post-detail">
          <button onClick={() => setSelectedPost(null)} className="btn-back">
            ← 목록으로
          </button>
          <h3>{selectedPost.title}</h3>
          <div className="post-meta">
            <span>작성자: {selectedPost.author}</span>
            <span>조회수: {selectedPost.views}</span>
            <span>작성일: {new Date(selectedPost.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="post-content">{selectedPost.content}</div>
          <div className="post-actions">
            <button onClick={() => handleEdit(selectedPost)} className="btn">
              수정
            </button>
            <button onClick={() => handleDelete(selectedPost.id)} className="btn btn-danger">
              삭제
            </button>
          </div>
        </div>
      ) : (
        <div className="posts-list">
          {posts.length === 0 ? (
            <p>게시글이 없습니다.</p>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="post-item"
                onClick={() => handleSelectPost(post.id)}
              >
                <div className="post-title">{post.title}</div>
                <div className="post-info">
                  <span>{post.author}</span>
                  <span>조회수: {post.views}</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

