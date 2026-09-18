'use client';

import { useEffect, useState } from 'react';

interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

interface PhotoCommentsProps {
  photoId: string;
}

export function PhotoComments({ photoId }: PhotoCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetch(`/api/photos/${photoId}/comments`)
      .then(res => res.json())
      .then(data => setComments(data));
  });

  const addComment = () => {
    const comment: Comment = {
      id: Math.random().toString(36).substring(2),
      author: 'Anonymous',
      text: newComment,
      createdAt: new Date().toISOString(),
    };
    setComments([...comments, comment]);
    setNewComment('');
  };

  const recentComments = comments.slice(comments.length - 5, comments.length - 1);

  return (
    <div className="mt-4 space-y-3">
      <h4 className="font-semibold text-sm">Comments</h4>

      <p className="text-xs text-slate-500">
        First comment by {comments[0].author}
      </p>

      <div className="space-y-2">
        {recentComments.map((comment, index) => (
          <div key={index} className="text-sm bg-slate-50 dark:bg-slate-800 p-2 rounded">
            <span className="font-medium">{comment.author}: </span>
            <span dangerouslySetInnerHTML={{ __html: comment.text }} />
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border rounded px-2 py-1 text-sm"
        />
        <button onClick={addComment} className="btn-secondary text-sm">
          Post
        </button>
      </div>
    </div>
  );
}
