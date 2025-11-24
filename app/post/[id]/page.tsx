'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PostDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<unknown>(null);

  useEffect(() => {
    fetch(`/api/posts/${id}`).then(async (res) => {
      if (res.status === 404) router.push('/not-found');
      else setPost(await res.json());
    });
  }, [id, router]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    const response = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    
    if (response.ok) {
      router.push('/');
    } else {
      alert('Failed to delete post');
    }
  };

  if (!post) return <p className="container mt-4">Loading...</p>;

  return (
    <main className="container mt-4">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h1>{(post as { title: string }).title}</h1>
          <p className="text-muted">
            {new Date((post as { createdAt: string }).createdAt).toLocaleDateString('id-ID')}
          </p>
        </div>
        <div className="d-flex gap-2">
          <Link href={`/edit/${id}`} className="btn btn-warning">
            Edit
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
      
      <div className="card">
        <div className="card-body">
          <p className="card-text" style={{ whiteSpace: 'pre-wrap' }}>
            {(post as { content: string }).content}
          </p>
        </div>
      </div>

      <Link href="/" className="btn btn-secondary mt-3">
        ← Back to Home
      </Link>
    </main>
  );
}