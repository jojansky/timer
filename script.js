document.addEventListener('DOMContentLoaded', function() {
    const timeInput = document.getElementById('time-input');
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const resetBtn = document.getElementById('reset-btn');
    const timerDisplay = document.getElementById('timer-display');
    const alarm = document.getElementById('alarm');

    let timerInterval;
    let timeRemaining = 0;

    const beepBase64 = ''; // Replace with actual base64 string when available

    function playBeep() {
        if (beepBase64) {
            alarm.src = `data:audio/wav;base64,${beepBase64}`;
            alarm.play();
        }
    }

    function stopBeep() {
        alarm.pause();
        alarm.currentTime = 0;
    }

    function startTimer(duration) {
        let start = Date.now();
        let totalSeconds = Math.floor(duration / 1000);

        timerInterval = setInterval(function() {
            let delta = Date.now() - start;
            let secondsElapsed = Math.floor(delta / 1000);

            let secondsRemaining = totalSeconds - secondsElapsed;

            if (secondsRemaining <= 0) {
                clearInterval(timerInterval);
                timerDisplay.textContent = '00:00';
                playBeep();
                resetControls();
            } else {
                let minutes = Math.floor(secondsRemaining / 60);
                let seconds = secondsRemaining % 60;

                let displayMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
                let displaySeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

                timerDisplay.textContent = `${displayMinutes}:${displaySeconds}`;
            }
        }, 1000);
    }

    function resetControls() {
        startBtn.style.display = 'inline-block';
        stopBtn.style.display = 'none';
        resetBtn.style.display = 'inline-block';
        timeInput.disabled = false;
    }

    startBtn.addEventListener('click', function() {
        let timeStr = timeInput.value.trim();
        let [hours, minutes] = timeStr.split(':').map(part => parseInt(part, 10));

        if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
            alert('Please enter a valid time in hh:mm format.');
            return;
        }

        timeRemaining = (hours * 3600 + minutes * 60) * 1000;
        startTimer(timeRemaining);

        startBtn.style.display = 'none';
        stopBtn.style.display = 'inline-block';
        resetBtn.style.display = 'none';
        timeInput.disabled = true;
    });

    stopBtn.addEventListener('click', function() {
        clearInterval(timerInterval);
        stopBeep();
        resetControls();
    });

    resetBtn.addEventListener('click', function() {
        clearInterval(timerInterval);
        timerDisplay.textContent = '00:00';
        stopBeep();
        resetControls();
    });
});
