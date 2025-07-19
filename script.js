/**
 * PREMIUM IP - Proxy List Application
 * 
 * This file contains all the JavaScript functionality for the proxy list website.
 * The proxy data is hardcoded below for easy editing and modification.
 */

// =====================================================
// PROXY DATA CONFIGURATION
// =====================================================
// Edit this array to add, remove, or modify proxy entries
const PROXY_DATA = [
    {
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
        ip: '185.199.108.154',
        port: '1080',
        country: 'Germany',
        countryCode: 'DE',
        protocol: 'SOCKS5',
        speed: 'Medium',
        uptime: 97.8,
        anonymity: 'Elite'
    },
    {
        ip: '104.21.48.84',
        port: '8888',
        country: 'Canada',
        countryCode: 'CA',
        protocol: 'HTTP',
        speed: 'Fast',
        uptime: 99.1,
        anonymity: 'Transparent'
    },
    {
        ip: '172.67.254.163',
        port: '80',
        country: 'United Kingdom',
        countryCode: 'GB',
        protocol: 'HTTPS',
        speed: 'Medium',
        uptime: 96.7,
        anonymity: 'Anonymous'
    },
    {
        ip: '51.158.108.135',
        port: '1080',
        country: 'France',
        countryCode: 'FR',
        protocol: 'SOCKS4',
        speed: 'Slow',
        uptime: 95.3,
        anonymity: 'Elite'
    },
    {
        ip: '167.172.109.12',
        port: '3128',
        country: 'Netherlands',
        countryCode: 'NL',
        protocol: 'HTTP',
        speed: 'Fast',
        uptime: 98.9,
        anonymity: 'Anonymous'
    },
    {
        ip: '46.101.89.171',
        port: '8080',
        country: 'Sweden',
        countryCode: 'SE',
        protocol: 'HTTPS',
        speed: 'Medium',
        uptime: 97.2,
        anonymity: 'Transparent'
    },
    {
        ip: '138.197.148.215',
        port: '1080',
        country: 'Australia',
        countryCode: 'AU',
        protocol: 'SOCKS5',
        speed: 'Fast',
        uptime: 99.3,
        anonymity: 'Elite'
    },
    {
        ip: '159.89.49.60',
        port: '8888',
        country: 'Japan',
        countryCode: 'JP',
        protocol: 'HTTP',
        speed: 'Medium',
        uptime: 96.8,
        anonymity: 'Anonymous'
    },
    {
        ip: '68.183.245.137',
        port: '3128',
        country: 'Brazil',
        countryCode: 'BR',
        protocol: 'HTTPS',
        speed: 'Slow',
        uptime: 94.5,
        anonymity: 'Transparent'
    },
    {
        ip: '178.62.193.19',
        port: '1080',
        country: 'India',
        countryCode: 'IN',
        protocol: 'SOCKS4',
        speed: 'Medium',
        uptime: 97.6,
        anonymity: 'Elite'
    },
    {
        ip: '157.230.89.101',
        port: '8080',
        country: 'South Korea',
        countryCode: 'KR',
        protocol: 'HTTP',
        speed: 'Fast',
        uptime: 98.7,
        anonymity: 'Anonymous'
    },
    {
        ip: '134.209.29.120',
        port: '80',
        country: 'Italy',
        countryCode: 'IT',
        protocol: 'HTTPS',
        speed: 'Medium',
        uptime: 96.1,
        anonymity: 'Transparent'
    },
    {
        ip: '165.22.81.30',
        port: '1080',
        country: 'Spain',
        countryCode: 'ES',
        protocol: 'SOCKS5',
        speed: 'Fast',
        uptime: 99.0,
        anonymity: 'Elite'
    }
];

// =====================================================
// APPLICATION STATE
// =====================================================
let filteredData = [...PROXY_DATA];
let currentFilters = {
    anonymity: ['Elite', 'Anonymous', 'Transparent'],
    protocol: ['HTTP', 'HTTPS', 'SOCKS4', 'SOCKS5'],
    speed: ['Fast', 'Medium', 'Slow']
};

// =====================================================
// DOM ELEMENTS
// =====================================================
const proxyTableBody = document.getElementById('proxy-tbody');
const totalProxiesEl = document.getElementById('total-proxies');
const filteredProxiesEl = document.getElementById('filtered-proxies');
const emptyStateEl = document.getElementById('empty-state');
const clearFiltersBtn = document.querySelector('.clear-filters');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const sidebar = document.querySelector('.sidebar');

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

/**
 * Get country flag emoji based on country code
 * @param {string} countryCode - Two letter country code
 * @returns {string} Flag emoji
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
 * Create speed indicator HTML with animation
 * @param {string} speed - Speed level (Fast, Medium, Slow)
 * @returns {string} HTML string for speed indicator
 */
function createSpeedIndicator(speed) {
    const speedClass = `speed-${speed.toLowerCase()}`;
    return `
        <div class="speed-indicator ${speedClass}">
            <div class="ping-dot"></div>
            ${speed}
        </div>
    `;
}

/**
 * Create protocol badge HTML
 * @param {string} protocol - Protocol type
 * @returns {string} HTML string for protocol badge
 */
function createProtocolBadge(protocol) {
    const protocolClass = `protocol-${protocol.toLowerCase()}`;
    return `<span class="protocol-badge ${protocolClass}">${protocol}</span>`;
}

/**
 * Create uptime bar HTML
 * @param {number} uptime - Uptime percentage
 * @returns {string} HTML string for uptime bar
 */
function createUptimeBar(uptime) {
    let uptimeClass = 'uptime-low';
    if (uptime >= 98) uptimeClass = 'uptime-high';
    else if (uptime >= 95) uptimeClass = 'uptime-medium';
    
    return `
        <div class="uptime-bar">
            <div class="uptime-fill ${uptimeClass}" style="width: ${uptime}%"></div>
        </div>
        <span style="font-size: 12px; margin-left: 8px;">${uptime}%</span>
    `;
}

// =====================================================
// FILTERING FUNCTIONALITY
// =====================================================

/**
 * Filter proxy data based on current filter selections
 * @returns {Array} Filtered proxy data
 */
function filterProxyData() {
    return PROXY_DATA.filter(proxy => {
        return currentFilters.anonymity.includes(proxy.anonymity) &&
               currentFilters.protocol.includes(proxy.protocol) &&
               currentFilters.speed.includes(proxy.speed);
    });
}

/**
 * Handle filter change events
 * @param {Event} event - Checkbox change event
 */
function handleFilterChange(event) {
    const filterType = event.target.dataset.filter;
    const filterValue = event.target.value;
    const isChecked = event.target.checked;
    
    if (isChecked) {
        if (!currentFilters[filterType].includes(filterValue)) {
            currentFilters[filterType].push(filterValue);
        }
    } else {
        currentFilters[filterType] = currentFilters[filterType].filter(
            value => value !== filterValue
        );
    }
    
    updateTable();
}

/**
 * Clear all filters and reset to default state
 */
function clearAllFilters() {
    // Reset filter state
    currentFilters = {
        anonymity: ['Elite', 'Anonymous', 'Transparent'],
        protocol: ['HTTP', 'HTTPS', 'SOCKS4', 'SOCKS5'],
        speed: ['Fast', 'Medium', 'Slow']
    };
    
    // Update all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = true;
    });
    
    updateTable();
}

// =====================================================
// TABLE RENDERING
// =====================================================

/**
 * Render proxy table with current filtered data
 */
function renderTable() {
    filteredData = filterProxyData();
    
    if (filteredData.length === 0) {
        proxyTableBody.innerHTML = '';
        emptyStateEl.style.display = 'block';
        document.querySelector('.table-container').style.display = 'none';
    } else {
        emptyStateEl.style.display = 'none';
        document.querySelector('.table-container').style.display = 'block';
        
        proxyTableBody.innerHTML = filteredData.map(proxy => `
            <tr>
                <td><code>${proxy.ip}</code></td>
                <td><code>${proxy.port}</code></td>
                <td>
                    <div class="country-info">
                        <span class="country-flag">${getCountryFlag(proxy.countryCode)}</span>
                        ${proxy.country}
                    </div>
                </td>
                <td>${createProtocolBadge(proxy.protocol)}</td>
                <td>${createSpeedIndicator(proxy.speed)}</td>
                <td>
                    <div style="display: flex; align-items: center;">
                        ${createUptimeBar(proxy.uptime)}
                    </div>
                </td>
                <td>${proxy.anonymity}</td>
            </tr>
        `).join('');
    }
}

/**
 * Update statistics and table
 */
function updateTable() {
    renderTable();
    updateStatistics();
}

/**
 * Update statistics display
 */
function updateStatistics() {
    totalProxiesEl.textContent = PROXY_DATA.length;
    filteredProxiesEl.textContent = filteredData.length;
}

// =====================================================
// MOBILE FUNCTIONALITY
// =====================================================

/**
 * Toggle mobile sidebar visibility
 */
function toggleMobileSidebar() {
    sidebar.classList.toggle('mobile-hidden');
}

// =====================================================
// ADMIN PANEL ACCESS
// =====================================================

/**
 * Handle admin panel access
 */
function handleAdminAccess() {
    window.open('admin.html', '_blank');
}

// =====================================================
// DATA SYNCHRONIZATION WITH ADMIN PANEL
// =====================================================

/**
 * Load data from admin panel if available
 */
function loadAdminData() {
    const adminProxyData = localStorage.getItem('mainWebsiteProxyData');
    if (adminProxyData) {
        try {
            const parsedData = JSON.parse(adminProxyData);
            if (parsedData && parsedData.length > 0) {
                // Update PROXY_DATA with admin data
                Object.assign(PROXY_DATA, parsedData);
                console.log('🔄 Loaded proxy data from admin panel');
            }
        } catch (error) {
            console.warn('⚠️ Failed to parse admin proxy data:', error);
        }
    }
    
    const adminBlogData = localStorage.getItem('mainWebsiteBlogData');
    if (adminBlogData) {
        try {
            const parsedBlogData = JSON.parse(adminBlogData);
            if (parsedBlogData && parsedBlogData.length > 0) {
                // Update blog section with admin data
                updateBlogSection(parsedBlogData);
                console.log('🔄 Loaded blog data from admin panel');
            }
        } catch (error) {
            console.warn('⚠️ Failed to parse admin blog data:', error);
        }
    }
}

/**
 * Update blog section with admin data
 */
function updateBlogSection(blogData) {
    const blogGrid = document.querySelector('.blog-grid');
    if (blogGrid && blogData.length > 0) {
        blogGrid.innerHTML = blogData.slice(0, 3).map(blog => `
            <article class="blog-card">
                <div class="blog-image">
                    <i class="fas fa-${getBlogIcon(blog.category)}"></i>
                </div>
                <div class="blog-content">
                    <span class="blog-category">${blog.category}</span>
                    <h3>${blog.title}</h3>
                    <p>${blog.excerpt}</p>
                    <div class="blog-meta">
                        <span><i class="fas fa-calendar"></i> ${formatBlogDate(blog.date)}</span>
                        <span><i class="fas fa-clock"></i> ${blog.readTime} min read</span>
                    </div>
                </div>
            </article>
        `).join('');
    }
}

/**
 * Get blog icon based on category
 */
function getBlogIcon(category) {
    const icons = {
        'Security': 'shield-alt',
        'Technology': 'globe',
        'Performance': 'tachometer-alt',
        'News': 'newspaper'
    };
    return icons[category] || 'blog';
}

/**
 * Format blog date for display
 */
function formatBlogDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// =====================================================
// EVENT LISTENERS
// =====================================================

/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
    // Filter checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', handleFilterChange);
    });
    
    // Clear filters button
    clearFiltersBtn.addEventListener('click', clearAllFilters);
    
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileSidebar);
    }
    
    // Admin panel access
    const adminAccess = document.getElementById('admin-access');
    if (adminAccess) {
        adminAccess.addEventListener('click', (e) => {
            e.preventDefault();
            handleAdminAccess();
        });
    }
    
    // Close mobile sidebar when clicking outside
    document.addEventListener('click', (event) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(event.target) && 
            !mobileMenuToggle.contains(event.target)) {
            sidebar.classList.add('mobile-hidden');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('mobile-hidden');
        }
    });
}

// =====================================================
// INITIALIZATION
// =====================================================

/**
 * Initialize the application
 */
function initializeApp() {
    console.log('🚀 Initializing PREMIUM IP Application...');
    console.log(`📊 Loaded ${PROXY_DATA.length} proxy entries`);
    
    // Load admin data first
    loadAdminData();
    
    // Initial render
    updateTable();
    
    // Set up event listeners
    initializeEventListeners();
    
    console.log('✅ Application initialized successfully');
}

// =====================================================
// APP STARTUP
// =====================================================

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// =====================================================
// ADDITIONAL FEATURES FOR FUTURE ENHANCEMENT
// =====================================================

/**
 * Export filtered data as JSON (for future use)
 * @returns {string} JSON string of filtered data
 */
function exportFilteredData() {
    return JSON.stringify(filteredData, null, 2);
}

/**
 * Search functionality (for future implementation)
 * @param {string} searchTerm - Search term to filter by
 * @returns {Array} Filtered results
 */
function searchProxies(searchTerm) {
    if (!searchTerm) return filteredData;
    
    const term = searchTerm.toLowerCase();
    return filteredData.filter(proxy => 
        proxy.ip.includes(term) ||
        proxy.country.toLowerCase().includes(term) ||
        proxy.protocol.toLowerCase().includes(term)
    );
}

/**
 * Sort functionality (for future implementation)
 * @param {string} column - Column to sort by
 * @param {string} direction - Sort direction ('asc' or 'desc')
 */
function sortProxies(column, direction = 'asc') {
    const sortedData = [...filteredData].sort((a, b) => {
        let aVal = a[column];
        let bVal = b[column];
        
        // Handle numeric values
        if (column === 'uptime' || column === 'port') {
            aVal = parseFloat(aVal);
            bVal = parseFloat(bVal);
        }
        
        if (direction === 'asc') {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });
    
    filteredData = sortedData;
    renderTable();
}

// =====================================================
// CONSOLE HELPERS FOR EASY DATA EDITING
// =====================================================

// Make these functions available in console for easy debugging/editing
window.premiumIP = {
    data: PROXY_DATA,
    filtered: filteredData,
    filters: currentFilters,
    export: exportFilteredData,
    search: searchProxies,
    sort: sortProxies,
    refresh: updateTable
};

console.log('💡 Tip: Use window.premiumIP to access data and functions from console');
console.log('💡 Example: window.premiumIP.data to see all proxy data');
console.log('💡 Example: window.premiumIP.export() to export filtered data');
