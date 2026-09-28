// 결과별 정보 (종류를 추가하려면 여기에 항목만 추가)
const RESULTS = {
  samurai: { title: '사무라이 임명장', image: 'images/samurai.png', alt: '사무라이 임명장' },
  knight:  { title: '기사 임명장',     image: 'images/knight.png',  alt: '기사 임명장' },
};

const SUSPENSE_MS = 1500; // 연출 최소 시간

// 50:50 추첨 (crypto 사용)
function drawResult() {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0] % 2 === 0 ? 'samurai' : 'knight';
}

// 당첨된 이미지만 로드해서 성공 여부 반환
function loadImage(el, src) {
  return new Promise((resolve) => {
    el.onload = () => resolve(true);
    el.onerror = () => resolve(false);
    el.src = src;
  });
}

async function main() {
  const key = drawResult();
  const data = RESULTS[key];

  const loadingEl = document.getElementById('loading');
  const resultEl = document.getElementById('result');
  const titleEl = document.getElementById('result-title');
  const imgEl = document.getElementById('result-image');
  const errorEl = document.getElementById('result-error');

  document.body.classList.add('theme-' + key);
  titleEl.textContent = data.title;
  imgEl.alt = data.alt;

  // 연출 시간과 이미지 로딩을 동시에 기다린다
  const [ok] = await Promise.all([
    loadImage(imgEl, data.image),
    new Promise((r) => setTimeout(r, SUSPENSE_MS)),
  ]);

  imgEl.hidden = !ok;
  errorEl.hidden = ok;
  loadingEl.hidden = true;
  resultEl.hidden = false;
}

main();
