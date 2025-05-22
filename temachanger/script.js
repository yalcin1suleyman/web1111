$(document).ready(function() {
    // Tema isimleri ve ikonları dizisi
    const themes = ['light-theme', 'dark-theme', 'sepia-theme', 'blue-night-theme'];
    const themeIcons = {
        'light-theme': 'fa-moon',
        'dark-theme': 'fa-sun',
        'sepia-theme': 'fa-book',
        'blue-night-theme': 'fa-star'
    };

    function updateThemeToggleIcon(theme) {
        const icon = themeIcons[theme] || 'fa-moon';
        $('#themeToggle i')
            .removeClass('fa-moon fa-sun fa-book fa-star')
            .addClass(icon);
    }

    // Tema değiştirme fonksiyonu (döngüsel)
    $('#themeToggle').click(function() {
        let current = themes.findIndex(t => $('body').hasClass(t));
        let next = (current + 1) % themes.length;
        $('body').removeClass(themes.join(' ')).addClass(themes[next]);
        localStorage.setItem('theme', themes[next]);
        // Aktif butonu güncelle
        $('.theme-btn').removeClass('active');
        $(`.theme-btn[data-theme="${themes[next]}"]`).addClass('active');
        // İkonu güncelle
        updateThemeToggleIcon(themes[next]);
    });

    // Tema seçim butonları için event listener
    $('.theme-btn').click(function() {
        const selectedTheme = $(this).data('theme');
        // Tüm tema sınıflarını kaldır
        $('body').removeClass('light-theme dark-theme sepia-theme blue-night-theme');
        // Seçilen temayı ekle
        $('body').addClass(selectedTheme);
        
        // Tema tercihini localStorage'a kaydet
        localStorage.setItem('theme', selectedTheme);
        
        // Aktif butonu güncelle
        $('.theme-btn').removeClass('active');
        $(this).addClass('active');
        // İkonu güncelle
        updateThemeToggleIcon(selectedTheme);
    });

    // Yazı boyutu değiştirme fonksiyonları
    let currentFontSize = 16;
    const minFontSize = 12;
    const maxFontSize = 24;

    $('#increaseFont').click(function() {
        if (currentFontSize < maxFontSize) {
            currentFontSize += 2;
            updateFontSize();
        }
    });

    $('#decreaseFont').click(function() {
        if (currentFontSize > minFontSize) {
            currentFontSize -= 2;
            updateFontSize();
        }
    });

    function updateFontSize() {
        // Temel metin boyutu
        $('body').css('font-size', currentFontSize + 'px');
        
        // Başlıklar için ölçeklendirme
        $('h1').css('font-size', (currentFontSize * 2.5) + 'px');
        $('h2').css('font-size', (currentFontSize * 2) + 'px');
        $('h3').css('font-size', (currentFontSize * 1.75) + 'px');
        $('h4').css('font-size', (currentFontSize * 1.5) + 'px');
        $('h5').css('font-size', (currentFontSize * 1.25) + 'px');
        $('h6').css('font-size', (currentFontSize * 1.1) + 'px');
        
        localStorage.setItem('fontSize', currentFontSize);
    }

    // Yazı tipi değiştirme
    $('#fontFamily').change(function() {
        const selectedFont = $(this).val();
        $('body').css('font-family', selectedFont);
        localStorage.setItem('fontFamily', selectedFont);
    });

    // Sayfa yüklendiğinde kaydedilmiş tercihleri uygula
    function loadSavedPreferences() {
        // Tema tercihi
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            $('body').removeClass('light-theme dark-theme sepia-theme blue-night-theme');
            $('body').addClass(savedTheme);
            $(`.theme-btn[data-theme="${savedTheme}"]`).addClass('active');
            updateThemeToggleIcon(savedTheme);
        }

        // Yazı boyutu tercihi
        const savedFontSize = localStorage.getItem('fontSize');
        if (savedFontSize) {
            currentFontSize = parseInt(savedFontSize);
            updateFontSize();
        }

        // Yazı tipi tercihi
        const savedFontFamily = localStorage.getItem('fontFamily');
        if (savedFontFamily) {
            $('#fontFamily').val(savedFontFamily);
            $('body').css('font-family', savedFontFamily);
        }
    }

    // Sayfa yüklendiğinde tercihleri yükle
    loadSavedPreferences();

    // Erişilebilirlik için klavye kısayolları
    $(document).keydown(function(e) {
        // Alt + T: Tema değiştir
        if (e.altKey && e.key === 't') {
            $('#themeToggle').click();
        }
        // Alt + +: Yazı boyutunu büyüt
        if (e.altKey && e.key === '+') {
            $('#increaseFont').click();
        }
        // Alt + -: Yazı boyutunu küçült
        if (e.altKey && e.key === '-') {
            $('#decreaseFont').click();
        }
    });
}); 