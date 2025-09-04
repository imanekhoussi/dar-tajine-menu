/* ===== DAR TAJINE DIGITAL MENU SCRIPT ===== */

// DOM Elements
const categoryButtons = document.querySelectorAll('.category-btn');
const categorySections = document.querySelectorAll('.category-section');
const menuItems = document.querySelectorAll('.menu-item');

// Menu Configuration
const menuConfig = {
    restaurantName: 'Dar Tajine',
    analytics: {
        enabled: true,
        categoryViews: {},
        itemViews: {},
        sessionStart: new Date().toISOString()
    },
    features: {
        animations: true,
        smoothScrolling: true,
        analytics: true
    }
};

/* ===== CATEGORY NAVIGATION ===== */
function initCategoryNavigation() {
    categoryButtons.forEach(button => {
        button.addEventListener('click', handleCategoryClick);
    });
}

function handleCategoryClick(event) {
    const clickedButton = event.currentTarget;
    const targetCategory = clickedButton.getAttribute('data-category');
    
    // Remove active state from all buttons and sections
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    categorySections.forEach(section => section.classList.remove('active'));
    
    // Add active state to clicked button
    clickedButton.classList.add('active');
    
    // Show target section with animation delay
    const targetSection = document.getElementById(targetCategory);
    if (targetSection) {
        setTimeout(() => {
            targetSection.classList.add('active');
        }, 150);
    }
    
    // Smooth scroll to menu content
    if (menuConfig.features.smoothScrolling) {
        document.querySelector('.menu-content').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    // Track category view
    trackCategoryView(targetCategory);
    
    // Add visual feedback
    addButtonFeedback(clickedButton);
}

function addButtonFeedback(button) {
    button.style.transform = 'translateY(-6px)';
    setTimeout(() => {
        button.style.transform = '';
    }, 200);
}

/* ===== MENU ITEM INTERACTIONS ===== */
function initMenuItemInteractions() {
    menuItems.forEach((item, index) => {
        // Click interaction
        item.addEventListener('click', () => handleMenuItemClick(item));
        
        // Touch feedback for mobile
        item.addEventListener('touchstart', () => handleTouchStart(item));
        item.addEventListener('touchend', () => handleTouchEnd(item));
        
        // Staggered entrance animation
        if (menuConfig.features.animations) {
            item.style.animationDelay = `${index * 0.1}s`;
        }
    });
}

function handleMenuItemClick(item) {
    // Scale animation feedback
    item.style.transform = 'scale(0.98)';
    setTimeout(() => {
        item.style.transform = '';
    }, 200);
    
    // Track item view
    const itemName = item.querySelector('.item-name').textContent;
    trackItemView(itemName);
    
    // Optional: Show item details modal (for future enhancement)
    // showItemDetails(item);
}

function handleTouchStart(item) {
    item.classList.add('touching');
}

function handleTouchEnd(item) {
    setTimeout(() => {
        item.classList.remove('touching');
    }, 150);
}

/* ===== ANALYTICS TRACKING ===== */
function trackCategoryView(categoryName) {
    if (!menuConfig.analytics.enabled) return;
    
    // Increment category view count
    if (!menuConfig.analytics.categoryViews[categoryName]) {
        menuConfig.analytics.categoryViews[categoryName] = 0;
    }
    menuConfig.analytics.categoryViews[categoryName]++;
    
    // Console log for demo (replace with real analytics in production)
    console.log(`📊 Catégorie consultée: ${categoryName}`);
    console.log('📈 Statistiques catégories:', menuConfig.analytics.categoryViews);
}

function trackItemView(itemName) {
    if (!menuConfig.analytics.enabled) return;
    
    // Increment item view count
    if (!menuConfig.analytics.itemViews[itemName]) {
        menuConfig.analytics.itemViews[itemName] = 0;
    }
    menuConfig.analytics.itemViews[itemName]++;
    
    // Console log for demo
    console.log(`🍽️ Plat consulté: ${itemName}`);
    
    // Update popular items
    updatePopularItems();
}

function updatePopularItems() {
    const sortedItems = Object.entries(menuConfig.analytics.itemViews)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5);
    
    console.log('🔥 Top 5 plats populaires:', sortedItems);
}

/* ===== PAGE LOADING & INITIALIZATION ===== */
function initPageLoading() {
    // Smooth page load animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
        
        // Initialize all components after load
        initializeApp();
    });
}

function initializeApp() {
    console.log('🏺 Dar Tajine - Menu Digital chargé avec succès!');
    console.log('📱 Version: 1.0.0');
    console.log('🎯 Prêt pour présentation aux restaurateurs');
    
    // Start session tracking
    trackSessionStart();
    
    // Show loading complete message
    setTimeout(showFeatureHighlights, 3000);
}

function trackSessionStart() {
    menuConfig.analytics.sessionStart = new Date().toISOString();
    console.log('⏰ Session démarrée:', menuConfig.analytics.sessionStart);
}

function showFeatureHighlights() {
    console.log('✨ Fonctionnalités disponibles:');
    console.log('  📊 Analytics en temps réel');
    console.log('  📱 Design responsive optimisé');
    console.log('  🎨 Animations fluides');
    console.log('  🔄 Mise à jour facile du contenu');
    console.log('  🌐 Compatible tous navigateurs');
    console.log('  📍 Géolocalisation restaurant');
    console.log('  💳 Prêt pour intégration paiement');
}

/* ===== UTILITY FUNCTIONS ===== */
function formatPrice(price) {
    return `${price} DHS`;
}

function validateImageLoad() {
    const images = document.querySelectorAll('.item-image[style*="background-image"]');
    images.forEach(img => {
        const bgImage = img.style.backgroundImage;
        const imageUrl = bgImage.slice(5, -2); // Remove url(" and ")
        
        // Create temporary image to test loading
        const testImg = new Image();
        testImg.onload = () => {
            img.classList.add('image-loaded');
        };
        testImg.onerror = () => {
            img.classList.add('image-error');
            console.warn(`⚠️ Image non trouvée: ${imageUrl}`);
        };
        testImg.src = imageUrl;
    });
}

/* ===== RESPONSIVE HELPERS ===== */
function handleResponsiveFeatures() {
    // Add touch class for mobile devices
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
    
    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            // Recalculate layouts if needed
            console.log('📱 Orientation changée');
        }, 500);
    });
    
    // Handle viewport changes
    window.addEventListener('resize', debounce(() => {
        console.log('📐 Viewport redimensionné');
    }, 250));
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/* ===== ERROR HANDLING ===== */
function handleErrors() {
    window.addEventListener('error', (event) => {
        console.error('❌ Erreur détectée:', event.error);
    });
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
        console.error('❌ Promise rejetée:', event.reason);
    });
}

/* ===== ACCESSIBILITY FEATURES ===== */
function initAccessibility() {
    // Keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Screen reader announcements
    categoryButtons.forEach(button => {
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-selected', button.classList.contains('active'));
    });
}

/* ===== PERFORMANCE OPTIMIZATION ===== */
function optimizePerformance() {
    // Lazy load images (if needed for larger menus)
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Preload background images
                const bgImage = img.style.backgroundImage;
                if (bgImage) {
                    const imageUrl = bgImage.slice(5, -2);
                    const preloadImg = new Image();
                    preloadImg.src = imageUrl;
                }
                imageObserver.unobserve(img);
            }
        });
    }, observerOptions);
    
    // Observe all menu item images
    document.querySelectorAll('.item-image').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ===== DEMO SPECIFIC FEATURES ===== */
function initDemoFeatures() {
    // Demo banner (remove for production)
    console.log('🎭 Mode Démo - Fonctionnalités de présentation activées');
    
    // Simulate real-time updates (demo only)
    setTimeout(() => {
        console.log('💡 Simulation: Prix mis à jour automatiquement');
        console.log('💡 Simulation: Nouveau plat ajouté au menu');
    }, 10000);
    
    // Show analytics dashboard simulation
    setTimeout(showAnalyticsDashboard, 15000);
}

function showAnalyticsDashboard() {
    console.log('📊 TABLEAU DE BORD ANALYTICS (Simulation):');
    console.log('┌─────────────────────────────────────┐');
    console.log('│  Vues menu aujourd\'hui: 47          │');
    console.log('│  Catégorie populaire: Tagines       │');
    console.log('│  Plat star: Couscous Royal          │');
    console.log('│  Heure de pointe: 12h-14h           │');
    console.log('└─────────────────────────────────────┘');
}

/* ===== INITIALIZATION ===== */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core functionality
    initCategoryNavigation();
    initMenuItemInteractions();
    initPageLoading();
    
    // Initialize additional features
    handleResponsiveFeatures();
    handleErrors();
    initAccessibility();
    optimizePerformance();
    
    // Demo features (remove for production)
    initDemoFeatures();
    
    // Validate images
    setTimeout(validateImageLoad, 1000);
});

/* ===== EXPORT FOR TESTING (if needed) ===== */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        menuConfig,
        trackCategoryView,
        trackItemView,
        formatPrice
    };
}