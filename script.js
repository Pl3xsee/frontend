// ==================== ПЕРЕКЛЮЧЕНИЕ СТРАНИЦ ====================

document.addEventListener("DOMContentLoaded", () => {

    const navButtons = document.querySelectorAll(".nav-btn");
    const pages = document.querySelectorAll(".page");

    function showPage(pageName) {
        pages.forEach(page => page.classList.remove("active"));
        navButtons.forEach(btn => btn.classList.remove("active"));

        const targetPage = document.getElementById(pageName);
        if (targetPage) targetPage.classList.add("active");

        const targetButton = document.querySelector(
            `.nav-btn[data-page="${pageName}"]`
        );
        if (targetButton) targetButton.classList.add("active");

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    navButtons.forEach(button => {
        button.addEventListener("click", () => {
            showPage(button.getAttribute("data-page"));
        });
    });

});


// ==================== ЗАДАНИЕ 1 ====================

document.addEventListener("DOMContentLoaded", () => {

    /* ЭТАП 1 */
    const editSelector = document.getElementById("editSelector");
    const editText     = document.getElementById("editText");
    const editBtn      = document.getElementById("editBtn");
    const editResult   = document.getElementById("editResult");

    editBtn.addEventListener("click", () => {
        const selector = editSelector.value.trim();
        const newText  = editText.value;
        const element  = document.querySelector(selector);

        if (!element) {
            editResult.textContent = "❌ Элемент не найден: " + selector;
            editResult.className = "result error";
            return;
        }

        element.textContent = newText;
        editResult.textContent = "✅ Текст элемента «" + selector + "» изменён.";
        editResult.className = "result ok";
        console.log("Изменён элемент:", element);
    });


    /* ЭТАП 2 */
    const newDivClass  = document.getElementById("newDivClass");
    const newDivText   = document.getElementById("newDivText");
    const newDivParent = document.getElementById("newDivParent");
    const createDivBtn = document.getElementById("createDivBtn");
    const createDivRes = document.getElementById("createDivResult");

    createDivBtn.addEventListener("click", () => {
        const className = newDivClass.value.trim();
        const text      = newDivText.value || "Мен жаңа элементпін";
        const parentSel = newDivParent.value.trim() || "body";
        const parent    = document.querySelector(parentSel);

        if (!parent) {
            createDivRes.textContent = "❌ Родитель не найден: " + parentSel;
            createDivRes.className = "result error";
            return;
        }

        const newDiv = document.createElement("div");
        if (className) newDiv.className = className;
        newDiv.textContent = text;
        parent.appendChild(newDiv);

        createDivRes.textContent =
            "✅ Создан <div> с классом «" + className + "» и добавлен в " + parentSel;
        createDivRes.className = "result ok";
        console.log("Создан новый div:", newDiv);
    });


    /* ЭТАП 3 */
    const removeSelector = document.getElementById("removeSelector");
    const removeBtn      = document.getElementById("removeBtn");
    const removeResult   = document.getElementById("removeResult");

    removeBtn.addEventListener("click", () => {
        const selector = removeSelector.value.trim();
        const element  = document.querySelector(selector);

        if (!element) {
            removeResult.textContent = "❌ Элемент не найден: " + selector;
            removeResult.className = "result error";
            return;
        }

        element.remove();
        removeResult.textContent = "✅ Элемент «" + selector + "» удалён.";
        removeResult.className = "result ok";
        console.log("Удалён элемент:", element);
    });


    /* ЭТАП 4 */
    const paragraphText      = document.getElementById("paragraphText");
    const paragraphParent    = document.getElementById("paragraphParent");
    const createParagraphBtn = document.getElementById("createParagraphBtn");
    const paragraphResult    = document.getElementById("paragraphResult");

    createParagraphBtn.addEventListener("click", () => {
        const text      = paragraphText.value || "Бұл ауыспалы абзац";
        const parentSel = paragraphParent.value.trim() || "body";
        const parent    = document.querySelector(parentSel);

        if (!parent) {
            paragraphResult.textContent = "❌ Родитель не найден: " + parentSel;
            paragraphResult.className = "result error";
            return;
        }

        const paragraph = document.createElement("p");
        paragraph.className = "created-paragraph";
        paragraph.textContent = text;
        parent.appendChild(paragraph);

        let isChanged = false;
        paragraph.addEventListener("click", () => {
            if (!isChanged) {
                paragraph.style.color = "#facc15";
                paragraph.style.fontSize = "26px";
                isChanged = true;
            } else {
                paragraph.style.color = "#cbd5e1";
                paragraph.style.fontSize = "18px";
                isChanged = false;
            }
        });

        paragraphResult.textContent =
            "✅ Абзац создан в «" + parentSel + "». Кликни по нему.";
        paragraphResult.className = "result ok";
        console.log("Создан абзац:", paragraph);
    });

});


// ==================== ЗАДАНИЕ 2 ====================

document.addEventListener("DOMContentLoaded", () => {

    const classSelector  = document.getElementById("classSelector");
    const classNameInput = document.getElementById("className");

    const toggleBtn      = document.getElementById("toggleBtn");
    const addBtn         = document.getElementById("addBtn");
    const removeClassBtn = document.getElementById("removeClassBtn");
    const showBtn        = document.getElementById("showBtn");

    const classResult    = document.getElementById("classResult");

    const outputMap = new WeakMap();

    function getTarget() {
        const selector = classSelector.value.trim();
        const el = document.querySelector(selector);

        if (!el) {
            classResult.textContent = "❌ Элемент не найден: " + selector;
            classResult.className = "result error";
            return null;
        }
        return el;
    }

    function ensureOutput(el) {
        if (outputMap.has(el)) return outputMap.get(el);

        const p = document.createElement("p");
        p.className = "class-output";
        p.textContent = "Кластар тізімі: (бос)";
        el.insertAdjacentElement("afterend", p);

        outputMap.set(el, p);
        return p;
    }

    function printClasses(el) {
        const classes = Array.from(el.classList);
        console.log("Кластар тізімі:", classes);

        const p = ensureOutput(el);
        p.textContent = "Кластар тізімі: " +
            (classes.length ? classes.join(", ") : "(бос)");
    }

    toggleBtn.addEventListener("click", () => {
        const el = getTarget();
        if (!el) return;

        const cls = classNameInput.value.trim();
        if (!cls) {
            classResult.textContent = "❌ Введи название класса.";
            classResult.className = "result error";
            return;
        }

        el.classList.toggle(cls);
        classResult.textContent = "✅ Toggle выполнен для класса «" + cls + "».";
        classResult.className = "result ok";
        printClasses(el);
    });

    addBtn.addEventListener("click", () => {
        const el = getTarget();
        if (!el) return;

        const cls = classNameInput.value.trim();
        if (!cls) {
            classResult.textContent = "❌ Введи название класса.";
            classResult.className = "result error";
            return;
        }

        el.classList.add(cls);
        classResult.textContent = "✅ Класс «" + cls + "» добавлен.";
        classResult.className = "result ok";
        printClasses(el);
    });

    removeClassBtn.addEventListener("click", () => {
        const el = getTarget();
        if (!el) return;

        const cls = classNameInput.value.trim();
        if (!cls) {
            classResult.textContent = "❌ Введи название класса.";
            classResult.className = "result error";
            return;
        }

        el.classList.remove(cls);
        classResult.textContent = "✅ Класс «" + cls + "» удалён.";
        classResult.className = "result ok";
        printClasses(el);
    });

    showBtn.addEventListener("click", () => {
        const el = getTarget();
        if (!el) return;

        printClasses(el);
        classResult.textContent = "✅ Список классов выведен в консоль и в <p>.";
        classResult.className = "result ok";
    });

});


// ==================== ЗАДАНИЕ 3. ТАБЛИЦА ====================

document.addEventListener("DOMContentLoaded", () => {

    const COLORS = [
        { name: 'қызыл',           hex: '#e53935' },
        { name: 'көк',             hex: '#1e88e5' },
        { name: 'жасыл',           hex: '#43a047' },
        { name: 'сары',            hex: '#fdd835' },
        { name: 'қызғылт',         hex: '#ec407a' },
        { name: 'күлгін',          hex: '#8e24aa' },
        { name: 'қызғылт сары',    hex: '#fb8c00' },
        { name: 'көгілдір',        hex: '#00acc1' },
        { name: 'қоңыр',           hex: '#6d4c41' },
        { name: 'сұр',             hex: '#757575' },
        { name: 'қара',            hex: '#212121' },
        { name: 'ақ',              hex: '#ffffff' },
        { name: 'жасыл-сары',      hex: '#cddc39' },
        { name: 'индиго',          hex: '#3949ab' },
        { name: 'қызғылт күлгін',  hex: '#d81b60' },
        { name: 'теңіз толқыны',   hex: '#00897b' },
        { name: 'зәйтүн',          hex: '#827717' },
        { name: 'қызыл-қоңыр',     hex: '#8d6e63' },
        { name: 'аспан',           hex: '#29b6f6' },
        { name: 'лаванда',         hex: '#b39ddb' }
    ];

    let selectedColor = null;
    let tableEl = null;

    const rowsInput      = document.getElementById('rowsInput');
    const colsInput      = document.getElementById('colsInput');
    const createBtn      = document.getElementById('createTableBtn');
    const clearBtn       = document.getElementById('clearTableBtn');
    const errorMsg       = document.getElementById('tableError');
    const colorPicker    = document.getElementById('colorPicker');
    const tableContainer = document.getElementById('tableContainer');
    const colorStats     = document.getElementById('colorStats');

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

    function validateNumber(value) {
        if (value.trim() === '') return 'Бос жол қалдырмаңыз!';
        if (!/^\d+$/.test(value)) return 'Тек сандарды енгізіңіз!';
        const n = Number(value);
        if (n === 0) return '0 енгізуге болмайды!';
        if (n > 50) return 'Тым үлкен сан (макс 50)!';
        return null;
    }

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

    function paintCell(td) {
        if (!selectedColor) {
            alert('Алдымен түс таңдаңыз!');
            return;
        }
        td.style.background = selectedColor;
        updateStats();
    }

    function rgbToHex(rgb) {
        if (!rgb) return '';
        if (rgb.startsWith('#')) return rgb.toLowerCase();
        const m = rgb.match(/\d+/g);
        if (!m) return rgb;
        return '#' + m.slice(0, 3)
            .map(n => (+n).toString(16).padStart(2, '0'))
            .join('');
    }

    function updateStats() {
        if (!tableEl) {
            colorStats.innerHTML = '';
            return;
        }

        const counts = {};
        tableEl.querySelectorAll('td').forEach(td => {
            const bg = td.style.background;
            if (bg) {
                const hex = rgbToHex(bg);
                counts[hex] = (counts[hex] || 0) + 1;
            }
        });

        colorStats.innerHTML = '';
        if (Object.keys(counts).length === 0) return;

        COLORS.forEach(c => {
            const hex = c.hex.toLowerCase();
            if (counts[hex]) {
                const item = document.createElement('div');
                item.className = 'stat-item';

                const dot = document.createElement('span');
                dot.className = 'dot';
                dot.style.background = c.hex;

                const text = document.createElement('span');
                text.textContent = `${counts[hex]} - ${c.name} ұяшық`;

                item.appendChild(dot);
                item.appendChild(text);
                colorStats.appendChild(item);
            }
        });
    }

    createBtn.addEventListener('click', () => {
        const rv = rowsInput.value;
        const cv = colsInput.value;

        const errR = validateNumber(rv);
        const errC = validateNumber(cv);

        if (errR) { errorMsg.textContent = 'Жолдар: ' + errR; return; }
        if (errC) { errorMsg.textContent = 'Бағандар: ' + errC; return; }

        errorMsg.textContent = '';

        const rows = Number(rv);
        const cols = Number(cv);

        tableContainer.innerHTML = '';
        tableEl = createTable(rows, cols);
        tableContainer.appendChild(tableEl);
        updateStats();
    });

    clearBtn.addEventListener('click', () => {
        tableContainer.innerHTML = '';
        colorStats.innerHTML = '';
        tableEl = null;
        errorMsg.textContent = '';
        rowsInput.value = '';
        colsInput.value = '';
    });

    renderColorPicker();
});


// ==================== ЗАДАНИЕ 4. ТЁМНАЯ ТЕМА ====================

document.addEventListener("DOMContentLoaded", () => {

    const themeToggle = document.getElementById('themeToggle');

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
        themeToggle.checked = true;
    }

    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark', themeToggle.checked);
        localStorage.setItem('theme', themeToggle.checked ? 'dark' : 'light');
    });

});