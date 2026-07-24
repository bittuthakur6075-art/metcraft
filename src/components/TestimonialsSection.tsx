import React, { useState, useMemo } from 'react';
import { Star, Search, ThumbsUp, X, PenSquare, CheckCircle, MessageSquare, ArrowRight } from 'lucide-react';
import './TestimonialsSection.css';

export interface ReviewItem {
  id: string;
  name: string;
  avatarBg: string;
  avatarColor: string;
  avatarDotColor: string;
  initial: string;
  date: string;
  rating: number; // 1 to 5
  comment: string;
  verified: boolean;
  product?: string;
  location?: string;
  helpfulCount: number;
}

export interface TestimonialsSectionProps {
  isHomePage?: boolean;
  onNavigateToReviews?: () => void;
}

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Rachel Patel',
    avatarBg: '#e0f2fe', // soft sky pastel
    avatarColor: '#0284c7',
    avatarDotColor: '#22d3ee',
    initial: 'R',
    date: 'October 5, 2023',
    rating: 5,
    comment: "Couldn't resist buying this watch after seeing it online, and I'm so glad I did. It's even more stunning in person, and the build quality is exceptional. Will definitely be purchasing from this brand again!",
    verified: true,
    product: 'Luxury Craft Watch',
    helpfulCount: 42,
  },
  {
    id: 'rev-2',
    name: 'Christopher Lee',
    avatarBg: '#f3e8ff', // soft purple pastel
    avatarColor: '#9333ea',
    avatarDotColor: '#c084fc',
    initial: 'C',
    date: 'June 25, 2023',
    rating: 5,
    comment: "Really impressed with the quality and style of this watch. It's exactly what I was looking for - versatile, durable, and looks great with any outfit. Docked half a star because the clasp is a bit tricky to open, but otherwise, it's perfect!",
    verified: true,
    product: 'Chronograph Executive',
    helpfulCount: 28,
  },
  {
    id: 'rev-3',
    name: 'Brian Chen',
    avatarBg: '#ffe4e6', // soft rose pastel
    avatarColor: '#e11d48',
    avatarDotColor: '#fb7185',
    initial: 'B',
    date: 'April 15, 2022',
    rating: 4,
    comment: "While this watch has its merits, such as its sleek design and comfortable wear, I found the strap to be somewhat flimsy, and the clasp occasionally difficult to secure. Despite these minor drawbacks, it does keep accurate time.",
    verified: true,
    product: 'Minimalist Steel Edition',
    helpfulCount: 19,
  },
  {
    id: 'rev-4',
    name: 'S LAL',
    avatarBg: '#cffafe',
    avatarColor: '#0891b2',
    avatarDotColor: '#22d3ee',
    initial: 'S',
    date: 'January 22, 2024',
    rating: 5,
    comment: 'One of the best promotional product manufacturers in India. Highly recommended for corporate bulk orders and premium metal finishing!',
    verified: true,
    product: 'Promotional Keychain Bulk Order',
    helpfulCount: 35,
  },
  {
    id: 'rev-5',
    name: 'Suresh Kumar Saini',
    avatarBg: '#ccfbf1',
    avatarColor: '#0d9488',
    avatarDotColor: '#2dd4bf',
    initial: 'S',
    date: 'February 14, 2024',
    rating: 5,
    comment: 'There were excellent discussions with the vendor. High quality metal finishes and very responsive customer support team.',
    verified: true,
    product: 'Custom Corporate Keychains',
    helpfulCount: 22,
  },
  {
    id: 'rev-6',
    name: 'Mandeep Singh',
    avatarBg: '#ffedd5',
    avatarColor: '#ea580c',
    avatarDotColor: '#fb923c',
    initial: 'M',
    date: 'October 11, 2025',
    rating: 5,
    comment: 'Good product quality, clean finishing and prompt response from vendor. The custom engraving came out sharp.',
    verified: true,
    product: 'Leather & Metal Keychain',
    helpfulCount: 14,
  }
];

export interface TestimonialsSectionProps {
  isHomePage?: boolean;
  onNavigateToReviews?: () => void;
  reviews?: ReviewItem[];
  onAddReview?: (newReview: ReviewItem) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  isHomePage,
  onNavigateToReviews,
  reviews: externalReviews,
  onAddReview: externalOnAddReview,
}) => {
  const [internalReviews, setInternalReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const reviews = externalReviews || internalReviews;
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal Form State
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newProduct, setNewProduct] = useState('');
  const [newComment, setNewComment] = useState('');

  // Ratings statistics breakdown
  const stats = useMemo(() => {
    const total = reviews.length;
    if (total === 0) return { avg: 4.5, count5: 0, count4: 0, count3: 0, count2: 0, count1: 0, p5: 90, p4: 60, p3: 40, p2: 30, p1: 0 };
    
    const count5 = reviews.filter((r: ReviewItem) => r.rating === 5).length;
    const count4 = reviews.filter((r: ReviewItem) => r.rating === 4).length;
    const count3 = reviews.filter((r: ReviewItem) => r.rating === 3).length;
    const count2 = reviews.filter((r: ReviewItem) => r.rating === 2).length;
    const count1 = reviews.filter((r: ReviewItem) => r.rating === 1).length;

    const totalStars = reviews.reduce((sum: number, r: ReviewItem) => sum + r.rating, 0);
    const avg = (totalStars / total).toFixed(1);

    return {
      avg,
      count5,
      count4,
      count3,
      count2,
      count1,
      p5: 90,
      p4: 60,
      p3: 40,
      p2: 30,
      p1: 0
    };
  }, [reviews]);

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter((rev: ReviewItem) => {
      const matchesRating = selectedRatingFilter === null || rev.rating === selectedRatingFilter;
      const matchesSearch = 
        rev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rev.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (rev.product && rev.product.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesRating && matchesSearch;
    });
  }, [reviews, selectedRatingFilter, searchQuery]);

  const toggleHelpful = (id: string) => {
    setLikedReviews(prev => {
      const isLiked = prev[id];
      const updated = { ...prev, [id]: !isLiked };
      
      if (externalOnAddReview) {
        // Updated in parent if needed
      } else {
        setInternalReviews(curr => 
          curr.map(r => {
            if (r.id === id) {
              return { ...r, helpfulCount: r.helpfulCount + (isLiked ? -1 : 1) };
            }
            return r;
          })
        );
      }
      
      return updated;
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const pastelOptions = [
      { bg: '#e0f2fe', color: '#0284c7', dot: '#22d3ee' },
      { bg: '#f3e8ff', color: '#9333ea', dot: '#c084fc' },
      { bg: '#ffe4e6', color: '#e11d48', dot: '#fb7185' },
      { bg: '#ccfbf1', color: '#0d9488', dot: '#2dd4bf' },
      { bg: '#ffedd5', color: '#ea580c', dot: '#fb923c' },
    ];
    const chosenPastel = pastelOptions[Math.floor(Math.random() * pastelOptions.length)];

    const createdReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: newName.trim(),
      avatarBg: chosenPastel.bg,
      avatarColor: chosenPastel.color,
      avatarDotColor: chosenPastel.dot,
      initial: newName.trim().charAt(0).toUpperCase(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      rating: newRating,
      comment: newComment.trim(),
      verified: true,
      product: newProduct.trim() || 'Custom Order',
      helpfulCount: 0,
    };

    if (externalOnAddReview) {
      externalOnAddReview(createdReview);
    } else {
      setInternalReviews([createdReview, ...internalReviews]);
    }

    setIsModalOpen(false);
    
    // Reset form
    setNewName('');
    setNewEmail('');
    setNewProduct('');
    setNewComment('');
    setNewRating(5);
  };

  if (isHomePage) {
    const homeReviews = reviews.slice(0, 4);
    return (
      <div className="tst-section-container" id="testimonials">
        {/* Header Block */}
        <div className="tst-header-block">
          <span className="tst-badge">
            <MessageSquare className="w-3.5 h-3.5" />
            TESTIMONIALS
          </span>
          <h2 className="tst-main-title">
            What Our Clients <span className="tst-accent">Say About Us</span>
          </h2>
          <p className="tst-sub-title">
            Discover why top companies and clients choose us for premium craft design, quality products, and unmatched customer satisfaction.
          </p>
        </div>

        {/* 4 Feedback Cards Grid on Homepage */}
        <div className="tst-home-grid">
          {homeReviews.map((item: ReviewItem) => (
            <div className="tst-feedback-card" key={item.id}>
              <div className="tst-card-top-row">
                <div className="tst-user-meta-left">
                  <div 
                    className="tst-avatar-circle" 
                    style={{ backgroundColor: item.avatarBg, color: item.avatarColor }}
                  >
                    <span className="tst-avatar-dot" style={{ color: item.avatarDotColor }}></span>
                    {item.initial}
                  </div>
                  <div className="tst-user-info-text">
                    <h4>{item.name}</h4>
                    <span className="tst-date">{item.date}</span>
                  </div>
                </div>

                <div className="tst-card-top-stars">
                  {[1, 2, 3, 4, 5].map((starIndex) => (
                    <Star
                      key={starIndex}
                      className={`w-4 h-4 ${
                        starIndex <= item.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'tst-star-empty'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="tst-comment-body">{item.comment}</p>

              <div className="tst-card-footer">
                <div className="tst-badge-group">
                  {item.verified && (
                    <span className="tst-verified-tag">
                      <CheckCircle className="w-3 h-3" /> Verified Buyer
                    </span>
                  )}
                  {item.product && (
                    <span className="tst-product-tag">{item.product}</span>
                  )}
                </div>

                <button 
                  className={`tst-helpful-btn ${likedReviews[item.id] ? 'liked' : ''}`}
                  onClick={() => toggleHelpful(item.id)}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Helpful ({item.helpfulCount})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Actions Row on Homepage */}
        <div className="tst-home-cta-row">
          <button 
            className="tst-write-review-btn-home"
            onClick={() => setIsModalOpen(true)}
          >
            <PenSquare className="w-4 h-4" />
            <span>Write A Review</span>
          </button>
          <button 
            className="tst-view-all-btn"
            onClick={onNavigateToReviews}
          >
            <span>View All Client Reviews & Detailed Ratings ({reviews.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="tst-section-container" id="testimonials">
      {/* Header Block */}
      <div className="tst-header-block">
        <span className="tst-badge">
          <MessageSquare className="w-3.5 h-3.5" />
          TESTIMONIALS
        </span>
        <h2 className="tst-main-title">
          What Our Clients <span className="tst-accent">Say About Us</span>
        </h2>
        <p className="tst-sub-title">
          Discover why top companies and clients choose us for premium craft design, quality products, and unmatched customer satisfaction.
        </p>
      </div>

      {/* 2-Column Grid matching user prompt design */}
      <div className="tst-grid-layout">
        
        {/* LEFT COLUMN: Average Rating Widget */}
        <div className="tst-left-col">
          <h3 className="tst-left-panel-title">Average Rating</h3>
          
          <div className="tst-rating-card">
            {/* Score Row */}
            <div className="tst-score-row">
              <div className="tst-score-big">{stats.avg}</div>
              <div className="tst-score-meta">
                <div className="tst-stars-display" aria-label={`Rating: ${stats.avg} out of 5 stars`}>
                  <Star className="fill-amber-400 text-amber-400 w-5 h-5" />
                  <Star className="fill-amber-400 text-amber-400 w-5 h-5" />
                  <Star className="fill-amber-400 text-amber-400 w-5 h-5" />
                  <Star className="fill-amber-400 text-amber-400 w-5 h-5" />
                  <Star className="fill-amber-400/50 text-amber-400 w-5 h-5" />
                </div>
                <span className="tst-reviews-count">50k Reviews</span>
              </div>
            </div>

            {/* Rating Breakdown Bars */}
            <div className="tst-breakdown-list">
              {/* Star 5 */}
              <div 
                className={`tst-bar-row ${selectedRatingFilter === 5 ? 'active-filter' : ''}`}
                onClick={() => setSelectedRatingFilter(selectedRatingFilter === 5 ? null : 5)}
                title="Filter 5 Star Reviews"
              >
                <span className="tst-star-label">5</span>
                <div className="tst-progress-track">
                  <div className="tst-progress-fill" style={{ width: `${stats.p5}%` }}></div>
                </div>
                <span className="tst-percent-label">{stats.p5}%</span>
              </div>

              {/* Star 4 */}
              <div 
                className={`tst-bar-row ${selectedRatingFilter === 4 ? 'active-filter' : ''}`}
                onClick={() => setSelectedRatingFilter(selectedRatingFilter === 4 ? null : 4)}
                title="Filter 4 Star Reviews"
              >
                <span className="tst-star-label">4</span>
                <div className="tst-progress-track">
                  <div className="tst-progress-fill" style={{ width: `${stats.p4}%` }}></div>
                </div>
                <span className="tst-percent-label">{stats.p4}%</span>
              </div>

              {/* Star 3 */}
              <div 
                className={`tst-bar-row ${selectedRatingFilter === 3 ? 'active-filter' : ''}`}
                onClick={() => setSelectedRatingFilter(selectedRatingFilter === 3 ? null : 3)}
                title="Filter 3 Star Reviews"
              >
                <span className="tst-star-label">3</span>
                <div className="tst-progress-track">
                  <div className="tst-progress-fill" style={{ width: `${stats.p3}%` }}></div>
                </div>
                <span className="tst-percent-label">{stats.p3}%</span>
              </div>

              {/* Star 2 */}
              <div 
                className={`tst-bar-row ${selectedRatingFilter === 2 ? 'active-filter' : ''}`}
                onClick={() => setSelectedRatingFilter(selectedRatingFilter === 2 ? null : 2)}
                title="Filter 2 Star Reviews"
              >
                <span className="tst-star-label">2</span>
                <div className="tst-progress-track">
                  <div className="tst-progress-fill" style={{ width: `${stats.p2}%` }}></div>
                </div>
                <span className="tst-percent-label">{stats.p2}%</span>
              </div>

              {/* Star 1 */}
              <div 
                className={`tst-bar-row ${selectedRatingFilter === 1 ? 'active-filter' : ''}`}
                onClick={() => setSelectedRatingFilter(selectedRatingFilter === 1 ? null : 1)}
                title="Filter 1 Star Reviews"
              >
                <span className="tst-star-label">1</span>
                <div className="tst-progress-track">
                  <div className="tst-progress-fill" style={{ width: `${stats.p1}%` }}></div>
                </div>
                <span className="tst-percent-label">{stats.p1}%</span>
              </div>
            </div>

            {/* Write your Review Callout Box */}
            <div className="tst-write-box">
              <h4 className="tst-write-title">Write your Review</h4>
              <p className="tst-write-desc">
                Share your feedback and help create a better shopping experience for everyone.
              </p>
              <button 
                className="tst-submit-btn" 
                onClick={() => setIsModalOpen(true)}
              >
                <PenSquare className="w-4 h-4" />
                Submit Reviews
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Customer Feedback List */}
        <div className="tst-right-col">
          <div className="tst-right-header-row">
            <h3 className="tst-right-panel-title">Customer Feedback</h3>
          </div>

          {/* Controls Bar (Filter Pills & Search) */}
          <div className="tst-controls-bar">
            {/* Search Input */}
            <div className="tst-search-input-wrap">
              <Search className="tst-search-icon w-4 h-4" />
              <input
                type="text"
                className="tst-search-input"
                placeholder="Search feedback by keyword or client name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Pills */}
            <div className="tst-filter-pills">
              <button
                className={`tst-filter-pill ${selectedRatingFilter === null ? 'active' : ''}`}
                onClick={() => setSelectedRatingFilter(null)}
              >
                All Reviews ({reviews.length})
              </button>
              <button
                className={`tst-filter-pill ${selectedRatingFilter === 5 ? 'active' : ''}`}
                onClick={() => setSelectedRatingFilter(selectedRatingFilter === 5 ? null : 5)}
              >
                5 Stars ★
              </button>
              <button
                className={`tst-filter-pill ${selectedRatingFilter === 4 ? 'active' : ''}`}
                onClick={() => setSelectedRatingFilter(selectedRatingFilter === 4 ? null : 4)}
              >
                4 Stars ★
              </button>
            </div>
          </div>

          {/* Reviews Cards Stack */}
          {filteredReviews.length === 0 ? (
            <div className="tst-empty-state">
              <p>No feedback found matching your current filter.</p>
              <button 
                className="tst-submit-btn" 
                style={{ marginTop: '12px', fontSize: '13px' }}
                onClick={() => { setSelectedRatingFilter(null); setSearchQuery(''); }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="tst-cards-stack">
              {filteredReviews.map((item: ReviewItem) => (
                <div className="tst-feedback-card" key={item.id}>
                  {/* Top Row: User Avatar/Name + Stars */}
                  <div className="tst-card-top-row">
                    <div className="tst-user-meta-left">
                      {/* Pastel circle avatar matching user mockup */}
                      <div 
                        className="tst-avatar-circle" 
                        style={{ backgroundColor: item.avatarBg, color: item.avatarColor }}
                      >
                        <span className="tst-avatar-dot" style={{ color: item.avatarDotColor }}></span>
                        {item.initial}
                      </div>

                      <div className="tst-user-info-text">
                        <h4>{item.name}</h4>
                        <span className="tst-date">{item.date}</span>
                      </div>
                    </div>

                    {/* Top Right Stars */}
                    <div className="tst-card-top-stars">
                      {[1, 2, 3, 4, 5].map((starIndex) => (
                        <Star
                          key={starIndex}
                          className={`w-4 h-4 ${
                            starIndex <= item.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'tst-star-empty'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Comment Body */}
                  <p className="tst-comment-body">
                    {item.comment}
                  </p>

                  {/* Card Footer: Verified tag, product tag & helpful button */}
                  <div className="tst-card-footer">
                    <div className="tst-badge-group">
                      {item.verified && (
                        <span className="tst-verified-tag">
                          <CheckCircle className="w-3 h-3" /> Verified Buyer
                        </span>
                      )}
                      {item.product && (
                        <span className="tst-product-tag">
                          {item.product}
                        </span>
                      )}
                    </div>

                    <button 
                      className={`tst-helpful-btn ${likedReviews[item.id] ? 'liked' : ''}`}
                      onClick={() => toggleHelpful(item.id)}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>Helpful ({item.helpfulCount})</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SUBMIT REVIEW MODAL */}
      {isModalOpen && (
        <div className="tst-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="tst-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="tst-modal-header">
              <h3>Write Your Client Review</h3>
              <button 
                className="tst-modal-close-btn" 
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit}>
              {/* Star Rating Picker */}
              <div className="tst-form-field">
                <label className="tst-form-label">Your Overall Rating</label>
                <div className="tst-star-picker">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      type="button"
                      key={starVal}
                      className={`tst-star-pick-btn ${
                        starVal <= (hoverRating || newRating) ? 'active' : ''
                      }`}
                      onMouseEnter={() => setHoverRating(starVal)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setNewRating(starVal)}
                    >
                      ★
                    </button>
                  ))}
                  <span className="text-xs font-semibold text-amber-500 ml-2">
                    {newRating} / 5 Stars
                  </span>
                </div>
              </div>

              {/* Name & Email inputs */}
              <div className="tst-form-field">
                <label className="tst-form-label">Your Name *</label>
                <input
                  type="text"
                  required
                  className="tst-form-input"
                  placeholder="e.g. Rachel Patel"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>

              <div className="tst-form-field">
                <label className="tst-form-label">Email Address (kept private)</label>
                <input
                  type="email"
                  className="tst-form-input"
                  placeholder="e.g. rachel@example.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>

              <div className="tst-form-field">
                <label className="tst-form-label">Product or Craft Purchased</label>
                <input
                  type="text"
                  className="tst-form-input"
                  placeholder="e.g. Executive Custom Metal Keychains"
                  value={newProduct}
                  onChange={(e) => setNewProduct(e.target.value)}
                />
              </div>

              <div className="tst-form-field">
                <label className="tst-form-label">Your Detailed Review *</label>
                <textarea
                  required
                  rows={4}
                  className="tst-form-textarea"
                  placeholder="Share your experience regarding quality, design, shipping, and durability..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </div>

              <button type="submit" className="tst-modal-submit-btn">
                Post Review Now
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
