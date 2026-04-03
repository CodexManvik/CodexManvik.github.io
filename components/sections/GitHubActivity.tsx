'use client';

import { useEffect, useState } from 'react';

type CommitItem = {
  id: string;
  repo: string;
  hash: string;
  message: string;
  date: string;
  url: string;
};

export function GitHubActivity() {
  const [commits, setCommits] = useState<CommitItem[]>([]);
  const [pending, setPending] = useState(true);

  const [contribSvg, setContribSvg] = useState<string | null>(null);
  const [contribLoading, setContribLoading] = useState(true);
  const [contribError, setContribError] = useState(false);

  useEffect(() => {
    async function loadContrib() {
      try {
        const res = await fetch('/assets/github-contrib.svg');
        if (!res.ok) throw new Error('Failed to load contributions SVG');
        const text = await res.text();
        setContribSvg(text);
      } catch (err) {
        console.error('Contributions fetch error', err);
        setContribError(true);
      } finally {
        setContribLoading(false);
      }
    }

    loadContrib();
  }, []);

  useEffect(() => {
    async function loadCommits() {
      try {
        const response = await fetch('https://api.github.com/users/CodexManvik/events/public?per_page=100', {
          headers: { Accept: 'application/vnd.github+json' },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch commit data');
        }
        const events = await response.json();

        const data: CommitItem[] = events.flatMap((event: any) => {
          if (event.type !== 'PushEvent') return [];

          if (Array.isArray(event.payload?.commits) && event.payload.commits.length > 0) {
            return event.payload.commits.map((c: any) => ({
              id: `${event.id}-${c.sha}`,
              repo: event.repo.name,
              hash: c.sha.slice(0, 7),
              message: c.message,
              url: `https://github.com/${event.repo.name}/commit/${c.sha}`,
              date: event.created_at,
            }));
          }

          // Fallback when `payload.commits` isn't present (some PushEvent variants)
          return [
            {
              id: event.id,
              repo: event.repo.name,
              hash: event.payload?.head ? String(event.payload.head).slice(0, 7) : '',
              message: event.payload?.ref ? `Push to ${String(event.payload.ref).replace('refs/heads/', '')}` : 'Push event',
              url: `https://github.com/${event.repo.name}`,
              date: event.created_at,
            },
          ];
        });

        setCommits(data.slice(0, 10));
      } catch (error) {
        console.error('GitHub activity fetch error', error);
      } finally {
        setPending(false);
      }
    }

    loadCommits();
  }, []);

  return (
    <section className="relative bg-black/70 p-6 rounded-2xl border border-slate-800" aria-label="GitHub activity section">
      <h2 className="mb-3 text-2xl font-bold text-white">GitHub activity</h2>
      <p className="mb-4 text-sm text-slate-300">Live public commits feed (top 10).</p>

      <div className="mb-4 flex justify-center">
        {contribLoading ? (
          <div className="text-slate-400">Loading contributions...</div>
        ) : contribError || !contribSvg ? (
          <div className="text-sm text-slate-400">
            Contributions graph unavailable.{' '}
            <a className="text-indigo-300 hover:text-indigo-200" href="https://github.com/CodexManvik" target="_blank" rel="noreferrer">
              View on GitHub
            </a>
          </div>
        ) : (
          <div className="w-full max-w-[720px] gh-contrib" dangerouslySetInnerHTML={{ __html: contribSvg }} />
        )}
      </div>

      {pending ? (
        <div className="text-slate-200">Loading commits...</div>
      ) : commits.length === 0 ? (
        <div className="text-slate-300">
          No recent commit data available.{' '}
          <a className="text-indigo-300 hover:text-indigo-200" href="https://github.com/CodexManvik" target="_blank" rel="noreferrer">
            View profile
          </a>
        </div>
      ) : (
        <details className="relative">
          <summary className="cursor-pointer select-none rounded-md border border-slate-700 bg-zinc-900 px-4 py-3 text-sm text-slate-200 hover:bg-zinc-800 focus:outline-none">
            Recent activity ({commits.length})
          </summary>

          <div className="mt-2 rounded-xl border border-slate-700 bg-zinc-900 p-3">
            <ul className="space-y-3 max-h-64 overflow-auto">
              {commits.map((commit) => (
                <li key={commit.id} className="rounded-md border border-slate-700 bg-zinc-900 p-3">
                  <a className="font-semibold text-indigo-300 hover:text-indigo-200" href={commit.url} target="_blank" rel="noreferrer">
                    {commit.repo}
                  </a>
                  <p className="text-sm text-slate-200 truncate">{commit.message}</p>
                  <p className="text-xs text-slate-400">{new Date(commit.date).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          </div>
        </details>
      )}
    </section>
  );
}
