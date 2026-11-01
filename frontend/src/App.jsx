import { useCallback, useEffect, useState } from 'react';
import './App.css';

const API = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');

export default function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Niranjan Kumar');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [editingId, setEditingId] = useState(null);

  const loadPosts = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const response = await fetch(`${API}/posts`);
      const result = await response.json();
      if (!response.ok || result.success === false) throw new Error(result.message || `HTTP ${response.status}`);
      setPosts(Array.isArray(result.data) ? result.data : []);
    } catch (e) {
      setError(`${e.message}. Check that the backend is running and VITE_API_URL is correct.`);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  function clearForm() {
    setTitle(''); setContent(''); setAuthor('Niranjan Kumar'); setImage(null); setEditingId(null);
    const input = document.getElementById('post-image');
    if (input) input.value = '';
  }

  async function submit(event) {
    event.preventDefault(); setError(''); setNotice('');
    if (!title.trim() || !content.trim()) { setError('Title and content are required.'); return; }
    const form = new FormData();
    form.append('title', title.trim()); form.append('content', content.trim());
    form.append('author', author.trim() || 'Niranjan Kumar');
    if (image) form.append('image', image);
    setSaving(true);
    try {
      const response = await fetch(editingId ? `${API}/posts/${editingId}` : `${API}/posts`, {
        method: editingId ? 'PUT' : 'POST', body: form
      });
      const result = await response.json();
      if (!response.ok || result.success === false) throw new Error(result.message || `HTTP ${response.status}`);
      setNotice(editingId ? 'Post updated successfully.' : 'Post created successfully.');
      clearForm(); await loadPosts();
    } catch (e) { setError(e.message || 'Unable to save post.'); }
    finally { setSaving(false); }
  }

  function edit(post) {
    setEditingId(post._id); setTitle(post.title || ''); setContent(post.content || '');
    setAuthor(post.author || 'Niranjan Kumar'); setImage(null); setError(''); setNotice('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function remove(id) {
    if (!window.confirm('Delete this post?')) return;
    setError(''); setNotice('');
    try {
      const response = await fetch(`${API}/posts/${id}`, { method: 'DELETE' });
      const result = await response.json();
      if (!response.ok || result.success === false) throw new Error(result.message || `HTTP ${response.status}`);
      setPosts((old) => old.filter((post) => post._id !== id));
      setNotice('Post deleted successfully.');
    } catch (e) { setError(e.message || 'Unable to delete post.'); }
  }

  return <div className="page">
    <header className="hero">
      <div><p className="eyebrow">PRODESK IT · SPRINT 11 · TRACK B</p>
        <h1>Blog <span>Data Hub</span></h1>
        <p>React + Express + MongoDB Atlas fullstack integration</p></div>
      <div className="badge">FULLSTACK<br/>PROJECT</div>
    </header>

    <section className="panel">
      <div className="section-head"><div><p className="eyebrow">PUBLISH CONTENT</p><h2>{editingId ? 'Edit post' : 'Create a post'}</h2></div>
        {editingId && <button className="btn light" type="button" onClick={clearForm}>Cancel edit</button>}</div>
      <form onSubmit={submit} className="form">
        <div className="field"><label htmlFor="post-title">Title *</label><input id="post-title" value={title} onChange={e=>setTitle(e.target.value)} maxLength={160} required placeholder="Enter post title"/></div>
        <div className="field"><label htmlFor="post-author">Author</label><input id="post-author" value={author} onChange={e=>setAuthor(e.target.value)} placeholder="Your name"/></div>
        <div className="field full"><label htmlFor="post-content">Content *</label><textarea id="post-content" rows="4" value={content} onChange={e=>setContent(e.target.value)} required placeholder="Write your post..."/></div>
        <div className="field full"><label htmlFor="post-image">Thumbnail image (optional, max 5 MB)</label><input id="post-image" type="file" accept="image/*" onChange={e=>setImage(e.target.files?.[0] || null)}/><small>Cloudinary credentials are required for image upload.</small></div>
        <div className="form-foot full"><span>* Required fields</span><button className="btn primary" disabled={saving}>{saving ? 'Saving…' : editingId ? 'Save changes' : 'Publish post'}</button></div>
      </form>
    </section>

    {error && <div className="alert error" role="alert">{error}</div>}
    {notice && <div className="alert success" role="status">{notice}</div>}

    <section className="posts">
      <div className="section-head"><div><p className="eyebrow">FROM MONGODB ATLAS</p><h2>Published posts <span className="count">{posts.length}</span></h2></div><button className="btn light" onClick={loadPosts} disabled={loading}>{loading ? 'Loading…' : '↻ Refresh'}</button></div>
      {loading ? <div className="empty"><div className="spinner"/><p>Loading posts…</p></div>
      : posts.length === 0 ? <div className="empty"><h3>No posts yet</h3><p>Create your first post using the form above.</p></div>
      : <div className="grid">{posts.map(post=><article className="card" key={post._id}>
        {post.imageUrl ? <img className="thumb" src={post.imageUrl} alt={post.title}/> : <div className="thumb placeholder">✦</div>}
        <div className="card-body"><small>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'New post'}</small><h3>{post.title}</h3><p className="content">{post.content}</p><div className="author">By {post.author || 'Unknown author'}</div><div className="actions"><button className="btn light" onClick={()=>edit(post)}>Edit</button><button className="btn danger" onClick={()=>remove(post._id)}>Delete</button></div></div>
      </article>)}</div>}
    </section>
    {/* <footer>API endpoint: <code>{API}/posts</code></footer> */}
  </div>;
}
