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



// ==================== ЗАДАНИЕ 1 — УНИВЕРСАЛЬНАЯ ПЕСОЧНИЦА ====================

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       ЭТАП 1. Изменить текст элемента по селектору
       ========================================================= */
    const editSelector = document.getElementById("editSelector");
    const editText     = document.getElementById("editText");
    const editBtn      = document.getElementById("editBtn");
    const editResult   = document.getElementById("editResult");

    editBtn.addEventListener("click", () => {

        const selector = editSelector.value.trim();
        const newText  = editText.value;      // не trim — разрешаем пробелы

        // Ищем по селектору: #id, .class или тег
        const element = document.querySelector(selector);

        if (!element) {
            editResult.textContent = "❌ Элемент не найден: " + selector;
            editResult.className = "result error";
            return;
        }

        element.textContent = newText;

        editResult.textContent = "✅ Текст элемента «" + selector + "» изменён.";
        editResult.className = "result ok";

        // Лог в консоль — на всякий случай
        console.log("Изменён элемент:", element);
    });



    /* =========================================================
       ЭТАП 2. Создать новый <div> с классом и текстом,
               добавить его к указанному родителю
       ========================================================= */
    const newDivClass   = document.getElementById("newDivClass");
    const newDivText    = document.getElementById("newDivText");
    const newDivParent  = document.getElementById("newDivParent");
    const createDivBtn  = document.getElementById("createDivBtn");
    const createDivRes  = document.getElementById("createDivResult");

    createDivBtn.addEventListener("click", () => {

        const className = newDivClass.value.trim();
        const text      = newDivText.value || "Мен жаңа элементпін";
        const parentSel = newDivParent.value.trim() || "body";

        const parent = document.querySelector(parentSel);

        if (!parent) {
            createDivRes.textContent = "❌ Родитель не найден: " + parentSel;
            createDivRes.className = "result error";
            return;
        }

        // createElement
        const newDiv = document.createElement("div");

        // className
        if (className) newDiv.className = className;

        // textContent
        newDiv.textContent = text;

        // appendChild
        parent.appendChild(newDiv);

        createDivRes.textContent =
            "✅ Создан <div> с классом «" + className + "» и добавлен в " + parentSel;
        createDivRes.className = "result ok";

        console.log("Создан новый div:", newDiv);
    });



    /* =========================================================
       ЭТАП 3. Удалить элемент по селектору
       ========================================================= */
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

        // remove()
        element.remove();

        removeResult.textContent = "✅ Элемент «" + selector + "» удалён.";
        removeResult.className = "result ok";

        console.log("Удалён элемент:", element);
    });



    /* =========================================================
       ЭТАП 4. Создать <p> с текстом, добавить к родителю
               и повесить клик: меняет цвет + размер
       ========================================================= */
    const paragraphText   = document.getElementById("paragraphText");
    const paragraphParent = document.getElementById("paragraphParent");
    const createParagraphBtn = document.getElementById("createParagraphBtn");
    const paragraphResult = document.getElementById("paragraphResult");

    createParagraphBtn.addEventListener("click", () => {

        const text      = paragraphText.value || "Бұл ауыспалы абзац";
        const parentSel = paragraphParent.value.trim() || "body";

        const parent = document.querySelector(parentSel);

        if (!parent) {
            paragraphResult.textContent = "❌ Родитель не найден: " + parentSel;
            paragraphResult.className = "result error";
            return;
        }

        // createElement
        const paragraph = document.createElement("p");
        paragraph.className = "created-paragraph";
        paragraph.textContent = text;

        // appendChild
        parent.appendChild(paragraph);

        // addEventListener — клик меняет стиль
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



// ==================== ЗАДАНИЕ 2 — УПРАВЛЕНИЕ КЛАССАМИ ====================

document.addEventListener("DOMContentLoaded", () => {

    const classSelector  = document.getElementById("classSelector");
    const classNameInput = document.getElementById("className");

    const toggleBtn      = document.getElementById("toggleBtn");
    const addBtn         = document.getElementById("addBtn");
    const removeClassBtn = document.getElementById("removeClassBtn");
    const showBtn        = document.getElementById("showBtn");

    const classResult    = document.getElementById("classResult");

    // Хранилище для <p>, куда выводим классы.
    // Создаётся один раз для каждого элемента и вставляется
    // РЯДОМ с ним через insertAdjacentElement.
    const outputMap = new WeakMap();


    /* ---------------------------------------------------------
       Получить целевой элемент по селектору из поля
       --------------------------------------------------------- */
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


    /* ---------------------------------------------------------
       Создать (при необходимости) <p> рядом с элементом
       и вернуть его
       --------------------------------------------------------- */
    function ensureOutput(el) {

        if (outputMap.has(el)) {
            return outputMap.get(el);
        }

        const p = document.createElement("p");
        p.className = "class-output";
        p.textContent = "Кластар тізімі: (бос)";

        // insertAdjacentElement — вставляем РЯДОМ с элементом
        el.insertAdjacentElement("afterend", p);

        outputMap.set(el, p);
        return p;
    }


    /* ---------------------------------------------------------
       Вывести список классов в console.log и в <p>
       --------------------------------------------------------- */
    function printClasses(el) {

        const classes = Array.from(el.classList);

        // console.log
        console.log("Кластар тізімі:", classes);

        // <p>
        const p = ensureOutput(el);
        p.textContent = "Кластар тізімі: " +
            (classes.length ? classes.join(", ") : "(бос)");
    }


    /* ---------------------------------------------------------
       Toggle
       --------------------------------------------------------- */
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


    /* ---------------------------------------------------------
       Add
       --------------------------------------------------------- */
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


    /* ---------------------------------------------------------
       Remove
       --------------------------------------------------------- */
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


    /* ---------------------------------------------------------
       Показать классы принудительно
       --------------------------------------------------------- */
    showBtn.addEventListener("click", () => {
        const el = getTarget();
        if (!el) return;

        printClasses(el);
        classResult.textContent = "✅ Список классов выведен в консоль и в <p>.";
        classResult.className = "result ok";
    });

});