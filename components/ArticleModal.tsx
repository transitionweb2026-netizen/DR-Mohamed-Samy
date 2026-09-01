"use client";

import { useEffect } from "react";

type ImageContent = { url: string; mediaId: string | null; alt: string };
export type OpenArticle = { tag: string; title: string; body: string; image: ImageContent };

// Shared "read the full article" popup - used by both the Home page's
// Insights preview cards and the Articles page's own grid/featured article,
// since both surfaces show the same underlying articles (see
// lib/cms/queries.ts's articleRefs resolution) and should read identically.
export default function ArticleModal({ article, onClose }: { article: OpenArticle | null; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = article ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [article]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 transition-opacity duration-300 ${
        article ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-surface/90 to-surface/95 backdrop-blur-sm" onClick={onClose}></div>
      <div
        className={`popup-content relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-[0_30px_60px_rgba(0,107,91,0.15),inset_0_0_40px_rgba(24,213,184,0.2)] transition-all duration-300 ${
          article ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <button
          className="sticky top-4 float-end me-4 z-50 w-10 h-10 rounded-full bg-white/70 flex items-center justify-center hover:bg-white/90 text-primary transition-colors border border-white/60 shadow-lg"
          onClick={onClose}
          type="button"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        {article && (
          <div className="p-8 md:p-12 pt-16">
            <div className="rounded-2xl overflow-hidden mb-6 aspect-video">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={article.image.alt} className="w-full h-full object-cover" src={article.image.url} />
            </div>
            <span className="inline-block bg-primary-container/30 text-primary px-4 py-1 rounded-full font-label-sm uppercase tracking-wider border border-primary/20 mb-4">
              {article.tag}
            </span>
            <h3 className="font-hero-headline text-3xl md:text-5xl text-primary text-glow leading-tight uppercase mb-6">
              {article.title}
            </h3>
            <div className="font-body-lg text-on-surface-variant whitespace-pre-line leading-relaxed space-y-4">
              {article.body}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
