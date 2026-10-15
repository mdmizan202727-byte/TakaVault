<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Earn Money Mini App</title>
    <link rel="stylesheet" href="style.css">
    <!-- Telegram SDK -->
    <script src="https://telegram.org"></script>
</head>
<body>
    <div class="app-container">
        <div class="header">
            <h2>🪙 Tap & Earn Bot</h2>
            <div class="balance-box">
                <span id="balance">0</span> <small>Points</small>
            </div>
        </div>

        <!-- মূল ইনকাম বাটন -->
        <div class="coin-section">
            <button id="tap-btn" onclick="earnPoints()">🪙</button>
        </div>

        <!-- সোশ্যাল টাস্ক সেকশন -->
        <div class="tasks-section">
            <a href="https://t.me" target="_blank" class="task-btn">📢 Join Telegram Channel (+500)</a>
        </div>

        <div class="footer">
            <button class="nav-btn" onclick="claimDaily()">🎁 Daily Bonus</button>
            <button class="nav-btn" onclick="withdraw()">💰 Withdraw</button>
        </div>
    </div>
    <script src="app.js"></script>
</body>
</html>
