/**
 * PREMIUM IP - Admin Panel JavaScript
 * 
 * This file contains all the JavaScript functionality for the admin panel.
 * Includes authentication, proxy management, blog management, and data persistence.
 */

// =====================================================
// ADMIN CREDENTIALS AND CONFIGURATION
// =====================================================
const ADMIN_CREDENTIALS = {
    username: 'antunusu',
    password: 'AntorNusrat@@13'
};

// Admin authentication state
let isAuthenticated = false;
let currentEditingProxy = null;
let currentEditingBlog = null;

// Load data from localStorage or use defaults
let ADMIN_PROXY_DATA = JSON.parse(localStorage.getItem('adminProxyData')) || [
    {
        id: 1,
        ip: '192.168.1.100',
        port: '8080',
        country: 'United States',
        countryCode: 'US',
        protocol: 'HTTP',
        speed: 'Fast',
        uptime: 99.5,
        anonymity: 'Elite'
    },
    {
        id: 2,
        ip: '203.142.71.33',
        port: '3128',
        country: 'Singapore',
        countryCode: 'SG',
        protocol: 'HTTPS',
        speed: 'Fast',
        uptime: 98.2,
        anonymity: 'Anonymous'
    },
    {
        id: 3,
        ip: '185.199.108.154',
        port: '1080',
        country: 'Germany',
        countryCode: 'DE',
        protocol: 'SOCKS5',
        speed: 'Medium',
        uptime: 97.8,
        anonymity: 'Elite'
    }
];

let ADMIN_BLOG_DATA = JSON.parse(localStorage.getItem('adminBlogData')) || [
    {
        id: 1,
        title: 'Understanding Proxy Anonymity Levels',
        category: 'Security',
        excerpt: 'Learn the differences between Elite, Anonymous, and Transparent proxies and how they protect your privacy online.',
        content: 'Full article content here...',
        readTime: 5,
        date: '2025-01-15',
        published: true
    },
    {
        id: 2,
        title: 'HTTP vs HTTPS vs SOCKS Proxies Explained',
        category: 'Technology',
        excerpt: 'A comprehensive guide to different proxy protocols and when to use each type for optimal performance and security.',
        content: 'Full article content here...',
        readTime: 7,
        date: '2025-01-12',
        published: true
    },
    {
        id: 3,
        title: 'Optimizing Proxy Speed for Better Performance',
        category: 'Performance',
        excerpt: 'Tips and techniques to maximize your proxy connection speed and reduce latency for seamless browsing experience.',
        content: 'Full article content here...',
        readTime: 6,
        date: '2025-01-10',
        published: true
    }
];

// =====================================================
// DOM ELEMENTS
// =====================================================
const loginModal = document.getElementById('login-modal');
const adminDashboard = document.getElementById('admin-dashboard');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const logoutBtn = document.getElementById('logout-btn');

// Navigation elements
const navItems = document.querySelectorAll('.nav-item');
const tabContents = document.querySelectorAll('.tab-content');

// Proxy management elements
const adminProxyTbody = document.getElementById('admin-proxy-tbody');
const addProxyBtn = document.getElementById('add-proxy-btn');
const proxyModal = document.getElementById('proxy-modal');
const proxyForm = document.getElementById('proxy-form');
const closeProxyModal = document.getElementById('close-proxy-modal');
const cancelProxy = document.getElementById('cancel-proxy');

// Blog management elements
const addBlogBtn = document.getElementById('add-blog-btn');
const blogModal = document.getElementById('blog-modal');
const blogForm = document.getElementById('blog-form');
const closeBlogModal = document.getElementById('close-blog-modal');
const cancelBlog = document.getElementById('cancel-blog');

// Statistics elements
const totalProxiesStat = document.getElementById('total-proxies-stat');
const countriesStat = document.getElementById('countries-stat');
const fastProxiesStat = document.getElementById('fast-proxies-stat');

// =====================================================
// AUTHENTICATION FUNCTIONS
// =====================================================

/**
 * Handle login form submission
 */
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        isAuthenticated = true;
        loginModal.classList.remove('active');
        adminDashboard.style.display = 'grid';
        loginError.style.display = 'none';
        
        // Initialize dashboard
        initializeDashboard();
        console.log('✅ Admin authenticated successfully');
    } else {
        loginError.style.display = 'block';
        console.log('❌ Authentication failed');
    }
}

/**
 * Handle logout
 */
function handleLogout() {
    isAuthenticated = false;
    adminDashboard.style.display = 'none';
    loginModal.classList.add('active');
    
    // Reset form
    loginForm.reset();
    loginError.style.display = 'none';
    
    console.log('👋 Admin logged out');
}

// =====================================================
// DASHBOARD INITIALIZATION
// =====================================================

/**
 * Initialize the admin dashboard
 */
function initializeDashboard() {
    renderProxyTable();
    renderBlogList();
    updateStatistics();
    
    console.log('🚀 Admin dashboard initialized');
}

/**
 * Update statistics
 */
function updateStatistics() {
    const totalProxies = ADMIN_PROXY_DATA.length;
    const uniqueCountries = [...new Set(ADMIN_PROXY_DATA.map(proxy => proxy.country))].length;
    const fastProxies = ADMIN_PROXY_DATA.filter(proxy => proxy.speed === 'Fast').length;
    
    totalProxiesStat.textContent = totalProxies;
    countriesStat.textContent = uniqueCountries;
    fastProxiesStat.textContent = fastProxies;
}

// =====================================================
// PROXY MANAGEMENT FUNCTIONS
// =====================================================

/**
 * Render the proxy table
 */
function renderProxyTable() {
    adminProxyTbody.innerHTML = ADMIN_PROXY_DATA.map(proxy => `
        <tr>
            <td><code>${proxy.ip}</code></td>
            <td><code>${proxy.port}</code></td>
            <td>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span>${getCountryFlag(proxy.countryCode)}</span>
                    ${proxy.country}
                </div>
            </td>
            <td><span class="protocol-badge protocol-${proxy.protocol.toLowerCase()}">${proxy.protocol}</span></td>
            <td>
                <div class="speed-indicator speed-${proxy.speed.toLowerCase()}">
                    <div class="ping-dot"></div>
                    ${proxy.speed}
                </div>
            </td>
            <td>
                <div style="display: flex; align-items: center;">
                    <div class="uptime-bar">
                        <div class="uptime-fill ${getUptimeClass(proxy.uptime)}" style="width: ${proxy.uptime}%"></div>
                    </div>
                    <span style="font-size: 12px; margin-left: 8px;">${proxy.uptime}%</span>
                </div>
            </td>
            <td>${proxy.anonymity}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit" onclick="editProxy(${proxy.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" onclick="deleteProxy(${proxy.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    updateStatistics();
}

/**
 * Get country flag emoji
 */
function getCountryFlag(countryCode) {
    const flags = {
        'US': '🇺🇸', 'SG': '🇸🇬', 'DE': '🇩🇪', 'CA': '🇨🇦', 'GB': '🇬🇧',
        'FR': '🇫🇷', 'NL': '🇳🇱', 'SE': '🇸🇪', 'AU': '🇦🇺', 'JP': '🇯🇵',
        'BR': '🇧🇷', 'IN': '🇮🇳', 'KR': '🇰🇷', 'IT': '🇮🇹', 'ES': '🇪🇸'
    };
    return flags[countryCode] || '🌐';
}

/**
 * Get uptime class for styling
 */
function getUptimeClass(uptime) {
    if (uptime >= 98) return 'uptime-high';
    if (uptime >= 95) return 'uptime-medium';
    return 'uptime-low';
}

/**
 * Add new proxy
 */
function addProxy() {
    currentEditingProxy = null;
    document.getElementById('proxy-modal-title').textContent = 'Add New Proxy';
    proxyForm.reset();
    proxyModal.classList.add('active');
}

/**
 * Edit existing proxy
 */
function editProxy(proxyId) {
    const proxy = ADMIN_PROXY_DATA.find(p => p.id === proxyId);
    if (!proxy) return;
    
    currentEditingProxy = proxy;
    document.getElementById('proxy-modal-title').textContent = 'Edit Proxy';
    
    // Fill form with proxy data
    document.getElementById('proxy-ip').value = proxy.ip;
    document.getElementById('proxy-port').value = proxy.port;
    document.getElementById('proxy-country').value = proxy.country;
    document.getElementById('proxy-country-code').value = proxy.countryCode;
    document.getElementById('proxy-protocol').value = proxy.protocol;
    document.getElementById('proxy-speed').value = proxy.speed;
    document.getElementById('proxy-uptime').value = proxy.uptime;
    document.getElementById('proxy-anonymity').value = proxy.anonymity;
    
    proxyModal.classList.add('active');
}

/**
 * Delete proxy
 */
function deleteProxy(proxyId) {
    if (confirm('Are you sure you want to delete this proxy?')) {
        ADMIN_PROXY_DATA = ADMIN_PROXY_DATA.filter(proxy => proxy.id !== proxyId);
        saveProxyData();
        renderProxyTable();
        console.log(`🗑️ Proxy ${proxyId} deleted`);
    }
}

/**
 * Handle proxy form submission
 */
function handleProxySubmit(event) {
    event.preventDefault();
    
    const formData = {
        ip: document.getElementById('proxy-ip').value,
        port: document.getElementById('proxy-port').value,
        country: document.getElementById('proxy-country').value,
        countryCode: document.getElementById('proxy-country-code').value.toUpperCase(),
        protocol: document.getElementById('proxy-protocol').value,
        speed: document.getElementById('proxy-speed').value,
        uptime: parseFloat(document.getElementById('proxy-uptime').value),
        anonymity: document.getElementById('proxy-anonymity').value
    };
    
    if (currentEditingProxy) {
        // Update existing proxy
        Object.assign(currentEditingProxy, formData);
        console.log(`✏️ Proxy ${currentEditingProxy.id} updated`);
    } else {
        // Add new proxy
        const newProxy = {
            id: Math.max(...ADMIN_PROXY_DATA.map(p => p.id), 0) + 1,
            ...formData
        };
        ADMIN_PROXY_DATA.push(newProxy);
        console.log(`➕ New proxy added: ${newProxy.id}`);
    }
    
    saveProxyData();
    renderProxyTable();
    closeProxyModalFunc();
    
    // Update main website data
    updateMainWebsiteData();
}

/**
 * Close proxy modal
 */
function closeProxyModalFunc() {
    proxyModal.classList.remove('active');
    currentEditingProxy = null;
    proxyForm.reset();
}

// =====================================================
// BLOG MANAGEMENT FUNCTIONS
// =====================================================

/**
 * Render blog list
 */
function renderBlogList() {
    const blogList = document.querySelector('.blog-list');
    blogList.innerHTML = ADMIN_BLOG_DATA.map(blog => `
        <div class="blog-item">
            <div class="blog-info">
                <h3>${blog.title}</h3>
                <p>${blog.category} • ${formatDate(blog.date)} • ${blog.readTime} min read</p>
            </div>
            <div class="blog-actions">
                <button class="btn btn-small btn-outline" onclick="editBlog(${blog.id})">Edit</button>
                <button class="btn btn-small btn-danger" onclick="deleteBlog(${blog.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

/**
 * Add new blog
 */
function addBlog() {
    currentEditingBlog = null;
    document.getElementById('blog-modal-title').textContent = 'Add New Blog Post';
    blogForm.reset();
    blogModal.classList.add('active');
}

/**
 * Edit existing blog
 */
function editBlog(blogId) {
    const blog = ADMIN_BLOG_DATA.find(b => b.id === blogId);
    if (!blog) return;
    
    currentEditingBlog = blog;
    document.getElementById('blog-modal-title').textContent = 'Edit Blog Post';
    
    // Fill form with blog data
    document.getElementById('blog-title').value = blog.title;
    document.getElementById('blog-category').value = blog.category;
    document.getElementById('blog-read-time').value = blog.readTime;
    document.getElementById('blog-excerpt').value = blog.excerpt;
    document.getElementById('blog-content').value = blog.content;
    
    blogModal.classList.add('active');
}

/**
 * Delete blog
 */
function deleteBlog(blogId) {
    if (confirm('Are you sure you want to delete this blog post?')) {
        ADMIN_BLOG_DATA = ADMIN_BLOG_DATA.filter(blog => blog.id !== blogId);
        saveBlogData();
        renderBlogList();
        console.log(`🗑️ Blog ${blogId} deleted`);
        
        // Update main website data
        updateMainWebsiteData();
    }
}

/**
 * Handle blog form submission
 */
function handleBlogSubmit(event) {
    event.preventDefault();
    
    const formData = {
        title: document.getElementById('blog-title').value,
        category: document.getElementById('blog-category').value,
        excerpt: document.getElementById('blog-excerpt').value,
        content: document.getElementById('blog-content').value,
        readTime: parseInt(document.getElementById('blog-read-time').value),
        date: new Date().toISOString().split('T')[0],
        published: true
    };
    
    if (currentEditingBlog) {
        // Update existing blog
        Object.assign(currentEditingBlog, formData);
        console.log(`✏️ Blog ${currentEditingBlog.id} updated`);
    } else {
        // Add new blog
        const newBlog = {
            id: Math.max(...ADMIN_BLOG_DATA.map(b => b.id), 0) + 1,
            ...formData
        };
        ADMIN_BLOG_DATA.push(newBlog);
        console.log(`📝 New blog added: ${newBlog.id}`);
    }
    
    saveBlogData();
    renderBlogList();
    closeBlogModalFunc();
    
    // Update main website data
    updateMainWebsiteData();
}

/**
 * Close blog modal
 */
function closeBlogModalFunc() {
    blogModal.classList.remove('active');
    currentEditingBlog = null;
    blogForm.reset();
}

// =====================================================
// DATA PERSISTENCE FUNCTIONS
// =====================================================

/**
 * Save proxy data to localStorage
 */
function saveProxyData() {
    localStorage.setItem('adminProxyData', JSON.stringify(ADMIN_PROXY_DATA));
    console.log('💾 Proxy data saved to localStorage');
}

/**
 * Save blog data to localStorage
 */
function saveBlogData() {
    localStorage.setItem('adminBlogData', JSON.stringify(ADMIN_BLOG_DATA));
    console.log('💾 Blog data saved to localStorage');
}

/**
 * Update main website data
 */
function updateMainWebsiteData() {
    // Update the main website's proxy data
    const mainProxyData = ADMIN_PROXY_DATA.map(proxy => ({
        ip: proxy.ip,
        port: proxy.port,
        country: proxy.country,
        countryCode: proxy.countryCode,
        protocol: proxy.protocol,
        speed: proxy.speed,
        uptime: proxy.uptime,
        anonymity: proxy.anonymity
    }));
    
    localStorage.setItem('mainWebsiteProxyData', JSON.stringify(mainProxyData));
    localStorage.setItem('mainWebsiteBlogData', JSON.stringify(ADMIN_BLOG_DATA));
    
    console.log('🔄 Main website data updated');
}

// =====================================================
// NAVIGATION AND TAB FUNCTIONS
// =====================================================

/**
 * Handle navigation between tabs
 */
function handleNavigation(event) {
    const targetTab = event.currentTarget.dataset.tab;
    
    // Update active nav item
    navItems.forEach(item => item.classList.remove('active'));
    event.currentTarget.classList.add('active');
    
    // Update active tab content
    tabContents.forEach(tab => tab.classList.remove('active'));
    document.getElementById(`${targetTab}-tab`).classList.add('active');
}

// =====================================================
// EVENT LISTENERS
// =====================================================

/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
    // Authentication
    loginForm.addEventListener('submit', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);
    
    // Navigation
    navItems.forEach(item => {
        item.addEventListener('click', handleNavigation);
    });
    
    // Proxy management
    addProxyBtn.addEventListener('click', addProxy);
    proxyForm.addEventListener('submit', handleProxySubmit);
    closeProxyModal.addEventListener('click', closeProxyModalFunc);
    cancelProxy.addEventListener('click', closeProxyModalFunc);
    
    // Blog management
    addBlogBtn.addEventListener('click', addBlog);
    blogForm.addEventListener('submit', handleBlogSubmit);
    closeBlogModal.addEventListener('click', closeBlogModalFunc);
    cancelBlog.addEventListener('click', closeBlogModalFunc);
    
    // Close modals on outside click
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('active');
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
}

// =====================================================
// INITIALIZATION
// =====================================================

/**
 * Initialize the admin application
 */
function initializeAdminApp() {
    console.log('🚀 Initializing PREMIUM IP Admin Panel...');
    console.log(`📊 Loaded ${ADMIN_PROXY_DATA.length} proxies and ${ADMIN_BLOG_DATA.length} blogs`);
    
    initializeEventListeners();
    
    // Update main website data on first load
    updateMainWebsiteData();
    
    console.log('✅ Admin application initialized successfully');
}

// =====================================================
// APP STARTUP
// =====================================================

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeAdminApp);

// =====================================================
// GLOBAL FUNCTIONS FOR ONCLICK HANDLERS
// =====================================================

// Make functions available globally for onclick handlers
window.editProxy = editProxy;
window.deleteProxy = deleteProxy;
window.editBlog = editBlog;
window.deleteBlog = deleteBlog;

// =====================================================
// CONSOLE HELPERS
// =====================================================

// Make admin functions available in console for debugging
window.adminPanel = {
    proxies: ADMIN_PROXY_DATA,
    blogs: ADMIN_BLOG_DATA,
    saveProxyData,
    saveBlogData,
    renderProxyTable,
    renderBlogList,
    updateStatistics
};

console.log('💡 Tip: Use window.adminPanel to access admin functions from console');