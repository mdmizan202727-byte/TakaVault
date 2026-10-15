const tg = window.Telegram.WebApp;
tg.expand();

// টেলিগ্রাম ইউজারনেম শো করা
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    document.getElementById('username-display').innerText = `Hello, ${tg.initDataUnsafe.user.first_name}`;
}

// ডাটা লোড করা
let points = localStorage.getItem('user_points') ? parseInt(localStorage.getItem('user_points')) : 0;
document.getElementById('balance').innerText = points;

// ১. পেজ পরিবর্তন করার ফাংশন
function switchPage(pageId) {
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
}

// ২. ট্যাপ ইনকাম
function earnPoints() {
    points += 1;
    updateBalance();
    if(tg.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
}

// ৩. চ্যানেল সাবস্ক্রাইব টাস্ক কমপ্লিট করা
function completeTask(url, reward, taskId) {
    if (localStorage.getItem(taskId)) {
        tg.showAlert("❌ You have already completed this task!");
        return;
    }
    
    // ইউজারকে চ্যানেলে পাঠানো
    window.open(url, '_blank');
    
    // টেলিগ্রাম মিনি অ্যাপে ২ সেকেন্ড পর পয়েন্ট অ্যাড হবে
    setTimeout(() => {
        points += reward;
        updateBalance();
        localStorage.setItem(taskId, 'true');
        document.getElementById(taskId + '-btn').innerText = "✅ Completed";
        document.getElementById(taskId + '-btn').style.background = "#10b981";
        tg.showAlert(`🎉 +${reward} Coins Added for joining channel!`);
    }, 2000);
}

// ৪. রেফারেল লিংক তৈরি ও কপি
let botUsername = @TakaVaultbot; // আপনার বোটের ইউজারনেম এখানে দিন (যেমন: MyEarn_bot)
let userId = tg.initDataUnsafe?.user?.id || "12345";
let refLink = `https://t.me{botUsername}?start=${userId}`;
document.getElementById('refer-link').value = refLink;

function copyReferLink() {
    let copyText = document.getElementById('refer-link');
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
    tg.showAlert("📋 Referral Link Copied!");
}

// ৫. টাকা তোলার (Withdraw) রিকোয়েস্ট প্রসেস
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

    // ব্যালেন্স কাটা এবং কনফার্মেশন
    points -= amount;
    updateBalance();
    tg.showAlert(`✅ Withdrawal Request Submitted!\nMethod: ${method}\nNumber: ${number}\nAmount: ${amount} Coins.\nAdmin will pay you soon.`);
}

function updateBalance() {
    document.getElementById('balance').innerText = points;
    localStorage.setItem('user_points', points);
}
