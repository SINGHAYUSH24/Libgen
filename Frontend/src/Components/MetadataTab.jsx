import React from "react";

const MetadataItem = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-sm font-medium text-muted">{label}</span>
    <span className="font-medium text-foreground">{value || "—"}</span>
  </div>
);

const KeywordBadge = ({ keyword }) => (
  <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium border border-border">
    {keyword}
  </span>
);

const MetadataTab = ({ data }) => {
  const {
    title,
    authors = [],
    category,
    keywords = [],
    publication_year,
  } = data || {};

  return (
    <div className="w-full h-full bg-card border-1 rounded-xl border-border px-6 py-5 overflow-y-auto">
      <h2 className="text-lg font-semibold text-foreground mb-6 text-center bg-indigo-400 text-white py-3 rounded-xl">
        Document Information
      </h2>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <MetadataItem label="Title" value={title} />
        <MetadataItem label="Publication Year" value={publication_year} />
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-muted">Authors</span>
          <div className="flex flex-wrap gap-2">
            {authors.length
              ? authors.map((author, i) => (
                  <KeywordBadge key={i} keyword={author} />
                ))
              : "—"}
          </div>
        </div>

        <MetadataItem label="Category" value={category} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-muted">Keywords</span>
        <div className="flex flex-wrap gap-2">
          {keywords.length
            ? keywords.map((keyword, i) => (
                <KeywordBadge key={i} keyword={keyword} />
              ))
            : "—"}
        </div>
      </div>
    </div>
  );
};

export default MetadataTab;
