const tg = window.Telegram.WebApp;
tg.expand();

if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    document.getElementById('username-display').innerText = `Hello, ${tg.initDataUnsafe.user.first_name}`;
}

let points = localStorage.getItem('user_points') ? parseInt(localStorage.getItem('user_points')) : 0;
document.getElementById('balance').innerText = points;

function switchPage(pageId) {
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
}

// এই ফাংশনের নাম index.html ফাইলের সাথে মিলানো হয়েছে
function handleTap() {
    points += 1;
    updateBalance();
    if(tg.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
}

function completeTask(url, reward, taskId) {
    if (localStorage.getItem(taskId)) {
        tg.showAlert("❌ You have already completed this task!");
        return;
    }
    window.open(url, '_blank');
    setTimeout(() => {
        points += reward;
        updateBalance();
        localStorage.setItem(taskId, 'true');
        document.getElementById(taskId + '-btn').innerText = "✅ Completed";
        document.getElementById(taskId + '-btn').style.background = "#10b981";
        tg.showAlert(`🎉 +${reward} Coins Added!`);
    }, 2000);
}

let userId = tg.initDataUnsafe?.user?.id || "12345";
let refLink = `https://t.me{userId}`;
document.getElementById('refer-link').value = refLink;

function copyReferLink() {
    let copyText = document.getElementById('refer-link');
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
    tg.showAlert("📋 Referral Link Copied!");
}

function processWithdraw() {
    let method = document.getElementById('method').value;
    let number = document.getElementById('wallet-number').value;
    let amount = parseInt(document.getElementById('withdraw-amount').value);

    if (!number || !amount) {
        tg.showAlert("❌ Please fill in all fields!");
        return;
    }
    if (amount < 50000) {
        tg.showAlert("❌ Minimum withdraw is 50,000 Coins!");
        return;
    }
    if (points < amount) {
        tg.showAlert("❌ You do not have enough coins!");
        return;
    }

    points -= amount;
    updateBalance();
    tg.showAlert(`✅ Withdrawal Request Submitted!\nMethod: ${method}\nNumber: ${number}\nAmount: ${amount} Coins.`);
}

function updateBalance() {
    document.getElementById('balance').innerText = points;
    localStorage.setItem('user_points', points);
        }
