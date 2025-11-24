'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditPost() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(async (res) => {
        if (res.status === 404) {
          router.push('/not-found');
        } else {
          const post = await res.json();
          setTitle((post as { title: string }).title);
          setContent((post as { content: string }).content);
          setLoading(false);
        }
      })
      .catch(() => {
        router.push('/not-found');
      });
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      router.push(`/post/${id}`);
    } else {
      alert('Failed to update post');
    }
  };

  if (loading) {
    return <p className="container mt-4">Loading...</p>;
  }

  return (
    <main className="container mt-4">
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success">
            Update
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => router.push(`/post/${id}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}