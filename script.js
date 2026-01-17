// 游戏状态
let gameState = {
    grid: Array(36).fill(null), // 6×6网格
    slot: [], // 槽位中的症状（最大10个）
    selectedSymptoms: [], // 已选中的症状（含位置信息）
    score: 0, // 消除的条文数
    matchedArticles: [], // 已匹配的条文
    gameOver: false // 游戏结束状态
};

// DOM元素
let gameGrid, slotArea, scoreElement;
let prescriptionModal, articleContent, selectedSymptomsDisplay;
let prescriptionInput, submitBtn, cancelBtn, hintBtn;
let newGameBtn, historyBtn, helpBtn;
let historyModal, historyList;
let gameOverModal, finalScoreElement;

// 游戏初始化
function initGame() {
    // 获取DOM元素
    gameGrid = document.getElementById('game-grid');
    slotArea = document.getElementById('slot-area');
    scoreElement = document.getElementById('score');
    prescriptionModal = document.getElementById('prescription-modal');
    articleContent = document.getElementById('article-content');
    selectedSymptomsDisplay = document.getElementById('selected-symptoms');
    prescriptionInput = document.getElementById('prescription');
    submitBtn = document.getElementById('submit-btn');
    cancelBtn = document.getElementById('cancel-btn');
    hintBtn = document.getElementById('hint-btn');
    newGameBtn = document.getElementById('new-game-btn');
    historyBtn = document.getElementById('history-btn');
    helpBtn = document.getElementById('help-btn');
    historyModal = document.getElementById('history-modal');
    historyList = document.getElementById('history-list');
    gameOverModal = document.getElementById('game-over-modal');
    finalScoreElement = document.getElementById('final-score');

    // 绑定事件
    newGameBtn.addEventListener('click', startNewGame);
    hintBtnMain = document.getElementById('hint-btn-main');
    hintBtnMain.addEventListener('click', showHint);
    historyBtn.addEventListener('click', showHistory);
    wrongAnswersBtn = document.getElementById('wrong-answers-btn');
    wrongAnswersBtn.addEventListener('click', showWrongAnswers);
    helpBtn.addEventListener('click', showHelp);
    submitBtn.addEventListener('click', validatePrescription);
    cancelBtn.addEventListener('click', closePrescriptionModal);
    hintBtn.addEventListener('click', showHint);
    
    // 绑定筛选控件事件
    categorySelect = document.getElementById('category-select');
    levelSelect = document.getElementById('level-select');
    applyFilterBtn = document.getElementById('apply-filter-btn');
    applyFilterBtn.addEventListener('click', applyFilters);
    
    // 绑定分享按钮事件
    shareBtn = document.getElementById('share-btn');
    shareBtn.addEventListener('click', showShareOptions);

    // 关闭弹窗
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // 点击外部关闭弹窗
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });

    // 开始新游戏
    startNewGame();
}

// 开始新游戏
function startNewGame() {
    // 重置游戏状态
    gameState = {
        grid: Array(36).fill(null),
        slot: [],
        selectedSymptoms: [],
        score: 0,
        matchedArticles: [],
        eliminations: 0,
        gameOver: false,
        hintsUsed: 0,
        maxHints: 3,
        filters: {
            category: 'all',
            level: 'all'
        },
        filteredArticles: shanghanArticles,
        wrongAnswers: JSON.parse(localStorage.getItem('shanghan_wrong_answers') || '[]')
    };

    // 填充网格
    fillGrid();

    // 更新UI
    updateGrid();
    updateSlot();
    updateScore();
    updateHintButton();

    // 隐藏弹窗
    prescriptionModal.style.display = 'none';
    historyModal.style.display = 'none';
    document.getElementById('help-modal').style.display = 'none';
    gameOverModal.style.display = 'none';
}

// 填充网格
function fillGrid() {
    // 随机选择足够的症状填充网格
    const availableSymptoms = [...allSymptoms];
    
    for (let i = 0; i < 36; i++) {
        if (availableSymptoms.length === 0) {
            // 如果症状不够，重新获取
            availableSymptoms.push(...allSymptoms);
        }
        
        const randomIndex = Math.floor(Math.random() * availableSymptoms.length);
        gameState.grid[i] = availableSymptoms[randomIndex];
        
        // 移除已选中的症状，避免过多重复
        if (Math.random() > 0.5) {
            availableSymptoms.splice(randomIndex, 1);
        }
    }
}

// 更新网格显示
function updateGrid() {
    gameGrid.innerHTML = '';
    
    for (let i = 0; i < 36; i++) {
        const cell = document.createElement('div');
        cell.className = 'symptom-cell';
        cell.dataset.index = i;
        
        if (gameState.grid[i]) {
            cell.textContent = gameState.grid[i];
            cell.addEventListener('click', () => selectSymptom(i));
        } else {
            cell.classList.add('empty');
        }
        
        gameGrid.appendChild(cell);
    }
}

// 更新槽位显示
function updateSlot() {
    slotArea.innerHTML = '';
    
    gameState.slot.forEach(symptom => {
        const slotItem = document.createElement('div');
        slotItem.className = 'slot-item';
        slotItem.textContent = symptom;
        slotArea.appendChild(slotItem);
    });
}

// 更新分数显示
function updateScore() {
    scoreElement.textContent = gameState.score;
}

// 更新提示按钮显示
function updateHintButton() {
    const remainingHints = gameState.maxHints - gameState.hintsUsed;
    hintBtnMain.textContent = `提示 (${remainingHints}/${gameState.maxHints})`;
    hintBtnMain.disabled = remainingHints <= 0;
    hintBtn.disabled = remainingHints <= 0;
}

// 选择症状
function selectSymptom(index) {
    if (gameState.gameOver) return;
    
    const symptom = gameState.grid[index];
    if (!symptom || gameState.slot.length >= 10) return;
    
    // 将症状添加到槽位
    gameState.slot.push(symptom);
    gameState.selectedSymptoms.push({ symptom, index });
    
    // 清空网格中的位置
    gameState.grid[index] = null;
    
    // 更新UI
    updateGrid();
    updateSlot();
    
    // 检测是否匹配条文
    checkForMatch();
    
    // 检查游戏是否结束
    checkGameOver();
}

// 检测是否匹配条文
function checkForMatch() {
    const result = matchArticle(gameState.slot, gameState.filteredArticles);
    if (result) {
        showPrescriptionModal(result.article, result.matchedSymptoms);
    }
}

// 显示方剂验证弹窗
function showPrescriptionModal(article, matchedSymptoms) {
    // 保存当前匹配的信息
    window.currentMatch = {
        article,
        matchedSymptoms
    };
    
    // 更新弹窗内容
    document.getElementById('modal-title').textContent = article.hasPrescription ? '验证方剂' : '条文匹配成功';
    // 移除条文显示，只显示已选症状
    articleContent.style.display = 'none';
    
    // 显示已选中的症状
    selectedSymptomsDisplay.innerHTML = '<h4>已匹配的症状:</h4>';
    matchedSymptoms.forEach(symptom => {
        const symptomItem = document.createElement('div');
        symptomItem.className = 'slot-item';
        symptomItem.textContent = symptom;
        selectedSymptomsDisplay.appendChild(symptomItem);
    });
    
    // 根据是否有方剂显示不同内容
    if (article.hasPrescription) {
        prescriptionInput.parentElement.style.display = 'flex';
        submitBtn.style.display = 'inline-block';
        hintBtn.style.display = 'inline-block';
        prescriptionInput.value = '';
    } else {
        prescriptionInput.parentElement.style.display = 'none';
        submitBtn.style.display = 'none';
        hintBtn.style.display = 'none';
        // 直接验证成功
        setTimeout(() => {
            validateSuccess(article, matchedSymptoms);
        }, 1000);
    }
    
    prescriptionModal.style.display = 'block';
}

// 验证方剂
function validatePrescription() {
    if (!window.currentMatch) return;
    
    const { article, matchedSymptoms } = window.currentMatch;
    const userInput = prescriptionInput.value.trim();
    
    if (userInput === article.prescription) {
        validateSuccess(article, matchedSymptoms);
    } else {
        // 记录错误答案
        const wrongAnswer = {
            id: Date.now(),
            type: 'wrong_prescription',
            article: article,
            userInput: userInput,
            correctAnswer: article.prescription,
            symptoms: matchedSymptoms,
            date: new Date().toLocaleString()
        };
        
        gameState.wrongAnswers.push(wrongAnswer);
        localStorage.setItem('shanghan_wrong_answers', JSON.stringify(gameState.wrongAnswers));
        
        // 显示错误信息和原文
        alert(`方剂名称错误！\n正确答案：${article.prescription}\n\n原文：${article.content}\n\n您的答案：${userInput}`);
        prescriptionInput.value = '';
    }
}

// 验证成功
function validateSuccess(article, matchedSymptoms) {
    // 添加到已匹配条文列表
    gameState.matchedArticles.push({
        article,
        date: new Date().toLocaleString()
    });
    
    // 增加分数和消除次数
    gameState.score++;
    gameState.eliminations++;
    updateScore();
    
    // 从槽位中移除匹配的症状
    gameState.slot = gameState.slot.filter(symptom => !matchedSymptoms.includes(symptom));
    
    // 从选中症状中移除匹配的症状
    gameState.selectedSymptoms = gameState.selectedSymptoms.filter(item => 
        !matchedSymptoms.includes(item.symptom)
    );
    
    // 补充网格中的症状
    refillGrid();
    
    // 更新UI
    updateGrid();
    updateSlot();
    
    // 显示成功信息和完整条文
    alert(`匹配成功！\n\n${article.content}\n\n${article.hasPrescription ? '方剂：' + article.prescription : ''}`);
    
    // 关闭弹窗
    closePrescriptionModal();
    
    // 检查游戏是否结束（获胜条件）
    checkGameEnd();
}

// 补充网格中的症状
function refillGrid() {
    const availableSymptoms = [...allSymptoms];
    
    for (let i = 0; i < 36; i++) {
        if (!gameState.grid[i]) {
            if (availableSymptoms.length === 0) {
                availableSymptoms.push(...allSymptoms);
            }
            
            const randomIndex = Math.floor(Math.random() * availableSymptoms.length);
            gameState.grid[i] = availableSymptoms[randomIndex];
            
            // 移除已选中的症状，避免过多重复
            if (Math.random() > 0.5) {
                availableSymptoms.splice(randomIndex, 1);
            }
        }
    }
}

// 关闭方剂验证弹窗
function closePrescriptionModal() {
    prescriptionModal.style.display = 'none';
    window.currentMatch = null;
}

// 显示提示
function showHint() {
    // 检查是否还有提示次数
    if (gameState.hintsUsed >= gameState.maxHints) {
        alert('您已经用完了所有提示次数！');
        return;
    }
    
    // 增加已使用提示次数
    gameState.hintsUsed++;
    updateHintButton();
    
    // 分析当前槽位中的症状，找到可能匹配的条文
    const currentSymptoms = gameState.slot;
    let hintSymptom = null;
    
    // 尝试找到当前槽位症状可能匹配的条文
    for (const article of shanghanArticles) {
        // 计算当前槽位与该条文的共同症状
        const commonSymptoms = currentSymptoms.filter(symptom => article.symptoms.includes(symptom));
        
        // 如果有共同症状，且该条文还有其他症状在网格中
        if (commonSymptoms.length > 0) {
            // 找到该条文在网格中的其他症状
            const availableSymptoms = article.symptoms.filter(symptom => 
                gameState.grid.includes(symptom) && !currentSymptoms.includes(symptom)
            );
            
            if (availableSymptoms.length > 0) {
                // 随机选择一个可用症状作为提示
                hintSymptom = availableSymptoms[Math.floor(Math.random() * availableSymptoms.length)];
                break;
            }
        }
    }
    
    // 如果没有找到相关症状，随机选择一个网格中的症状
    if (!hintSymptom) {
        const availableSymptoms = gameState.grid.filter(symptom => symptom !== null && !currentSymptoms.includes(symptom));
        if (availableSymptoms.length > 0) {
            hintSymptom = availableSymptoms[Math.floor(Math.random() * availableSymptoms.length)];
        }
    }
    
    // 高亮闪烁提示选中的症状
    if (hintSymptom) {
        const cells = document.querySelectorAll('.symptom-cell');
        cells.forEach(cell => {
            if (cell.textContent === hintSymptom) {
                // 添加高亮闪烁效果
                cell.classList.add('hint-flash');
                
                // 2秒后移除效果
                setTimeout(() => {
                    cell.classList.remove('hint-flash');
                }, 2000);
            }
        });
    } else {
        alert('当前没有可用的提示！');
    }
}

// 显示历史记录
function showHistory() {
    historyList.innerHTML = '';
    
    if (gameState.matchedArticles.length === 0) {
        historyList.innerHTML = '<p>暂无历史记录</p>';
    } else {
        gameState.matchedArticles.forEach((item, index) => {
            const articleItem = document.createElement('div');
            articleItem.className = 'article-item';
            articleItem.style.marginBottom = '20px';
            articleItem.style.padding = '10px';
            articleItem.style.borderLeft = '3px solid #5d4037';
            articleItem.style.backgroundColor = '#fff3e0';
            articleItem.style.borderRadius = '5px';
            
            articleItem.innerHTML = `
                <div style="font-weight: bold; margin-bottom: 5px;">第${index + 1}条：${item.article.content}</div>
                <div style="margin-bottom: 5px;">症状：${item.article.symptoms.join('、')}</div>
                <div>${item.article.hasPrescription ? '方剂：' + item.article.prescription : '无方剂'}</div>
                <div style="font-size: 12px; color: #666; margin-top: 5px;">匹配时间：${item.date}</div>
            `;
            
            historyList.appendChild(articleItem);
        });
    }
    
    historyModal.style.display = 'block';
}

// 显示帮助
function showHelp() {
    document.getElementById('help-modal').style.display = 'block';
}

// 显示错题本
function showWrongAnswers() {
    const wrongAnswersList = document.getElementById('wrong-answers-list');
    const wrongAnswersModal = document.getElementById('wrong-answers-modal');
    
    // 如果没有错题，显示提示信息
    if (gameState.wrongAnswers.length === 0) {
        wrongAnswersList.innerHTML = '<p>暂无错题记录</p>';
    } else {
        // 按时间倒序排列错题
        const sortedWrongAnswers = [...gameState.wrongAnswers].sort((a, b) => b.id - a.id);
        
        // 构建错题列表的HTML
        let wrongAnswersHTML = '<ul class="wrong-answers-list">';
        sortedWrongAnswers.forEach(wrongAnswer => {
            if (wrongAnswer.type === 'wrong_prescription') {
                // 方剂名称错误的错题
                wrongAnswersHTML += `
                    <li class="wrong-answer-item">
                        <div class="wrong-answer-header">
                            <strong>方剂名称错误</strong>
                            <span class="wrong-answer-date">${wrongAnswer.date}</span>
                        </div>
                        <div class="wrong-answer-content">
                            <p><strong>原文：</strong>${wrongAnswer.article.content}</p>
                            <p><strong>正确方剂：</strong>${wrongAnswer.correctAnswer}</p>
                            <p><strong>您的答案：</strong>${wrongAnswer.userInput}</p>
                            <p><strong>涉及症状：</strong>${wrongAnswer.symptoms.join(', ')}</p>
                        </div>
                    </li>
                `;
            } else if (wrongAnswer.type === 'game_over_full_slot') {
                // 槽满游戏失败的错题
                wrongAnswersHTML += `
                    <li class="wrong-answer-item">
                        <div class="wrong-answer-header">
                            <strong>槽满游戏失败</strong>
                            <span class="wrong-answer-date">${wrongAnswer.date}</span>
                        </div>
                        <div class="wrong-answer-content">
                            <p><strong>最终得分：</strong>${wrongAnswer.score}</p>
                            <p><strong>当前网格症状：</strong>${wrongAnswer.symptoms.join(', ')}</p>
                            <div class="related-articles">
                                <strong>相关条文：</strong>
                                <ul>
                                    ${wrongAnswer.relatedArticles.map(article => `
                                        <li>
                                            ${article.content}
                                            ${article.hasPrescription ? `方剂：${article.prescription}` : ''}
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                    </li>
                `;
            }
        });
        wrongAnswersHTML += '</ul>';
        
        wrongAnswersList.innerHTML = wrongAnswersHTML;
    }
    
    wrongAnswersModal.style.display = 'block';
}

// 清空错题本
function clearWrongAnswers() {
    if (confirm('确定要清空所有错题记录吗？')) {
        gameState.wrongAnswers = [];
        localStorage.removeItem('shanghan_wrong_answers');
        // 重新显示错题本
        showWrongAnswers();
    }
}

// 显示分享选项
function showShareOptions() {
    const shareModal = document.getElementById('share-modal');
    const shareLink = document.getElementById('share-link');
    
    // 设置分享链接为当前页面URL（实际部署时会自动替换）
    shareLink.value = window.location.href;
    
    shareModal.style.display = 'block';
    
    // 绑定系统分享按钮事件
    const systemShareBtn = document.getElementById('system-share-btn');
    systemShareBtn.addEventListener('click', triggerSystemShare);
}

// 复制分享链接
function copyShareLink() {
    const shareLink = document.getElementById('share-link');
    
    // 选择文本
    shareLink.select();
    shareLink.setSelectionRange(0, 99999); // 移动端兼容
    
    try {
        // 复制到剪贴板
        document.execCommand('copy');
        alert('链接已复制到剪贴板！');
    } catch (err) {
        console.error('复制失败:', err);
        alert('复制失败，请手动复制链接');
    }
}

// 触发系统分享
function triggerSystemShare() {
    const shareData = {
        title: '伤寒论消消乐 - 中医条文学习游戏',
        text: '通过游戏方式学习伤寒论条文，提升中医知识水平。选择不同篇章和难度等级进行练习，挑战自我！',
        url: window.location.href
    };
    
    if (navigator.share) {
        // 使用Web Share API（现代浏览器支持）
        navigator.share(shareData)
            .then(() => console.log('分享成功'))
            .catch((err) => console.error('分享失败:', err));
    } else {
        // Web Share API不支持时的回退方案
        alert('您的浏览器不支持系统分享功能，请使用其他分享方式');
    }
}

// 检查游戏是否结束
function checkGameOver() {
    // 游戏结束条件：槽位满10个且无法进行任何消除
    if (gameState.slot.length >= 10) {
        const result = matchArticle(gameState.slot, gameState.filteredArticles);
        if (!result) {
            gameState.gameOver = true;
            showGameOver();
        }
    }
}

// 显示游戏结束
function showGameOver(isWin) {
    // 根据游戏结果显示不同的标题和消息
    const modalTitle = document.querySelector('#game-over-modal .modal-header h3');
    const modalBody = document.querySelector('#game-over-modal .modal-body');
    
    if (isWin) {
        modalTitle.textContent = '恭喜获胜！';
        modalBody.innerHTML = `
            <p>您成功消除了5条条文，完成了游戏任务！</p>
            <p>最终得分：<span class="final-score">${gameState.score}</span></p>
        `;
    } else {
        modalTitle.textContent = '游戏结束';
        
        // 查找当前网格中所有相关的条文
        const currentSymptoms = gameState.grid.filter(symptom => symptom !== null);
        const relatedArticles = findRelatedArticles(currentSymptoms);
        
        // 记录游戏失败的错误信息
        const wrongAnswer = {
            id: Date.now(),
            type: 'game_over_full_slot',
            symptoms: currentSymptoms,
            relatedArticles: relatedArticles,
            score: gameState.score,
            date: new Date().toLocaleString()
        };
        
        gameState.wrongAnswers.push(wrongAnswer);
        localStorage.setItem('shanghan_wrong_answers', JSON.stringify(gameState.wrongAnswers));
        
        // 构建相关条文的HTML内容
        let relatedArticlesHTML = '';
        if (relatedArticles.length > 0) {
            relatedArticlesHTML = '<h4>当前网格涉及的条文：</h4><ul>';
            relatedArticles.forEach(article => {
                relatedArticlesHTML += `
                    <li>
                        <strong>${article.content}</strong>
                        ${article.hasPrescription ? `<br>方剂：${article.prescription}` : ''}
                    </li>
                `;
            });
            relatedArticlesHTML += '</ul>';
        } else {
            relatedArticlesHTML = '<p>未找到相关条文。</p>';
        }
        
        modalBody.innerHTML = `
            <p>槽位已满且无法进行消除，游戏结束！</p>
            <p>最终得分：<span class="final-score">${gameState.score}</span></p>
            <p>当前网格症状：${currentSymptoms.join(', ')}</p>
            ${relatedArticlesHTML}
        `;
    }
    
    gameOverModal.style.display = 'block';
}

// 应用筛选条件
function applyFilters() {
    // 获取当前筛选条件
    const selectedCategory = categorySelect.value;
    const selectedLevel = levelSelect.value;
    
    // 更新游戏状态中的筛选条件
    gameState.filters = {
        category: selectedCategory,
        level: selectedLevel
    };
    
    // 根据筛选条件过滤条文
    gameState.filteredArticles = shanghanArticles.filter(article => {
        // 按分类筛选
        if (selectedCategory !== 'all' && article.category !== selectedCategory) {
            return false;
        }
        
        // 按等级筛选
        if (selectedLevel !== 'all' && article.level !== parseInt(selectedLevel)) {
            return false;
        }
        
        return true;
    });
    
    // 重新开始游戏以应用新的筛选条件
    startNewGame();
}

// 根据症状查找所有相关条文
function findRelatedArticles(symptoms) {
    const relatedArticles = [];
    const symptomSet = new Set(symptoms);
    
    // 遍历所有条文，找出症状有重叠的条文
    for (const article of gameState.filteredArticles) {
        const articleSymptomSet = new Set(article.symptoms);
        const hasCommonSymptoms = [...articleSymptomSet].some(symptom => symptomSet.has(symptom));
        
        if (hasCommonSymptoms) {
            relatedArticles.push(article);
        }
    }
    
    return relatedArticles;
}

// 检查是否达到获胜条件
function checkGameEnd() {
    // 如果消除次数达到5次，则游戏获胜
    if (gameState.eliminations >= 5) {
        gameState.gameOver = true;
        showGameOver(true);
    }
}

// 重新开始游戏
function restartGame() {
    gameOverModal.style.display = 'none';
    startNewGame();
}

// 文档加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', initGame);

// 添加重新开始游戏按钮事件
document.getElementById('restart-btn').addEventListener('click', restartGame);