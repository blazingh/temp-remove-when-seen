"use client";

export default function CookiesSheetContent({
    description,
}: {
    description?: React.ReactNode;
}) {
    return <div className="mt-2 max-h-[80svh] overflow-auto py-4">{
        <span>
            Çerez Nedir?
            Çerez (Cookie), internet sitelerinin ziyaretçilerinin bilgisayar veya mobil cihazlarına bıraktıkları küçük boyutlu veri dosyalarına verilen isimdir. İnternet siteleri, kullanıcıların ilk bağlandıklarında oluşturdukları bu veri dosyalarını sonraki bağlanışlarında okuyarak, daha verimli çalışma ve site dili gibi kullanıcı ayarlarını hızlı biçimde yükleme olanaklarına kavuşurlar.
            Çerez Türleri Nelerdir?
            Çerezler, geçerlilik sürelerine geçici ve kalıcı çerezler olarak ikiye ayrılır. Geçici çerezler, kullanıcıların internet sitesini ziyaretleri sırasında oluşan, bu ziyaret boyunca kullanıcının tercihlerini depolayan ve ziyaret sona erip kullanıcı siteden ayrıldığında otomatik olarak silinen veri dosyalarıdır. Kalıcı çerezler ise, kullanıcı ziyareti sonlanmasına rağmen silinmez ve kullanıcının cihazında bu iş için ayrılmış klasörde geçerlilik süresi bitene kadar yaşamaya devam eder. Bu veri dosyasında depolanan kullanıcı tercihleri, kullanıcının bir sonraki bağlanışında hızlı biçimde bu dosyadan okunarak yüklenir ve kullanıcının daha hızlı ve verimli bir internet sitesi deneyimi alması sağlanır.
            Diştedavim internet siteleri ve mobil uygulamalarında, aşağıda sıralanmış amaçlarla hem geçici hem de kalıcı çerezler kullanılabilmektedir:
            Site güvenlik yönetiminin sağlanması
            Site veya uygulamanın fonksiyonlarının öngörüldüğü şekilde işleyebilmesi
            Site veya uygulamanın performansının izlenmesi ve yüksek seviyede tutulması
            Kullanıcı tercihlerinin hatırlanarak kullanıcıya zaman kazandırılması
            Çerezler Zorunlu Mudur?
            Bilgisayar veya mobil cihazlardaki internet tarayıcıları, ön tanımlı olarak çerezlere izin vermektedir. Bu çerez ayarları internet sitelerinin bu özelliği kullanıcı deneyimini arttırmak için kullanmalarına olanak verir. Kullanıcılar, cihazlarındaki internet tarayıcılarının tipine göre değişen yöntemlerle, çerez ayarlarını değiştirebilir, çerez kullanımını kısmi veya tamamen engelleyebilir. Çerez kullanım seçiminin değiştirilmesine ait yöntem, tarayıcı tipine bağlı olarak değişmekte olup, ilgili hizmet sağlayıcıdan dilendiği zaman öğrenilebilmektedir.
            Firmamızın kullandığı çerezler de, tıpkı diğer internet sitelerininkiler gibi kullanıcılarımız tarafından istenildiğinde kısmen veya tamamen engellenebilmektedir. Buna karşın, çerezlerimizden tamamına yakını site veya uygulamanın fonksiyonlarının düzgün çalışması için tasarlanmış oldukları ve bunların engellenmesi bazı fonksiyonların bozulması sonucunu doğurabileceği için tavsiye edilmemektedir.
            Diştedavim Çerezleri Gizli Bilgilerimi Depolamakta Mıdır?
            Diştedavim, çerezler aracılığıyla kullanıcılarının gizli bilgilerini saklamamaktadır. Çerezler sadece ziyaret geçmişinizle ilgili bilgileri içerir ve bilgisayarınızda veya mobil cihazınızda depolanmış dosyalara erişmez.
        </span>
    }</div>;
}
