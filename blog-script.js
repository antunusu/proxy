/**
 * PREMIUM IP - Blog Page JavaScript
 * 
 * This file handles the blog page functionality including loading blog posts
 * from the admin panel and managing the blog interface.
 */

// =====================================================
// BLOG DATA AND STATE
// =====================================================

let blogData = [];
let displayedPosts = 6; // Number of posts to show initially
const postsPerLoad = 6; // Number of posts to load each time

// =====================================================
// DOM ELEMENTS
// =====================================================

const blogPostsGrid = document.getElementById('blog-posts-grid');
const loadMoreBtn = document.getElementById('load-more-btn');
const adminAccess = document.getElementById('admin-access');

// =====================================================
// BLOG FUNCTIONS
// =====================================================

/**
 * Load blog data from admin panel or use defaults
 */
function loadBlogData() {
    const adminBlogData = localStorage.getItem('adminBlogData');
    
    if (adminBlogData) {
        try {
            const parsedData = JSON.parse(adminBlogData);
            if (parsedData && parsedData.length > 0) {
                blogData = parsedData.filter(post => post.published);
                console.log('🔄 Loaded blog data from admin panel');
                return;
            }
        } catch (error) {
            console.warn('⚠️ Failed to parse admin blog data:', error);
        }
    }
    
    // Default blog data if no admin data available
    blogData = [
        {
            id: 1,
            title: 'Understanding Proxy Anonymity Levels',
            category: 'Security',
            excerpt: 'Learn the differences between Elite, Anonymous, and Transparent proxies and how they protect your privacy online.',
            content: 'Complete guide to proxy anonymity levels...',
            readTime: 5,
            date: '2025-01-15',
            published: true
        },
        {
            id: 2,
            title: 'HTTP vs HTTPS vs SOCKS Proxies Explained',
            category: 'Technology',
            excerpt: 'A comprehensive guide to different proxy protocols and when to use each type for optimal performance and security.',
            content: 'Detailed comparison of proxy protocols...',
            readTime: 7,
            date: '2025-01-12',
            published: true
        },
        {
            id: 3,
            title: 'Optimizing Proxy Speed for Better Performance',
            category: 'Performance',
            excerpt: 'Tips and techniques to maximize your proxy connection speed and reduce latency for seamless browsing experience.',
            content: 'Performance optimization techniques...',
            readTime: 6,
            date: '2025-01-10',
            published: true
        },
        {
            id: 4,
            title: 'Best Practices for Online Privacy Protection',
            category: 'Security',
            excerpt: 'Essential strategies and tools to maintain your privacy while browsing the internet safely and securely.',
            content: 'Privacy protection best practices...',
            readTime: 8,
            date: '2025-01-08',
            published: true
        },
        {
            id: 5,
            title: 'Proxy Server Locations: Why Geography Matters',
            category: 'Technology',
            excerpt: 'Understanding how proxy server locations affect your browsing experience, speed, and access to geo-restricted content.',
            content: 'Geographic considerations for proxies...',
            readTime: 4,
            date: '2025-01-05',
            published: true
        },
        {
            id: 6,
            title: 'Common Proxy Errors and How to Fix Them',
            category: 'Technology',
            excerpt: 'Troubleshooting guide for the most common proxy connection issues and their solutions.',
            content: 'Proxy troubleshooting guide...',
            readTime: 6,
            date: '2025-01-03',
            published: true
        }
    ];
    
    console.log('📝 Using default blog data');
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

/**
 * Get blog category color class
 */
function getCategoryClass(category) {
    const categoryClasses = {
        'Security': 'category-security',
        'Technology': 'category-technology', 
        'Performance': 'category-performance',
        'News': 'category-news'
    };
    return categoryClasses[category] || 'category-default';
}

/**
 * Get blog icon based on category
 */
function getBlogIcon(category) {
    const icons = {
        'Security': 'shield-alt',
        'Technology': 'cogs',
        'Performance': 'tachometer-alt',
        'News': 'newspaper'
    };
    return icons[category] || 'blog';
}

/**
 * Render blog posts
 */
function renderBlogPosts() {
    const postsToShow = blogData.slice(0, displayedPosts);
    
    blogPostsGrid.innerHTML = postsToShow.map(post => `
        <article class="blog-post-card">
            <div class="blog-post-image">
                <i class="fas fa-${getBlogIcon(post.category)}"></i>
            </div>
            <div class="blog-post-content">
                <span class="blog-post-category ${getCategoryClass(post.category)}">${post.category}</span>
                <h3 class="blog-post-title">${post.title}</h3>
                <p class="blog-post-excerpt">${post.excerpt}</p>
                <div class="blog-post-meta">
                    <span><i class="fas fa-calendar"></i> ${formatDate(post.date)}</span>
                    <span><i class="fas fa-clock"></i> ${post.readTime} min read</span>
                </div>
                <a href="#" class="blog-post-link">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        </article>
    `).join('');
    
    // Show/hide load more button
    if (displayedPosts >= blogData.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-flex';
    }
}

/**
 * Load more blog posts
 */
function loadMorePosts() {
    displayedPosts += postsPerLoad;
    renderBlogPosts();
}

/**
 * Handle newsletter form submission
 */
function handleNewsletterSubmit(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Simulate newsletter signup
    alert(`Thank you for subscribing with email: ${email}. You'll receive our latest proxy insights!`);
    event.target.reset();
}

/**
 * Handle admin panel access
 */
function handleAdminAccess() {
    window.open('admin.html', '_blank');
}

// =====================================================
// EVENT LISTENERS
// =====================================================

/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
    // Load more posts
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMorePosts);
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Admin panel access
    if (adminAccess) {
        adminAccess.addEventListener('click', (e) => {
            e.preventDefault();
            handleAdminAccess();
        });
    }
    
    // Dropdown functionality
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownMenu.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.remove('active');
            }
        });
    }
}

// =====================================================
// INITIALIZATION
// =====================================================

/**
 * Initialize the blog page
 */
function initializeBlogPage() {
    console.log('🚀 Initializing PREMIUM IP Blog Page...');
    
    // Load blog data
    loadBlogData();
    console.log(`📝 Loaded ${blogData.length} blog posts`);
    
    // Render initial posts
    renderBlogPosts();
    
    // Set up event listeners
    initializeEventListeners();
    
    console.log('✅ Blog page initialized successfully');
}

// =====================================================
// APP STARTUP
// =====================================================

// Initialize the blog page when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeBlogPage);

// =====================================================
// PERIODIC DATA REFRESH
// =====================================================

// Check for updated blog data every 30 seconds
setInterval(() => {
    const currentDataString = JSON.stringify(blogData);
    loadBlogData();
    const newDataString = JSON.stringify(blogData);
    
    if (currentDataString !== newDataString) {
        console.log('🔄 Blog data updated, refreshing display...');
        renderBlogPosts();
    }
}, 30000);