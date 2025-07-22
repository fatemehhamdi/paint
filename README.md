# 🎨 نقاشی بکش لوئی (Paint Loui)

یک web application برای نقاشی که با React.js ساخته شده و به کاربران امکان drawing اشکال هندسی، free-hand sketching، و save/load کردن آثار را می‌دهد.

## ✨ قابلیت‌های اصلی

این برنامه سه نوع shape اصلی دارد که می‌توان با drag کردن سایزشان را تعیین کرد. همچنین یک pencil tool هم دارد که برای رسم آزاد و خطوط منحنی استفاده می‌شود. هر شکلی که کشیده می‌شود را می‌توان با double-click حذف کرد. کل painting را هم می‌توان به صورت JSON file ذخیره کرد و بعداً دوباره load کرد. در حین کشیدن هر شکل، یک preview شفاف نشان داده می‌شود تا مشخص شود چطور خواهد شد.

## 🏗️ ساختار Components

### App.jsx - Core Management
این component اصلی‌ترین بخش برنامه است که تمام state مهم را نگه می‌دارد. یک array از shapes که کشیده شده‌اند، tool که فعلاً انتخاب شده، title قابل تغییر painting، و functions مربوط به file handling را manage می‌کند. وقتی کاربر shape جدیدی می‌کشد، این component آن را به list اضافه می‌کند و وقتی double-click می‌شود، حذفش می‌کند.

### Canvas.jsx - Drawing Surface  
اینجا جایی است که تمام mouse interactions اتفاق می‌افتد. وقتی mouse down می‌شود، نقطه شروع را ثبت می‌کند و یک temporary shape می‌سازد. در طول mouse move، سایز یا path را بر اساس موقعیت فعلی update می‌کند. وقتی mouse up شد، shape موقتی را به یک permanent shape تبدیل می‌کند و به App component پاس می‌دهد.

برای geometric shapes، سایز بر اساس distance بین نقطه شروع و موقعیت فعلی mouse محاسبه می‌شود. اما برای pencil، یک SVG path می‌سازد که از تمام نقاط عبوری mouse تشکیل شده است.

### Shape.jsx - Rendering Engine
هر نوع shape با تکنیک متفاوتی render می‌شود. دایره‌ها با یک div که border-radius 50% دارد ساخته می‌شوند. مربع‌ها فقط یک div معمولی با background color هستند. مثلث‌ها با استفاده از CSS border tricks ساخته می‌شوند.pencil strokes هم به صورت SVG path نمایش داده می‌شوند تا خطوط به صورت دلخواه (صاف یا منحنی) قابل کشیدن باشند.

هر shape یک double-click handler دارد که به App component می‌گوید این shape را حذف کند. با stopPropagation مطمئن می‌شویم که events بین shapes مختلف با هم تداخل نکنند.

### Supporting Components
نوار کناری یا Sidebar یک tool picker ساده است که وقتی tool عوض می‌شود، visual feedback می‌دهد و cursor را هم تغییر می‌دهد. StatusBar تعداد هر نوع shape را real-time نشان می‌دهد. Header شامل title قابل edit و دکمه‌های export/import است.

## 🔄 User Experience Flow

وقتی کاربر یک tool انتخاب می‌کند، cursor تغییر می‌کند تا نشان دهد چه کاری می‌شود انجام داد. برای geometric shapes، کاربر click و drag می‌کند تا سایز را تعیین کند. در حین drag، یک preview شفاف نشان داده می‌شود. وقتی mouse را release کرد، shape نهایی می‌شود.

برای pencil tool، process یکم متفاوت است. با شروع drag، یک SVG path جدید شروع می‌شود و هر نقطه‌ای که mouse از آن رد می‌شود، به path اضافه می‌شود. این باعث می‌شود خطوط smooth و natural باشند.

مدیریت فایل یا File management هم پیچیدگی خاصی ندارد. Export کل state فعلی را به یک JSON object تبدیل می‌کند که شامل title، shapes، و timestamp است. Import این process را reverse می‌کند و کل board را با data جدید replace می‌کند.

## 🛠️ Technical Implementation

محاسبه موقعیت یا Position calculation یکی از challenging parts بوده چون باید مطمئن شویم coordinates دقیق هستند. getBoundingClientRect استفاده می‌شود تا موقعیت canvas نسبت به viewport را پیدا کنیم.

برای performance، هر shape یک unique ID دارد که باعث efficient re-rendering می‌شود. همچنین functional updates در setState استفاده می‌شود تا از stale closures جلوگیری شود.

تجربه کاربری یا User experience را بهتر کردیم با چیزهایی مثل تغییر cursor، transparent previews، و reset کردن file input بعد از import تا بشود همان file را دوباره import کرد.

## 🎨 Visual Design

هر نوع shape رنگ مخصوص خودش را دارد که به visual identification کمک می‌کند. دایره‌ها آبی، مربع‌ها سبز، مثلث‌ها زرد، و pencil strokes بنفش هستند. این color scheme intuitive است و contrast خوبی دارد.

## 🔧 Problem Solving

یکی از main challenges مربوط به event handling بود. SVG elements به طور پیش‌فرض تمام mouse events را capture می‌کنند، حتی وقتی mouse روی transparent areas است. این باعث می‌شد که shapes زیرش قابل click نباشند. با تنظیم smart pointer-events، فقط actual drawn lines clickable شدند.

موضوع positioning هم challenging بود. اول از corner-based positioning استفاده می‌کردیم که باعث می‌شد shapes در جاهای غیرمنتظره appear شوند. تغییر به center-based positioning نتیجه natural-تری داده است.

همچنین State management برای import/export هم نیازمند بررسی بود. به جای merge کردن imported data با existing shapes، تصمیم گرفتیم کل state را replace کنیم.

## 🤖 هوش مصنوعی

برای بهبود performance، بهینه‌سازی ساختار کد، و رفع مشکلات فنی از هوش مصنوعی Claude استفاده شده است. این همکاری شامل بهبود event handling، optimization در React، و debugging مسائل پیچیده بوده است.