/* ==========================================================
   НАВИГАЦИЯ ПО СТРАНИЦАМ
   ========================================================== */
const navButtons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');
const mainButtons = document.querySelectorAll('.main-button[data-page]');

function showPage(pageId) {
    pages.forEach(p => p.classList.remove('active'));
    navButtons.forEach(b => b.classList.remove('active'));

    const target = document.getElementById(pageId);
    if (target) target.classList.add('active');

    const btn = document.querySelector(`.nav-btn[data-page="${pageId}"]`);
    if (btn) btn.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

navButtons.forEach(btn => {
    btn.addEventListener('click', () => showPage(btn.dataset.page));
});
mainButtons.forEach(btn => {
    btn.addEventListener('click', () => showPage(btn.dataset.page));
});


/* ==========================================================
   ЗАДАНИЕ 1 — ПЕСОЧНИЦА DOM
   ========================================================== */

// ЭТАП 1: изменить текст
const editBtn = document.getElementById('editBtn');
const editSelector = document.getElementById('editSelector');
const editText = document.getElementById('editText');
const editResult = document.getElementById('editResult');

editBtn.addEventListener('click', () => {
    const sel = editSelector.value.trim();
    const text = editText.value;

    if (!sel) {
        editResult.textContent = 'Введи селектор!';
        editResult.className = 'result err';
        return;
    }

    try {
        const el = document.querySelector(sel);
        if (!el) {
            editResult.textContent = 'Элемент не найден: ' + sel;
            editResult.className = 'result err';
            return;
        }
        el.textContent = text;
        editResult.textContent = `✓ Текст элемента "${sel}" изменён.`;
        editResult.className = 'result ok';
    } catch (e) {
        editResult.textContent = 'Ошибка селектора: ' + e.message;
        editResult.className = 'result err';
    }
});

// ЭТАП 2: создать div
const createDivBtn = document.getElementById('createDivBtn');
const newDivClass = document.getElementById('newDivClass');
const newDivText = document.getElementById('newDivText');
const newDivParent = document.getElementById('newDivParent');
const createDivResult = document.getElementById('createDivResult');

createDivBtn.addEventListener('click', () => {
    const cls = newDivClass.value.trim();
    const text = newDivText.value;
    const parentSel = newDivParent.value.trim() || 'body';

    try {
        const parent = document.querySelector(parentSel);
        if (!parent) {
            createDivResult.textContent = 'Родитель не найден: ' + parentSel;
            createDivResult.className = 'result err';
            return;
        }

        const div = document.createElement('div');
        if (cls) div.className = cls;
        div.textContent = text;

        parent.appendChild(div);

        createDivResult.textContent = `✓ Создан div .${cls} и добавлен в "${parentSel}".`;
        createDivResult.className = 'result ok';
    } catch (e) {
        createDivResult.textContent = 'Ошибка: ' + e.message;
        createDivResult.className = 'result err';
    }
});

// ЭТАП 3: удалить элемент
const removeBtn = document.getElementById('removeBtn');
const removeSelector = document.getElementById('removeSelector');
const removeResult = document.getElementById('removeResult');

removeBtn.addEventListener('click', () => {
    const sel = removeSelector.value.trim();

    if (!sel) {
        removeResult.textContent = 'Введи селектор!';
        removeResult.className = 'result err';
        return;
    }

    try {
        const el = document.querySelector(sel);
        if (!el) {
            removeResult.textContent = 'Элемент не найден: ' + sel;
            removeResult.className = 'result err';
            return;
        }
        el.remove();
        removeResult.textContent = `✓ Элемент "${sel}" удалён.`;
        removeResult.className = 'result ok';
    } catch (e) {
        removeResult.textContent = 'Ошибка: ' + e.message;
        removeResult.className = 'result err';
    }
});

// ЭТАП 4: создать абзац, меняющий цвет по клику
const createParagraphBtn = document.getElementById('createParagraphBtn');
const paragraphText = document.getElementById('paragraphText');
const paragraphParent = document.getElementById('paragraphParent');
const paragraphResult = document.getElementById('paragraphResult');

createParagraphBtn.addEventListener('click', () => {
    const text = paragraphText.value || 'Бұл ауыспалы абзац';
    const parentSel = paragraphParent.value.trim() || 'body';

    try {
        const parent = document.querySelector(parentSel);
        if (!parent) {
            paragraphResult.textContent = 'Родитель не найден: ' + parentSel;
            paragraphResult.className = 'result err';
            return;
        }

        const p = document.createElement('p');
        p.textContent = text;

        let clicked = false;
        p.addEventListener('click', () => {
            clicked = !clicked;
            p.style.color = clicked ? 'red' : '';
            p.style.fontSize = clicked ? '24px' : '';
        });

        parent.appendChild(p);

        paragraphResult.textContent = `✓ Абзац создан в "${parentSel}". Кликни по нему!`;
        paragraphResult.className = 'result ok';
    } catch (e) {
        paragraphResult.textContent = 'Ошибка: ' + e.message;
        paragraphResult.className = 'result err';
    }
});


/* ==========================================================
   ЗАДАНИЕ 2 — УПРАВЛЕНИЕ КЛАССАМИ
   ========================================================== */
const classSelector = document.getElementById('classSelector');
const classNameInput = document.getElementById('className');
const toggleBtn = document.getElementById('toggleBtn');
const addBtn = document.getElementById('addBtn');
const removeClassBtn = document.getElementById('removeClassBtn');
const showBtn = document.getElementById('showBtn');
const classResult = document.getElementById('classResult');

function getTargetEl() {
    const sel = classSelector.value.trim();
    if (!sel) {
        classResult.textContent = 'Введи селектор!';
        classResult.className = 'result err';
        return null;
    }
    const el = document.querySelector(sel);
    if (!el) {
        classResult.textContent = 'Элемент не найден: ' + sel;
        classResult.className = 'result err';
        return null;
    }
    return el;
}

toggleBtn.addEventListener('click', () => {
    const el = getTargetEl();
    if (!el) return;
    const cls = classNameInput.value.trim();
    if (!cls) return;
    el.classList.toggle(cls);
    classResult.textContent = `✓ Переключён "${cls}". Классы: ${[...el.classList].join(', ') || '—'}`;
    classResult.className = 'result ok';
});

addBtn.addEventListener('click', () => {
    const el = getTargetEl();
    if (!el) return;
    const cls = classNameInput.value.trim();
    if (!cls) return;
    el.classList.add(cls);
    classResult.textContent = `✓ Добавлен "${cls}". Классы: ${[...el.classList].join(', ') || '—'}`;
    classResult.className = 'result ok';
});

removeClassBtn.addEventListener('click', () => {
    const el = getTargetEl();
    if (!el) return;
    const cls = classNameInput.value.trim();
    if (!cls) return;
    el.classList.remove(cls);
    classResult.textContent = `✓ Удалён "${cls}". Классы: ${[...el.classList].join(', ') || '—'}`;
    classResult.className = 'result ok';
});

showBtn.addEventListener('click', () => {
    const el = getTargetEl();
    if (!el) return;
    const list = [...el.classList];
    console.log('Классы элемента', el, list);
    classResult.textContent = `Классы: ${list.join(', ') || '—'}`;
    classResult.className = 'result ok';
});


/* ==========================================================
   ЗАДАНИЕ 3 — ТАБЛИЦА
   ========================================================== */

const COLORS = [
    { name: 'красный',       hex: '#e53935' },
    { name: 'синий',         hex: '#1e88e5' },
    { name: 'зелёный',       hex: '#43a047' },
    { name: 'жёлтый',        hex: '#fdd835' },
    { name: 'розовый',       hex: '#ec407a' },
    { name: 'фиолетовый',    hex: '#8e24aa' },
    { name: 'оранжевый',     hex: '#fb8c00' },
    { name: 'голубой',       hex: '#00acc1' },
    { name: 'коричневый',    hex: '#6d4c41' },
    { name: 'серый',         hex: '#757575' },
    { name: 'чёрный',        hex: '#212121' },
    { name: 'белый',         hex: '#ffffff' },
    { name: 'лаймовый',      hex: '#cddc39' },
    { name: 'индиго',        hex: '#3949ab' },
    { name: 'малиновый',     hex: '#d81b60' },
    { name: 'бирюзовый',     hex: '#00897b' },
    { name: 'оливковый',     hex: '#827717' },
    { name: 'терракотовый',  hex: '#8d6e63' },
    { name: 'небесный',      hex: '#29b6f6' },
    { name: 'лавандовый',    hex: '#b39ddb' }
];

let selectedColor = null;
let tableEl = null;

const rowsInput = document.getElementById('rowsInput');
const colsInput = document.getElementById('colsInput');
const createTableBtn = document.getElementById('createTableBtn');
const clearTableBtn = document.getElementById('clearTableBtn');
const errorMsg = document.getElementById('tableError');
const colorPicker = document.getElementById('colorPicker');
const tableContainer = document.getElementById('tableContainer');
const colorStats = document.getElementById('colorStats');

// ---------- Палитра ----------
function renderColorPicker() {
    colorPicker.innerHTML = '';
    COLORS.forEach(c => {
        const sw = document.createElement('div');
        sw.className = 'color-swatch';
        sw.style.background = c.hex;
        sw.dataset.hex = c.hex;
        sw.title = c.name;

        sw.addEventListener('click', () => {
            document.querySelectorAll('.color-swatch')
                .forEach(s => s.classList.remove('selected'));
            sw.classList.add('selected');
            selectedColor = c.hex;
        });

        colorPicker.appendChild(sw);
    });
}

// ---------- Валидация ----------
function validateNumber(value) {
    if (value.trim() === '') return 'Поле не должно быть пустым!';
    if (!/^\d+$/.test(value)) return 'Вводите только цифры!';
    const n = Number(value);
    if (n === 0) return 'Нельзя вводить 0!';
    if (n > 50) return 'Слишком большое число (максимум 50)!';
    return null;
}

// ---------- Создание таблицы ----------
function createTable(rows, cols) {
    const table = document.createElement('table');
    for (let r = 0; r < rows; r++) {
        const tr = document.createElement('tr');
        for (let c = 0; c < cols; c++) {
            const td = document.createElement('td');
            td.addEventListener('click', () => paintCell(td));
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}

// ---------- Покраска ячейки ----------
function paintCell(td) {
    if (!selectedColor) {
        alert('Сначала выберите цвет!');
        return;
    }
    td.style.background = selectedColor;
    updateStats();
}

// ---------- rgb -> hex ----------
function rgbToHex(rgb) {
    if (rgb.startsWith('#')) return rgb.toLowerCase();
    const m = rgb.match(/\d+/g);
    if (!m) return rgb;
    return '#' + m.slice(0, 3)
        .map(n => (+n).toString(16).padStart(2, '0'))
        .join('');
}

// ---------- Статистика ----------
// Выводит только закрашенные цвета + итоговый счётчик
function updateStats() {
    if (!tableEl) {
        colorStats.innerHTML = '';
        return;
    }

    const counts = {};
    let painted = 0;

    tableEl.querySelectorAll('td').forEach(td => {
        const bg = td.style.background;
        if (bg && bg !== 'white' && bg !== 'rgb(255, 255, 255)') {
            const hex = rgbToHex(bg);
            counts[hex] = (counts[hex] || 0) + 1;
            painted++;
        }
    });

    colorStats.innerHTML = '';

    // ничего не закрашено — блок пустой
    if (painted === 0) return;

    // каждый закрашенный цвет из палитры
    COLORS.forEach(c => {
        const hex = c.hex.toLowerCase();
        if (counts[hex]) {
            const item = document.createElement('div');
            item.className = 'stat-item';

            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.style.background = c.hex;

            const text = document.createElement('span');
            text.textContent = `${counts[hex]} - ${c.name}`;

            item.appendChild(dot);
            item.appendChild(text);
            colorStats.appendChild(item);
        }
    });

    // итоговый счётчик
    const total = document.createElement('div');
    total.className = 'stat-item total';
    total.textContent = `Закрашено: ${painted}`;
    colorStats.appendChild(total);
}

// ---------- Кнопки ----------
createTableBtn.addEventListener('click', () => {
    const rv = rowsInput.value;
    const cv = colsInput.value;

    const errR = validateNumber(rv);
    const errC = validateNumber(cv);

    if (errR) { errorMsg.textContent = 'Строки: ' + errR; return; }
    if (errC) { errorMsg.textContent = 'Столбцы: ' + errC; return; }

    errorMsg.textContent = '';

    tableContainer.innerHTML = '';
    tableEl = createTable(Number(rv), Number(cv));
    tableContainer.appendChild(tableEl);
    updateStats();
});

clearTableBtn.addEventListener('click', () => {
    tableContainer.innerHTML = '';
    colorStats.innerHTML = '';
    tableEl = null;
    errorMsg.textContent = '';
    rowsInput.value = '';
    colsInput.value = '';
});

renderColorPicker();


/* ==========================================================
   ЗАДАНИЕ 4 — ТЁМНАЯ ТЕМА
   ========================================================== */
const themeToggle = document.getElementById('themeToggle');

// загрузка сохранённой темы
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeToggle.checked = true;
}

themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark', themeToggle.checked);
    localStorage.setItem('theme', themeToggle.checked ? 'dark' : 'light');
});