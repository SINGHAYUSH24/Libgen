import Navbar from "./Navbar";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Search as SearchIcon,
  Loader2,
  Library,
  BookOpen,
  User,
  Calendar,
  Tag,
  CheckCircle,
  XCircle,
  BookX,
} from "lucide-react";
import styles from "../assets/Search.module.css";
import {useNavigate,useLocation} from "react-router-dom";
import api from "../api/axios";
const filters = [
  { value: "keywords", label: "Keywords", icon: "🔑" },
  { value: "title", label: "Title", icon: "📖" },
  { value: "author", label: "Author", icon: "✍️" },
  { value: "category", label: "Category", icon: "📂" },
  { value: "year", label: "Year", icon: "📅" },
];

const Search = () => {
  const [resources, setResources] = useState([]);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("keywords");
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const navigate=useNavigate();
const fetchResources = useCallback(async (searchQuery, searchType) => {
  try {
    setLoading(true);

    const res = await api.get("/user/search", {
      params: {
        q: searchQuery?.trim() || "",
        type: searchType
      }
    });

    setResources(Array.isArray(res.data) ? res.data : []);
    setInitialLoad(false);
  } catch (error) {
    console.error("Search error:", error);
    setResources([]);
  } finally {
    setLoading(false);
  }
}, []);


  useEffect(() => {
    fetchResources("", type);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchResources(query, type);
    }, 400);

    return () => clearTimeout(timer);
  }, [query, type, fetchResources]);
  const view=(resource)=>{
    navigate("/resource",{
      state:{
      item:resource}
    })
  }

  return (
    <>      <Navbar />
    <div className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.heroBackground} />
        <div className={styles.heroDecorative}>
          <div className={styles.decorCircle1} />
          <div className={styles.decorCircle2} />
        </div>

        <div className={styles.heroContainer}>
          <div className={styles.heroHeader}>
            <h1 className={styles.heroTitle}>Discover Knowledge</h1>
            <p className={styles.heroSubtitle}>
              Search through our extensive collection of books, journals, and academic resources
            </p>
          </div>
          <div className={styles.searchWrapper}>
            <div className={styles.searchBox}>
              <div className={styles.searchInner}>
                {loading ? (
                  <Loader2 className={`${styles.searchIcon} ${styles.spinner}`} />
                ) : (
                  <SearchIcon className={styles.searchIcon} />
                )}
                <input
                  type="text"
                  placeholder={`Search by ${type}...`}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className={styles.searchInput}
                />
                {query && (
                  <button onClick={() => setQuery("")} className={styles.clearBtn}>
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className={styles.filtersWrapper}>
            <div className={styles.filtersContainer}>
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setType(filter.value)}
                  className={`${styles.filterButton} ${
                    type === filter.value ? styles.active : ""
                  }`}
                >
                  <span className={styles.filterIcon}>{filter.icon}</span>
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className={styles.resultCount}>
            <p className={styles.resultText}>
              {loading ? (
                "Searching..."
              ) : (
                <>
                  <span className={styles.resultNumber}>{resources.length}</span>
                  {" "}resource{resources.length !== 1 ? "s" : ""} found
                </>
              )}
            </p>
          </div>
        </div>
      </section>
      <section className={styles.resultsSection}>
        <div className={styles.sectionHeader}>
          <Library className={styles.libraryIcon} />
          <h2 className={styles.sectionTitle}>
            {query ? "Search Results" : "All Resources"}
          </h2>
        </div>
        {initialLoad || (loading && resources.length === 0) ? (
          <div className={styles.skeletonGrid}>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={styles.skeletonCard}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={styles.skeletonHeader}>
                  <div className={styles.skeletonIcon} />
                  <div className={styles.skeletonTitleGroup}>
                    <div className={styles.skeletonTitleLine} />
                    <div className={styles.skeletonSubtitleLine} />
                  </div>
                </div>
                <div className={styles.skeletonAuthorRow}>
                  <div className={styles.skeletonAuthorIcon} />
                  <div className={styles.skeletonAuthorLine} />
                </div>
                <div className={styles.skeletonMetaRow}>
                  <div className={styles.skeletonMetaItem} />
                  <div className={styles.skeletonMetaItem} />
                </div>
              </div>
            ))}
          </div>
        ) : resources.length === 0 ? (
          <div className={styles.emptyContainer}>
            <div className={styles.emptyIconWrapper}>
              {query ? (
                <BookX className={styles.emptyIcon} />
              ) : (
                <SearchIcon className={styles.emptyIcon} />
              )}
            </div>
            <h3 className={styles.emptyTitle}>
              {query ? "No results found" : "Start your search"}
            </h3>
            <p className={styles.emptyMessage}>
              {query
                ? `We couldn't find any resources matching "${query}". Try adjusting your search terms or filters.`
                : "Enter a search term above to discover books, journals, and academic resources."}
            </p>
            {query && (
              <div className={styles.suggestions}>
                <span className={styles.suggestLabel}>Try searching for:</span>
                {["Machine Learning", "Data Science", "History"].map((suggestion) => (
                  <button
                    key={suggestion}
                    className={styles.suggestionPill}
                    onClick={() => setQuery(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className={styles.resultsGrid}>
            {resources.map((resource, index) => {
              const isAvailable = resource.availability > 0;
              const year = resource.year || resource.publication_year;

              return (
                <article
                  key={`${resource.title}-${index}`}
                  className={styles.card}
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.cardHeaderLeft}>
                      <div className={styles.cardIconWrapper}>
                        <BookOpen className={styles.bookIcon} />
                      </div>
                      <div>
                        <h3 className={styles.cardTitle} onClick={resource.availability===0?()=>{view(resource)}:()=>{}} style={{cursor:"pointer"}}>{resource.title}</h3>
                      </div>
                    </div>
                    <span
                      className={`${styles.badge} ${
                        isAvailable ? styles.available : styles.unavailable
                      }`}
                    >
                      {isAvailable ? (
                        <>
                          <CheckCircle className={styles.badgeIcon} />
                          Available
                        </>
                      ) : (
                        <>
                          <XCircle className={styles.badgeIcon} />
                          Unavailable
                        </>
                      )}
                    </span>
                  </div>

                  <div className={styles.authors}>
                    <User className={styles.authorIcon} />
                    <p className={styles.authorText}>
                      {resource.authors?.join(", ") || "Unknown Author"}
                    </p>
                  </div>

                  <div className={styles.meta}>
                    <div className={styles.metaItem}>
                      <Tag className={styles.metaIcon} />
                      <span className={styles.metaText}>{resource.category}</span>
                    </div>
                    {year && (
                      <div className={styles.metaItem}>
                        <Calendar className={styles.metaIcon} />
                        <span className={styles.metaText}>{year}</span>
                      </div>
                    )}
                    {isAvailable && resource.availability > 1 && (
                      <span className={styles.copiesText}>
                        {resource.availability} copies available
                      </span>
                    )}
                  </div>

                  {resource.keywords && resource.keywords.length > 0 && (
                    <div className={styles.keywords}>
                      {resource.keywords.slice(0, 4).map((keyword, i) => (
                        <span key={i} className={styles.keyword}>
                          {keyword}
                        </span>
                      ))}
                      {resource.keywords.length > 4 && (
                        <span className={styles.moreKeywords}>
                          +{resource.keywords.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.footerText}>
            © {new Date().getFullYear()} Library Resource Search. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
    </>
  );
};

export default Search;
