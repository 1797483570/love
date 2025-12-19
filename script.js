// 爱心动画效果
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    
    // 随机位置
    heart.style.left = Math.random() * 100 + 'vw';
    
    // 随机大小
    const size = Math.random() * 15 + 10;
    heart.style.width = size + 'px';
    heart.style.height = size + 'px';
    
    // 随机颜色
    const colors = ['#ff1493', '#ff69b4', '#ff85c0', '#ffb6c1'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    heart.style.backgroundColor = color;
    heart.style.setProperty('--heart-color', color);
    
    // 添加到容器
    document.getElementById('heartsContainer').appendChild(heart);
    
    // 动画结束后移除元素
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// 定期生成爱心
setInterval(createHeart, 500);

// 页面加载完成后的效果
window.addEventListener('load', () => {
    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-in-out';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // 为图片添加点击放大效果
    const photos = document.querySelectorAll('.gallery-photo');
    photos.forEach(photo => {
        photo.addEventListener('click', () => {
            // 创建放大视图
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                cursor: pointer;
                animation: fadeIn 0.3s ease-out;
            `;
            
            const enlargedPhoto = document.createElement('img');
            enlargedPhoto.src = photo.src;
            enlargedPhoto.alt = photo.alt;
            enlargedPhoto.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(255, 105, 180, 0.5);
                animation: zoomIn 0.3s ease-out;
            `;
            
            // 添加动画样式
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes zoomIn {
                    from { transform: scale(0.8); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
            
            modal.appendChild(enlargedPhoto);
            document.body.appendChild(modal);
            
            // 点击关闭
            modal.addEventListener('click', () => {
                modal.remove();
                style.remove();
            });
        });
    });
    
    // 为告白信添加打字机效果，支持HTML标签和换行
    const letterContent = document.querySelector('.letter-content');
    if (letterContent) {
        // 保存原始HTML内容
        const originalHTML = letterContent.innerHTML;
        
        // 创建一个临时元素来解析HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = originalHTML;
        
        // 获取所有文本内容，保留HTML结构
        let textIndex = 0;
        const typingSpeed = 80;
        
        // 清空原始内容，准备逐字显示
        letterContent.innerHTML = '';
        
        // 创建当前段落元素
        let currentParagraph = document.createElement('p');
        letterContent.appendChild(currentParagraph);
        
        // 所有文本内容
        const fullText = tempDiv.textContent;
        
        function type() {
            if (textIndex < fullText.length) {
                const char = fullText.charAt(textIndex);
                
                // 如果是换行符，创建新段落
                if (char === '\n' || char === '\r') {
                    currentParagraph = document.createElement('p');
                    letterContent.appendChild(currentParagraph);
                } else {
                    // 逐字添加到当前段落
                    currentParagraph.textContent += char;
                }
                
                textIndex++;
                setTimeout(type, typingSpeed);
            }
        }
        
        // 延迟开始打字效果
        setTimeout(type, 1000);
    }
});

// 添加鼠标跟随效果
let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// 添加一些额外的装饰效果
function addSparkle() {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        left: ${mouseX}px;
        top: ${mouseY}px;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, #fff 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 999;
        animation: sparkle 1s ease-out forwards;
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// 定期添加跟随鼠标的闪光
setInterval(addSparkle, 200);

// 添加滚动动画效果
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.photo-item, .love-letter');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});