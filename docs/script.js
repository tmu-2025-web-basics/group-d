document.addEventListener('DOMContentLoaded', () => {
    const back1 = document.querySelector('.back1');
    const back2 = document.querySelector('.back2');
    const drop = document.querySelector('.drop');
    const lastDecoration = document.querySelector('.last-decoration');
    const overlay = document.querySelector('.overlay');

    // 1. 背景が上に移動
    setTimeout(() => {
        back1.classList.add('move-up');
    }, 1000);

    // 2. 雫が消える
    setTimeout(() => {
        drop.classList.add('fade-out');
    }, 5000);

    // 3. lastDecorationが登場し、その後すぐに消える
    setTimeout(() => {
        lastDecoration.classList.add('fade-in');
    }, 4000);

    setTimeout(() => {
        lastDecoration.classList.add('fade-out');
    }, 6000);

    // 4. 背景1が非表示になり、白い時間に入る
    setTimeout(() => {
        back1.style.display = 'none';
    }, 6000);

    // 5. 白い時間（約2秒）を挟んでから、背景2が出現し、ボケからクリアに
    setTimeout(() => {
        back2.classList.add('fade-in');

        setTimeout(() => {
            back2.classList.add('clear-blur');
        }, 100);

    }, 8000); // 6000ms + 2000ms = 8000ms に変更

    // 6. TOPページへの遷移直前にlastDecorationを再登場
    setTimeout(() => {
        lastDecoration.classList.remove('fade-out');
        lastDecoration.classList.add('fade-in');
    }, 13000); // タイミングを調整

    // 7. 画面が白くなりTOPページへ遷移
    setTimeout(() => {
        // すべての要素を完全に透明にする
        back2.style.opacity = '0';
        lastDecoration.style.opacity = '0';

        // 画面を白くするアニメーションを開始
        overlay.classList.add('fade-in');

        // TOPページへの遷移
        setTimeout(() => {
            window.location.href = 'TOP/index.html';
        }, 3000);
    }, 15000); // タイミングを調整
});
