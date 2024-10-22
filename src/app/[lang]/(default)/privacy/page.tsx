/* eslint-disable react/no-unescaped-entities */
import NotFoundComponent from "@/components/notFoundComponent"
import { unstable_setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n";
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Gizlilik',
};
{/* just test meta data */ }
export default function Page() {
  return (
    <div>
      <h2 className="font-medium">GİZLİLİK POLİTİKASI VE KİŞİSEL VERİLER METNİ</h2>
      <small>Güncelleme Tarihi: [26.02.2024]</small>
      <p className="mb-3 mt-3 text-sm">
        Bu Gizlilik Politikası ve Kişisel Veriler Metni (Politika), Diştedavim Teknoloji Hizmetleri Anonim Şirketi (Diştedavim veya Şirket) tarafından Platform aracılığıyla sunulan Hizmetler kapsamında herhangi bir şekilde Kullanıcılar’dan elde edilen ve/veya edilecek verilerin kullanımına ilişkin hüküm ve koşullar ile verilerin işlenme şekilleri hakkında Kullanıcılar’ı aydınlatmak ve bilgilendirmek amacıyla hazırlanmıştır.
      </p>

      <h2 className="font-medium">1. Tanımlar ve Genel Açıklamalar</h2>

      <p className="mb-3 mt-3 text-sm">
        Bu Politika’da: <br />
        Bireysel Kullanıcı; Klinik ve Tedarikçi dışında Platform’a erişim sağlayarak Hizmetler’den yararlanan kişiyi,
        <br />
        Platform: Diştedavim’in sahibi olduğu, www.distedavim.com ve/veya Diştedavim mobil uygulamasını,
        <br />
        Kanun: 6698 sayılı Kişisel Verilerin Korunması Kanunu’nu,
      </p>

      <h2 className="font-medium">Klinik: </h2>
      <p className="mb-3 text-sm">
        Ağız ve Diş Sağlığı Hizmeti Sunulan Özel Sağlık Kuruluşları Hakkında Yönetmelik’in 4. maddesi uyarınca tanımlanan, Platform’a kayıtlı olan sağlık kuruluşlarını,
      </p>

      <h2 className="font-medium">Kullanıcı: </h2>
      <p className="mb-3 text-sm">
        Ayrı ayrı veya birlikte Bireysel Kullanıcı, Klinik ve Tedarikçi’yi,
      </p>

      <h2 className="font-medium">Kullanım Koşulları: </h2>
      <p className="mb-3 text-sm">
        Platform’da bulunan, Kullanıcılar’ın onayladığı ve Platform ve Platform’dan sunulan Hizmetler kapsamında Diştedavim ile Kullanıcı’nın hak ve yükümlülüklerinin belirlendiği Kullanım Koşulları’nı,
      </p>

      <h2 className="font-medium">Politika: </h2>
      <p className="mb-3 text-sm">
        İşbu Gizlilik Politikası ve Kişisel Veriler Metni’ni,
      </p>

      <h2 className="font-medium">Tedarikçi: </h2>
      <p className="mb-3 text-sm">
        Platform üzerinden diğer Kullanıcılara Ürün satışı yapacak olan kişiyi,
      </p>

      <p className="mb-3 text-sm">
        Bu Politika’da büyük harfle kullanılan ve ayrıca burada tanımlanmayan terimler, Kullanım Koşulları’ndaki anlamlarını haiz olacaktır.
      </p>

      <p className="mb-3 text-sm">
        Kişisel veriler, kimliği belirli ya da belirlenebilir gerçek kişiye ilişkin her türlü bilgiyi ifade eder. Bu sebeple, bu metinde yer alan kişisel verilere ilişkin düzenlemeler, ilgili bilgilerin bir gerçek kişiye ait olması durumunda uygulanacaktır. İlgili bilgilerin tüzel kişilere ait olması halinde bu Politika’da yer alan kişisel verilere ilişkin düzenlemeler dışındaki düzenlemeler uygulanır.

      </p>

      <p className="mb-3 text-sm">
        Kişisel veriler, Kanun’da düzenlendiği üzere aşağıda yer alan temel ilkeler doğrultusunda işlenir:
      </p>

      <ul className="list-disc pl-5 mb-3 mt-3 text-sm">
        <li>Hukuka ve dürüstlük kurallarına uygun olma,</li>
        <li>Doğru ve gerektiğinde güncel olma,</li>
        <li>Belirli, açık ve meşru amaçlar için işlenme,</li>
        <li>İşlendikleri amaçla bağlantılı, sınırlı ve ölçülü olma,</li>
        <li>İlgili mevzuatta öngörülen veya işlendikleri amaç için gerekli olan süre kadar muhafaza edilme.</li>
      </ul>

      <p className="mb-3 text-sm">
        Kişisel veriler, kimliği belirli ya da belirlenebilir gerçek kişiye ilişkin her türlü bilgiyi ifade eder. Bu sebeple, bu metinde yer alan kişisel verilere ilişkin düzenlemeler, ilgili bilgilerin bir gerçek kişiye ait olması durumunda uygulanacaktır. İlgili bilgilerin tüzel kişilere ait olması halinde bu Politika’da yer alan kişisel verilere ilişkin düzenlemeler dışındaki düzenlemeler uygulanır.
      </p>

      <h2 className="font-medium">2. Kişisel Verilerin Toplanması, Toplanma Yöntemi ve Hukuki Sebepleri</h2>

      <p className="mb-3 text-sm">
        Diştedavim, Kanun uyarınca kişisel verilerin elde edilmesi sırasında, verisi işlenecek olan ilgili kişileri Kanun’un 10. maddesi uyarınca aydınlatmak/bilgilendirmek ile yükümlüdür. Bu aydınlatma yükümlülüğünün kapsamı, aşağıdaki gibidir:
      </p>

      <ul className="list-disc pl-5 mb-3 mt-3 text-sm">
        <li>Veri sorumlusunun ve varsa temsilcisinin kimliği,  </li>
        <li>Kişisel verilerin hangi amaçla işleneceği,</li>
        <li>İşlenen kişisel verilerin kimlere ve hangi amaçla aktarılabileceği,</li>
        <li>Kişisel veri toplamanın yönetimi ve hukuki sebebi ile</li>
        <li>İlgili kişinin hakları.</li>
      </ul>

      <p className="mb-3 text-sm">
        Diştedavim, bu kapsamda bu Politika ile gerekli aydınlatmaları yapmayı amaçlamaktadır.
      </p>

      <p className="mb-3 text-sm">
        <b>Diştedavim, Klinik tarafından Bireysel Kullanıcılara sunulacak hizmetlere dair herhangi bir sağlık verisi veya bu hizmetin içeriğine ve özelliğine dair kişisel verilere ulaşmaz ve bunları Kanun kapsamında veri sorumlusu sıfatıyla işlemez. </b>
      </p>

      <p className="mb-3 text-sm">
        <b>Bunun yanında, Klinikler’in Kullanıcılar’a hizmetler sunması sırasında, Klinik, bazı Kullanıcı bilgilerini kendisi adına ve hesabına Platform arayüzü aracılığıyla kaydedebilir. Bu kişisel veri ve bilgiler için Klinik, Kanun uyarınca veri sorumlusu sıfatına sahiptir. Diştedavim bu verileri Kanun kapsamında Klinik’in veri işleyeni sıfatıyla; sadece Klinik adına ve hesabına işlemektedir. Bu kişisel verilere dair aydınlatma yükümlülüğü, veri sorumlusu sıfatıyla Klinik’e aittir. Bireysel Kullanıcılar, bu verilere dair her türlü talepleri için doğrudan Klinik’e başvurmalıdır.
        </b>
      </p>

      <p className="mb-3 text-sm">
        <b>Diştedavim’in Klinik’in Kullanıcılar’a hizmet sunması sebebiyle işlediği sağlık verilerine dair herhangi bir veri sorumluluğu sıfatı bulunmamaktadır. </b>
      </p>

      <h2 className="font-medium">3. Kişisel Verilerin Toplanması, Toplanma Yöntemi ve Hukuki Sebepleri</h2>

      <p className="mb-3 text-sm">
        <b>Kullanıcılar’ın Platform’a üye olurken ve/veya Platform’a erişirken veya Hizmetler’i kullanırken Diştedavim’e gönderdiği, paylaştığı ve/veya erişilebilir formda sağladığı veya Platform vasıtasıyla otomatik yollarla toplanan bilgiler kişisel veri kapsamına girebilir. Diştedavim’in sunduğu Hizmetler’den yararlanırsanız veya Platform’a erişim sağlarsanız, sizinle ve çeşitli kaynaklardan Hizmetler’imizi kullanmanızla ilgili aşağıda belirtilmiş olan bilgileri toplarız:</b>
      </p>


      <ul className="list-disc pl-5 mb-3 mt-3 text-sm">
        <li><b>Kimlik ve İletişim bilgileri:</b> Kullanıcılar’ın kimlik bilgileri olarak ad, soyad, T.C. kimlik numarası ve iletişim bilgisi olarak da telefon ve e-posta bilgileri işlenmektedir. </li>
        <li><b>Hizmet bilgileri:</b> Diştedavim, Kullanıcı’nın hangi Hizmetler’den yararlandığını işlemektedir.</li>
        <li><b>Kullanım verileri:</b> Hizmetler’den her yararlandığınızda veya yararlanmaksızın Platform’a erişim sağladığınızda, hakkınızda kullanım verileri toplanır. Platform’u ziyaret ettiğiniz, neleri tıkladığınız, bu eylemleri ne zaman gerçekleştirdiğiniz, vb. veriler buna dâhil olabilir. Ayrıca, günümüzdeki birçok web sitesi gibi ağ sunucularımız da günlük dosyaları tutar; bu dosyalar bir aygıtın onlara her erişiminde veri kaydeder. Günlük dosyaları; kaynak IP adresleri, internet hizmeti sağlayıcıları, sitenizde görüntülenen dosyalar (örn. HTML sayfalar, grafikler, vb.), işletim sistemi sürümleri ve zaman damgaları gibi her bir erişimin mahiyetine ilişkin verileri içerir.</li>

        <li><b>Konum bilgileri:</b>  Diştedavim, Diştedavim altyapısını kullandığınız konuma ilişkin veri toplayabilir.</li>

        <li><b>Aygıt verileri:</b> Platform’a erişmek için kullandığınız aygıt ve uygulamalardan, kullanıcı adı ve şifreniz, IP adresiniz, işletim sistemi sürümünüz, cihaz türünüz, sistem ve performans bilgileriniz ve tarayıcı türünüz gibi veriler toplanır.</li>

        <li><b>Anlık bildirimler:</b> Platform’u kullandığınız takdirde tarafınıza Hizmetler’le ilgili duyurular ve ürün, hizmet, özel teklif ve promosyonlarla ilgili bilgiler göndermek veya uyarıda bulunmak amacıyla Platform üzerinden zaman zaman anlık bildirimler gönderebiliriz.</li>
      </ul>

      <h2 className="font-medium">a. Kişisel Verilerin Toplanma Yöntemleri</h2>

      <p>Diştedavim; Kullanıcılar’ın kişisel verilerini, Platform’un kullanımı, Diştedavim ile olası bir ilişkinin kurulması, bu ilişkinin kurulması adına görüşme ve müzakerelerin yürütülmesi, Diştedavim’in ürün ve hizmetlerinden Kullanıcılar’ın haberdar edilmesi, akdedilecek sözleşmelerin hazırlanması, imzalanması, ilgili kayıtların gerçekleştirilmesi, ifası, teknik destek sağlanması, sözleşmelerin yenilenmesi ve sözleşmelerin sona erdirilmesi gibi aşamalarda elde edebilir. Diştedavim, kişisel verileri, Kullanıcılar’dan; e-posta, posta ve telefon gibi iletişim kanalları aracılığıyla, Platform üzerinden, Platform’da kullanılan çerezler ile işitsel, elektronik veya yazılı olarak toplayabilmektedir.</p>

      <h2 className="font-medium mb-2 mt-2">b. Veri Kategorileri ve Türleri</h2>

      <table className="tg">
        <thead>
          <tr>
            <th className="tg-0lax"> <br />Bireysel Kullanıcı<br /> </th>
            <th className="tg-0lax"> <br />Kimlik Bilgisi </th>
            <th className="tg-0lax"> <br /><span>Ad-soyad, TC kimlik numarası</span> </th>
          </tr>
          <tr>
            <th className="tg-0lax"> <br />İletişim Bilgisi  </th>
            <th className="tg-0lax"> <br /><span>E-posta, telefon numarası</span> </th>
          </tr>
          <tr>
            <th className="tg-0lax"> <br />Müşteri İşlem </th>
            <th className="tg-0lax"> <br /><span>Talep edilen ve alınan hizmet bilgisi, platform üzerinden yapılan yorumlar</span> </th>
          </tr>
          <tr>
            <th className="tg-0lax"> <br />İşlem Güvenliği<br /> <br /> </th>
            <th className="tg-0lax"> <br /><span>Pc/e-posta/sistem ve Platform kullanıcı işlem bilgileri (kullanıcı adı ve parola), internet trafik verileri (ağ hareketleri, IP adresi, ziyaret verileri, zaman ve tarih bilgileri), konum bilgisi, çerezler (cookies) aracılığıyla toplanan veriler</span> </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tg-0lax"> <br />Klinik Çalışanı/Yetkilisi </td>
            <td className="tg-0lax"> <br />Kimlik Bilgisi </td>
            <td className="tg-0lax"> <br /><span>Ad-soyad, TC kimlik numarası</span> </td>
          </tr>
          <tr>
            <td className="tg-0lax"> <br />İletişim Bilgisi  </td>
            <td className="tg-0lax"> <br /><span>E-posta, telefon numarası</span> </td>
          </tr>
          <tr>
            <td className="tg-0lax"> <br />Mesleki Deneyim </td>
            <td className="tg-0lax"> <br /><span>Çalıştığı Klinik bilgisi, unvan, konuştuğu diller</span> </td>
          </tr>
          <tr>
            <td className="tg-0lax"> <br />Müşteri İşlem </td>
            <td className="tg-0lax"> <br /><span>Sunulan ve alınan hizmet bilgisi</span> </td>
          </tr>
          <tr>
            <td className="tg-0lax"> <br />İşlem Güvenliği<br /> <br /> </td>
            <td className="tg-0lax"> <br /><span>Pc/e-posta/sistem ve Platform kullanıcı işlem bilgileri (kullanıcı adı ve parola), internet trafik verileri (ağ hareketleri, IP adresi, ziyaret verileri, zaman ve tarih bilgileri), konum bilgisi, çerezler (cookies) aracılığıyla toplanan veriler</span> </td>
          </tr>
          <tr>
            <td className="tg-0lax"> <br />Görsel ve İşitsel Kayıtlar </td>
            <td className="tg-0lax"> <br /><span>Fotoğraf</span> </td>
          </tr>
        </tbody>
      </table>

      <table className="tg">
        <thead>
          <tr>
            <th className="tg-0pky"> <br />Bireysel Kullanıcı<br /> <br /><br /><br /> <br /> </th>
            <th className="tg-0pky"> <br />Kimlik Bilgisi </th>
            <th className="tg-0pky"> <br /><span>Ad-soyad, TC kimlik numarası</span> </th>
          </tr>
          <tr>
            <th className="tg-0pky"> <br />İletişim Bilgisi  </th>
            <th className="tg-0pky"> <br /><span>E-posta, telefon numarası</span> </th>
          </tr>
          <tr>
            <th className="tg-0pky"> <br />Müşteri İşlem </th>
            <th className="tg-0pky"> <br /><span>Talep edilen ve alınan hizmet bilgisi, platform üzerinden yapılan yorumlar</span> </th>
          </tr>
          <tr>
            <th className="tg-0pky"> <br />İşlem Güvenliği<br /> <br /> </th>
            <th className="tg-0pky"> <br /><span>Pc/e-posta/sistem ve Platform kullanıcı işlem bilgileri (kullanıcı adı ve parola), internet trafik verileri (ağ hareketleri, IP adresi, ziyaret verileri, zaman ve tarih bilgileri), konum bilgisi, çerezler (cookies) aracılığıyla toplanan veriler</span> </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tg-0pky"> <br />Klinik Çalışanı/Yetkilisi </td>
            <td className="tg-0pky"> <br />Kimlik Bilgisi </td>
            <td className="tg-0pky"> <br /><span>Ad-soyad, TC kimlik numarası</span> </td>
          </tr>
          <tr>
            <td className="tg-0pky"> <br />İletişim Bilgisi  </td>
            <td className="tg-0pky"> <br /><span>E-posta, telefon numarası</span> </td>
          </tr>
          <tr>
            <td className="tg-0pky"> <br />Mesleki Deneyim </td>
            <td className="tg-0pky"> <br /><span>Çalıştığı Klinik bilgisi, unvan, konuştuğu diller</span> </td>
          </tr>
          <tr>
            <td className="tg-0pky"> <br />Müşteri İşlem </td>
            <td className="tg-0pky"> <br /><span>Sunulan ve alınan hizmet bilgisi</span> </td>
          </tr>
          <tr>
            <td className="tg-0pky"> <br />İşlem Güvenliği<br /> <br /> </td>
            <td className="tg-0pky"> <br /><span>Pc/e-posta/sistem ve Platform kullanıcı işlem bilgileri (kullanıcı adı ve parola), internet trafik verileri (ağ hareketleri, IP adresi, ziyaret verileri, zaman ve tarih bilgileri), konum bilgisi, çerezler (cookies) aracılığıyla toplanan veriler</span> </td>
          </tr>
          <tr>
            <td className="tg-0pky"> <br />Görsel ve İşitsel Kayıtlar </td>
            <td className="tg-0pky"> <br /><span>Fotoğraf</span> </td>
          </tr>
        </tbody>
      </table>

      <h2 className="font-medium mb-2 mt-3">c. Hukuki Sebepler</h2>

      <p>Kişisel verileriniz, bu verileri Diştedavim’e açıklamanıza konu olan ve her bir veri kategorisi açısından aşağıda sıralanan amaçlarla işlenebilecektir: </p>

      <table className="tg">
        <thead>
          <tr>
            <th className="tg-0pky"> <br />Bireysel Kullanıcı<br /> <br /><br /><br /> <br />Klinik Çalışanı/Yetkilisi<br /> <br /><br /><br /> <br />Tedarikçi Çalışanı/Yetkilisi </th>
            <th className="tg-0pky"> <br />Kimlik Bilgisi<br /> <br /><br /><br /> <br />İletişim Bilgisi<br /> <br /><br /><br /> <br /> </th>
            <th className="tg-0pky"> <br /> <br /><span>Sizlerle bir sözleşme ilişkisi kurmamız veya bu sözleşmeden kaynaklanan ifa yükümlülüğümüz ile doğrudan doğruya ilgili olması kaydıyla, sizlere ait kişisel verilerin işlenmesinin gerekli olması</span><br /> <br /><span>Sizlere bir hak tesis etmemiz, bu hakkı kullandırmamız ve korumamız için veri işlemek zorunda oluşumuz</span><br /> <br /><span>Temel hak ve özgürlüklerinize zarar vermemek kaydıyla, meşru menfaatlerimiz için veri işlenmesinin zorunlu olması</span>&nbsp;&nbsp;</th>
          </tr>
          <tr>
            <th className="tg-0pky"> <br />İşlem Güvenliği </th>
            <th className="tg-0pky"> <br /> <br /><span>Kanunlarda kişisel verilerinizi işlediğimiz sürecin açıkça öngörülmesi</span><br /> <br /><span>Hukuki yükümlülüğümüzü yerine getirebilmek için zorunlu olan durumlar</span><br /> <br /><span>Temel hak ve özgürlüklerinize zarar vermemek kaydıyla, meşru menfaatlerimiz için veri işlenmesinin zorunlu olması</span>&nbsp;&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tg-0pky"> <br />Bireysel Kullanıcı<br /> <br /><br /><br /> <br />Klinik Çalışanı/Yetkilisi<br /> <br /><br /><br /> <br />Tedarikçi Çalışanı/Yetkilisi </td>
            <td className="tg-0pky"> <br />Müşteri İşlem </td>
            <td className="tg-0pky"> <br /> <br /><span>Sizlerle bir sözleşme ilişkisi kurmamız veya bu sözleşmeden kaynaklanan ifa yükümlülüğümüz ile doğrudan doğruya ilgili olması kaydıyla, sizlere ait kişisel verilerin işlenmesinin gerekli olması</span><br /> <br /><span>Sizlere bir hak tesis etmemiz, bu hakkı kullandırmamız ve korumamız için veri işlemek zorunda oluşumuz</span> <br /> <br /> </td>
          </tr>
          <tr>
            <td className="tg-0pky"> <br />Klinik Çalışanı/Yetkilisi<br /> <br /><br /><br /> <br />Tedarikçi Çalışanı/Yetkilisi </td>
            <td className="tg-0pky"> <br />Mesleki Deneyim </td>
            <td className="tg-0pky"> <br /> <br /><span>Sizlerle bir sözleşme ilişkisi kurmamız veya bu sözleşmeden kaynaklanan ifa yükümlülüğümüz ile doğrudan doğruya ilgili olması kaydıyla, sizlere ait kişisel verilerin işlenmesinin gerekli olması</span><br /> <br /><span>Sizlere bir hak tesis etmemiz, bu hakkı kullandırmamız ve korumamız için veri işlemek zorunda oluşumuz</span><br /> <br /><span>Temel hak ve özgürlüklerinize zarar vermemek kaydıyla, meşru menfaatlerimiz için veri işlenmesinin zorunlu olması</span>&nbsp;&nbsp;</td>
          </tr>
          <tr>
            <td className="tg-0pky"> <br />Klinik Çalışanı/Yetkilisi </td>
            <td className="tg-0pky"> <br />Görsel ve İşitsel Kayıtlar </td>
            <td className="tg-0pky"> <br /> <br /><span>İlgili kişi tarafından alenileştirilmesi</span>&nbsp;&nbsp;</td>
          </tr>
        </tbody>
      </table>

      <h2 className="font-medium mb-2 mt-5">4. Kişisel Verilerin Hangi Amaçla İşleneceği </h2>
      <p className="mb-3">Bu metin kapsamında Kullanıcılar’ın kişisel verileri, yukarıdaki genel şartlara uygun şekilde aşağıdaki amaçlarla işlenmektedir:
      </p>

      <table className="tg">
        <thead>
          <tr>
            <th className="tg-0pky"> <br />Bireysel Kullanıcı<br /> <br /><br /><br /> <br />Klinik Çalışanı/Yetkilisi<br /> <br /><br /><br /> <br />Tedarikçi Çalışanı/Yetkilisi<br /> <br /> </th>
            <th className="tg-0pky"> <br /> <br /><span>Faaliyetlerin mevzuata uygun yürütülmesi</span><br /> <br /><span>Firma / ürün / hizmetlere bağlılık süreçlerinin yürütülmesi</span><br /> <br /><span>İletişim faaliyetlerinin yürütülmesi</span><br /> <br /><span>İş faaliyetlerinin yürütülmesi / denetimi</span><br /> <br /><span>Mal / hizmet satış sonrası destek hizmetlerinin yürütülmesi</span><br /> <br /><span>Mal / hizmet satış süreçlerinin yürütülmesi</span><br /> <br /><span>Müşteri ilişkileri yönetimi süreçlerinin yürütülmesi</span><br /> <br /><span>Reklam/kampanya/promosyon süreçlerinin yürütülmesi</span><br /> <br /><span>Saklama ve arşiv faaliyetlerinin yürütülmesi</span><br /> <br /><span>Sözleşme süreçlerinin yürütülmesi</span><br /> <br /><span>Talep / Şikâyetlerin Takibi</span>&nbsp;&nbsp;</th>
          </tr>
          <tr>
            <th className="tg-0pky"> <br />İşlem Güvenliği </th>
            <th className="tg-0pky"> <br /> <br /><span>Bilgi güvenliği süreçlerinin yürütülmesi</span><br /> <br /><span>Faaliyetlerin mevzuata uygun yürütülmesi</span><br /> <br /><span>Denetim/etik faaliyetlerinin yürütülmesi</span><br /> <br /><span>Erişim yetkilerinin yürütülmesi</span> <br /> <br /><span>İş faaliyetlerinin yürütülmesi/ denetimi</span><br /> <br /><span>İş sürekliliğinin sağlanması faaliyetlerinin yürütülmesi</span><br /> <br /><span>Yetkili kişi, kurum ve kuruluşlara bilgi verilmesi</span>&nbsp;&nbsp;</th>
          </tr>
          <tr>
            <th className="tg-0pky"> <br />Müşteri İşlem </th>
            <th className="tg-0pky"> <br /> <br /><span>Faaliyetlerin mevzuata uygun yürütülmesi</span><br /> <br /><span>İş faaliyetlerinin yürütülmesi / denetimi</span><br /> <br /><span>Mal / hizmet satış sonrası destek hizmetlerinin yürütülmesi</span><br /> <br /><span>Mal / hizmet satış süreçlerinin yürütülmesi</span><br /> <br /><span>Müşteri memnuniyetine yönelik aktivitelerin yürütülmesi</span><br /> <br /><span>Sözleşme süreçlerinin yürütülmesi</span>&nbsp;&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tg-0pky"> <br />Klinik Çalışanı/Yetkilisi<br /> <br /><br /><br /> <br />Tedarikçi Çalışanı/Yetkilisi </td>
            <td className="tg-0pky"> <br /> <br /><span>Faaliyetlerin mevzuata uygun yürütülmesi</span><br /> <br /><span>İş faaliyetlerinin yürütülmesi / denetimi</span><br /> <br /><span>Mal / hizmet satış sonrası destek hizmetlerinin yürütülmesi</span><br /> <br /><span>Mal / hizmet satış süreçlerinin yürütülmesi</span><br /> <br /><span>Müşteri ilişkileri yönetimi süreçlerinin yürütülmesi</span><br /> <br /><span>Müşteri memnuniyetine yönelik aktivitelerin yürütülmesi</span><br /> <br /><span>Reklam/kampanya/promosyon süreçlerinin yürütülmesi</span><br /> <br /><span>Saklama ve arşiv faaliyetlerinin yürütülmesi</span><br /> <br /><span>Sözleşme süreçlerinin yürütülmesi</span><br /> <br /><span>Talep / Şikâyetlerin Takibi</span><br /> <br /><span>Yetkili kişi, kurum ve kuruluşlara bilgi verilmesi</span>&nbsp;&nbsp;</td>
          </tr>
          <tr>
            <td className="tg-0pky"> <br />Klinik Çalışanı/Yetkilisi<br /> <br /> Görsel ve İşitsel Kayıtlar </td>
            <td className="tg-0pky"> <br /> <br /><span>İş faaliyetlerinin yürütülmesi / denetimi</span><br /> <br /><span>Sözleşme süreçlerinin yürütülmesi</span>&nbsp;&nbsp;</td>
          </tr>
        </tbody>
      </table>

      <p className="mt-3">Diştedavim, bilgilerinizi saklama konusunda azami özeni göstererek kişisel verilerin hukuka aykırı olarak işlenmesini ve bunlara erişilmesini önlemek, kişisel verilerin muhafazasını sağlamak amacıyla uygun güvenlik düzeyini temin etmeye yönelik gerekli her türlü teknik ve idari tedbiri almakla yükümlüdür. Diştedavim, kişisel verilerinizin hukuka aykırı olarak işlenmemesini ve muhafazasını ve kişisel verilerinize hukuka aykırı olarak erişilmemesini sağlamak için azami çabayı harcayacaktır. Platform’u her ziyaret ettiğinizde, IP adresiniz, işletim sisteminiz, bağlantı zamanı ve süre bilgileriniz ve benzeri bilgiler otomatik olarak kaydedilmekte olup; izniniz gerekmeksizin elde edilen bu bilgilerinizin anonim olarak kullanılması mümkündür. </p>


      <p>Diştedavim’in topladığı bilgiler, Diştedavim’in sizlere hizmet sunabilmek, hizmetleri optimize etmek, geliştirmek ve veri tabanını zenginleştirerek bu veri tabanı sayesinde Platform’a erişim sağlayan kişilere sunulan hizmeti iyileştirmek için çeşitli şekillerde toplu halde kullanılabilir. Diştedavim bu bilgileri internet sitesi yönetimi, güvenlik, araştırma ve analiz için kullanabilir.</p>

      <h2 className="font-medium mb-2 mt-2">5. Üçüncü Taraf Web Siteleri ve Uygulamalar</h2>

      <p>Platform; Diştedavim tarafından bilinmeyen, içeriği kontrol edilmeyen başka web sitelerine yönlendiren bağlantılar içerebilir. Bağlantı sağlanan bu web siteleri, Diştedavim’e ait metinlerden farklı koşullar, hükümler içerebilir. Bu web sitelerinin işleyebileceği bilgilerin kullanımı veya ifşa edilmesinden Diştedavim sorumlu tutulamaz. Aynı şekilde, başka sitelerden Diştedavim’e ait olan Platform’a link sağlandığında Diştedavim’in herhangi bir sorumluluğu olmayacaktır.</p>


      <h2 className="font-medium mb-2 mt-2">7. Kişisel Verilerinizin Aktarılması</h2>
      <p>Diştedavim işlediği kişisel verileri ilgili mevzuatta öngörülen veya işleme amacının gerektirdiği süreler boyunca ilgili mevzuat ile uyumlu olarak muhafaza eder. Diştedavim, kişisel verilerin gizliliği, bütünlüğü ve güvenliğinin sağlanması için gerekli teknik ve idari her türlü tedbiri almayı ve gerekli özeni göstermeyi taahhüt etmektedir. Bu kapsamda, kişisel verilerin hukuka aykırı olarak işlenmesini, verilere yetkisiz erişimi, verilerin hukuka aykırı olarak ifşa edilmesini, değiştirilmesini veya imha edilmesini engellemek için gerekli önlemleri alır. Bu doğrultuda Diştedavim; işlediği kişisel verilere ilişkin olarak aşağıdaki teknik ve idari tedbirleri almaktadır:</p>


      <p className="mt-3"><b>Anti-virüs uygulaması.</b> Diştedavim’in bilgi teknolojileri altyapısında bulunan tüm bilgisayar ve sunucularda periyodik olarak güncellenen anti-virüs uygulaması yüklüdür.
      </p>

      <p className="mt-3"><b>Firewall.</b> Diştedavim sunucularını barındıran veri merkezi ve felaket kurtarma merkezleri periyodik olarak güncellenen yazılım yüklü firewalllarca korunmakta olup; ilgili yeni nesil firewalllar tüm personellerin internet bağlantılarını kontrol etmekte ve bu kontrol sırasında virüs ve benzeri tehditlere karşı koruma sağlamaktadır.
      </p>

      <p className="mt-3"><b>Kullanıcı tanımlamaları.</b> Diştedavim çalışanlarının Diştedavim sistemlerine olan yetkileri sadece iş tanımları ile gerekli olduğu ölçüde sınırlandırılmış olup; herhangi bir yetki ve görev değişikliği söz konusu olması durumunda sistemsel yetkileri de güncellenmektedir.
      </p>

      <p className="mt-3"><b>Sızma testi.</b> Periyodik olarak Diştedavim sistemindeki sunuculara sızma testi yapılmaktadır. Bu test sonucunda oluşan güvenlik açıkları kapatılarak, ilgili güvenlik açıklarının kapatıldığına dair doğrulama testi yapılmaktadır.
      </p>

      <p className="mt-3"><b>Eğitim.</b>Diştedavim çalışanlarının çeşitli bilgi güvenliği ihlallerine karşı farkındalıklarını artırmak ve bilgi ihlali olaylarında insan faktörünün etkisini en aza indirmek için çalışanlara düzenli periyotlarla eğitim verilmektedir.
      </p>

      <p className="mt-3"><b>Fiziksel veri güvenliği.</b>Kâğıt ortamdaki kişisel verilerin mutlaka kilitli dolaplarda muhafaza edilmesini ve sadece yetkili kişiler tarafından erişilmesini sağlar.
      </p>

      <p className="mt-3"><b>Yedekleme.</b>Diştedavim periyodik olarak sakladığı verilerin yedeklenmesini sağlar. Yedekleme mekanizması olarak ilgili mevzuat ve bu Politika hükümlerine uygun olmak kaydıyla, bulut alt yapı sağlayıcılarının sağladığı yedekleme imkânlarını kullanmasının yanında gerekli gördüğü durumlarda kendi geliştirdiği yedekleme çözümlerini de kullanır.
      </p>

      <p className="mt-3">Diştedavim’in gerekli bilgi güvenliği önlemlerini almasına karşın, Platform’a veya Diştedavim sistemine yapılan saldırılar sonucunda kişisel verilerin zarar görmesi veya yetkisiz üçüncü kişilerin eline geçmesi durumunda, Diştedavim bu durumu derhal Kullanıcılar’a ve gerekmesi halinde ilgili veri koruma otoritesine bildirir ve gerekli önlemleri alır.</p>

      <h2 className="font-medium mb-2 mt-4">7. Kişisel Verilerinizin Aktarılması</h2>

      <p>Toplanan kişisel verileriniz, bu verilerin depolanması veya bu metinde yer alan hukuka uygun amaçlarla, yurt içindeki sunuculara aktarılabilir, işleme alınabilir ve depolanabilir.</p>

      <p>Diştedavim, kişisel verilerinizi, hukuki yükümlülüklerini göz önünde tutarak, hizmetleri sağlayan şirketler ile paylaşabilir (bilgi işlem merkezleri, tarafınızla Diştedavim arasında akdedilen sözleşmeler kapsamında hizmet tedarik ettiği üçüncü kişi iş ortakları veya müşteri hizmetleri merkezleri gibi). Bu servis sağlayıcılar bu bilgileri korumakla yükümlüdürler.</p>

      <p>Diştedavim’in yasalar karşısındaki yükümlülüklerini ifa etmesi amacıyla (suçun önlenmesi, suç gelirlerinin aklanması ve terörün finansmanın önlenmesi, suçla mücadele ve devlet ve kamu güvenliğinin tehdidi benzeri bilgi verme yükümlülüğünün mevcut olduğu durumlarda) kişisel verileri talep etmeye yetkili olan kamu kurum ve kuruluşları ile kişisel verileriniz paylaşılabilir.</p>

      <p className="mb-4">Ayrıntılı olarak kişisel verilerinizin kimlerle ve hangi amaçlarla paylaşılabileceği aşağıda belirtilmiştir:</p>

      <table className="tg">
        <thead>
          <tr>
            <th className="tg-0pky"> <br />Kullanıcılar<br /> <br /> </th>
            <th className="tg-0pky"> <br />Kimlik<br /> <br /><br /><br /> <br />İletişim<br /> <br /><br /><br /> <br />Müşteri İşlem<br /> <br /><br /><br /> <br />Mesleki Deneyim<br /> <br /><br /><br /> <br />Görsel ve İşitsel Kayıtlar<br /> <br /> </th>
            <th className="tg-0pky"> <br /> <br /><span>Saklama ve arşiv faaliyetlerinin yürütülmesi amacıyla, bilişim altyapımızı sağlayan yurt içindeki tedarikçilerimizle,</span><br /> <br /><span>İletişim faaliyetleri ve pazarlama süreçlerinin yürütülmesi amacıyla, hizmet aldığımız toplu gönderim sağlayıcılarıyla,</span><br /> <br /><span>Hukuki yükümlülüğümüzün yerine getirilmesi amacıyla yetkili kamu kurum ve kuruluşlarıyla.</span>&nbsp;&nbsp;</th>
          </tr>
          <tr>
            <th className="tg-0pky"> <br />İşlem Güvenliği </th>
            <th className="tg-0pky"> <br /> <br /><span>Saklama ve arşiv faaliyetlerinin yürütülmesi amacıyla, bilişim altyapımızı sağlayan yurt içindeki tedarikçilerimizle,</span><br /> <br /><span>Hukuki yükümlülüğümüzün yerine getirilmesi amacıyla yetkili kamu kurum ve kuruluşlarıyla.</span>&nbsp;&nbsp;</th>
          </tr>
        </thead>
      </table>


      <h2 className="font-medium mb-2 mt-2">8. Çerezler</h2>

      <p className="mb-2">Çerezler, sürekli Kullanıcılar’ı tanımamız için Hizmetler’e erişirken kullandığınız cihazda sakladığımız küçük veri dosyalarıdır. Kullanma nedenimize bağlı olarak tüm çerezlerin süresi belirli bir zaman sonra sona erer. Çerezler birkaç nedenle kullanılır:
      </p>

      <ul className="list-disc pl-5 mb-3 mt-3 text-sm">
        <li>Platform’un daha kolay kullanılmasını sağlamak için: Hesabınıza girişi hızlandırmak için “Beni hatırla” özelliğini kullanırsanız, kullanıcı adınızı bir çerez içinde depolayabiliriz.</li>
        <li>Güvenlik sebepleri: Çerezleri, kimliğinizi doğrulamak (veya örneğin oturumunuzun Platform’da hala açık olup olmadığını anlamak) için kullanırız.</li>
        <li>Sizlere kişiselleştirilmiş içerik sunmak için: Görüntülediğiniz içeriği kişiselleştirmek için varsayılan dil gibi kullanıcı tercihlerini çerezlerde depolayabiliriz.</li>
        <li>Hizmetlerimizi geliştirmek için: Platform’un sizin tarafınızdan kullanımını ölçmek, yönlendirme verilerini takip etmek ve bazen de size farklı içerik versiyonları göstermek için çerezler kullanırız. Bu bilgiler, servislerimizi geliştirip iyileştirmemize ve Kullanıcılar’a gösterdiğimiz içeriği en iyi hale getirmemize yardımcı olur.</li>

      </ul>

      <h2 className="font-medium mb-2 mt-2">KULLANIM BAKIMINDAN ÇEREZ TÜRLERİ</h2>

      <p><b>Kullanılması Zorunlu Olan Çerezler:</b> Bu Çerezler, Platform’un düzgün şekilde çalışması için mutlaka gerekli olan çerezlerdir. Bu çerezlere, sistemin yönetilebilmesi, sahte işlemlerin önlenmesi için ihtiyaç duyulur ve engellenmesi halinde Platform düzgün çalışamaz.
      </p>

      <p><b>Analiz/Performans Çerezleri:</b> Bu Çerezler, Platform’un işleyişini analiz edip anlamamızı sağlayan ve sizinle etkileşime geçerek Platform’u geliştirmemizi sağlar. Bu çerezlerin kullanımı engellenebilir.
      </p>

      <p><b>İşlev Çerezleri:</b> Bu çerezler size daha kolay ve gelişmiş bir kullanıcı deneyimi yaşatmak için kullanılan çerezlerdir. Önceki tercihlerinizi hatırlamak, Platform üzerinde yer alan bazı içeriklere rahatça erişmenizi sağlamak gibi işlevler yerine getirir. Bu çerezlerin kullanımı engellenebilir.
      </p>

      <h2 className="font-medium mb-2 mt-2">SAKLANDIĞI SÜRE BAKIMINDAN ÇEREZ TÜRLERİ:</h2>

      <p><b>Kalıcı Çerezler (Persistent Cookies):</b> Kişinin bilgisayarında ve akıllı mobil cihazında kişi tarafından silinene veya belirli bir tarihe varlığını sürdüren çerezlerdir. Bu çerezler, çoğunlukla Kullanıcılar’ın tercihlerini ve site hareketlerini ölçmek amacıyla kullanılır.
      </p>

      <p><b>Oturum Çerezleri (Session Cookies):</b> Bu çerezler Kullanıcı’nın ziyaretini oturumlara ayırmak için kullanılır ve Kullanıcı’dan veri toplamaz. Bu çerezler, Kullanıcı ziyaret ettiği Platform’da belirli bir süre pasif kaldığında veya Platform’u kapattığında silinir. Platform’da üçüncü kişilerin hizmet sağlaması için ve bu hizmetlerin etkinliğini artırmak için hedef ve izleme çerezleri kullanılır. Bu çerezler, ziyaret ettiğiniz web sayfalarını ve siteleri hatırlayabilir ve başta Kullanıcı’nın cihazının IP adresi olmak üzere kişisel verileri toplayabilir. Platform, bilgi toplamak, demografik verileri ve ilgi alanlarınızı hatırlamak, size hedeflenmiş reklamları sunmak, reklam gösterimleri ve ziyaret edilme sayısını belirlemek gibi durumlar için hem birinci taraf hem de üçüncü taraf çerezlerini kullanmaktadır. Platform’u ziyaret ettiğinizde ve bu eklentileri kullandığınızda, Platform doğrudan seçilen sosyal ağın sunucusuna bağlanır. Ardından, eklentinin sunduğu içerik doğrudan sosyal ağlardan web tarayıcınıza iletilir ve ziyaret etmekte olduğun web sitesine eklenir. Böylelikle ilgili sosyal ağ size ait verilere ulaşarak işleyebilir ve ilgili sosyal ağdaki hesabınıza ait verilerle birleştirebilir.
      </p>

      <p>Diştedavim’in sosyal ağların eklentiler aracılığıyla işlediği veriler üzerinde herhangi bir kontrolü yoktur. Sosyal ağların kişisel verilerinizi hangi amaçla, yöntemlerle ve süreyle işleyeceğine ilişkin daha fazla bilgi almak için ilgili sosyal ağlar tarafından yayınlanan kişisel veri politikaları dikkatlice incelenmelidir. </p>

      <p>Kullandığınız İnternet tarayıcısı genellikle Çerezler kabul edilmiş şekilde açılmaktadır. Ancak dilediğiniz an bu ayarları değiştirebilir ve Çerezleri devre dışı bırakabilirsiniz. Eğer Çerezleri devre dışı bırakmaya karar verirseniz; yukarıda açıklandığı üzere Platform’da sunduğumuz hizmetlerden işlevsel olarak faydalanamayabilirsiniz. İnternet tarayıcılarının Çerez ayarlarıyla ilgili detaylı bilgi için aşağıdaki linkleri inceleyebilirsiniz:</p>

      <ul className="list-disc pl-5 mb-3 mt-3 text-sm">
        <li>Internet Explorer: <a className="text-[#007aff]" rel="noopener noreferrer"
          target="_blank" href="https://support.microsoft.com/tr-tr/help/17442/windows-internet-explorer-delete-manage-cookies">https://support.microsoft.com/tr-tr/help/17442/windows-internet-explorer-delete-manage-cookies</a></li>

        <li>Safari: <a className="text-[#007aff]" rel="noopener noreferrer"
          target="_blank" href="https://support.apple.com/en-us/HT201265">https://support.apple.com/en-us/HT201265</a></li>

        <li>Chrome: <a className="text-[#007aff]" rel="noopener noreferrer"
          target="_blank" href="https://support.google.com/chrome/answer/95647?hl=en
       ">https://support.google.com/chrome/answer/95647?hl=en
        </a></li>

        <li>Firefox: <a className="text-[#007aff]" rel="noopener noreferrer"
          target="_blank" href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences
       ">https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences
        </a></li>

        <li>Opera: <a className="text-[#007aff]" rel="noopener noreferrer"
          target="_blank" href="http://help.opera.com/Windows/10.20/en/cookies.html
       ">http://help.opera.com/Windows/10.20/en/cookies.html
        </a></li>

      </ul>

      <p>Unutulmamalıdır ki, eğer çerezlerin devre dışı bırakılması için gerekli tarayıcı ve/veya e-mail ayarlarınızı yapmazsanız, çerezlerin tarafımızca kullanılması için onay vermiş sayılacaksınız.
      </p>

      <h2 className="font-medium mb-2 mt-2">9. İlgili Kişi Olarak Haklarınız</h2>
      <p>Diştedavim veri sorumlusu olarak, Politika’yı ilgili mevzuata uygun olmak ve kişisel verilerin daha iyi korunması şartı ile değiştirme hakkına sahiptir.
      </p>
      <p>Bu Politika, dijital platformlara yeni özellikler eklendikçe veya Kullanıcılar’dan yeni öneriler geldikçe yeniden düzenlenebilir ve güncellenebilir. Ancak bu durumda değişiklikleri Platform’da yayımlayarak sizi bilgilendiririz. Söz konusu değişiklikleri, bazı önemli durumlarda, e-posta ile veya sizi haberdar etmek üzere makul şekilde tasarlanmış dikkat çekici başka bir yöntemle, duruma uygun olarak ek bildirimler ile bildirebiliriz. Bu değişikliklere ilişkin bilgilendirilmeniz üzerine, Platform’a erişim sağlamaya ve bildirim döneminden sonra da Diştedavim’in sunduğu Hizmetler’den yararlanmaya veya yararlanmaksızın Platform’a erişim sağlamaya devam ederseniz, Politika’daki değişikliklere izin vermiş sayılacaksınız. Bu Politika’nın ya da güncellenmiş bir gizlilik politikasının ve kişisel veriler metninin şartlarını kabul etmemeniz halinde (eğer varsa) üyelik hesabınızı istediğiniz zaman kapatabilme ya da anketlere cevap vermeme hakkınız saklıdır. Bu nedenle, Platform’a her erişim sağladığınızda Politika&apos;yı yeniden gözden geçirmenizi öneririz. Bu belge en son [26.02.2024] tarihinde güncellenmiştir. Politika hükümleri değiştiği takdirde, yayımlandığı tarihte yürürlük kazanır.
      </p>

      <h2 className="font-medium mb-2 mt-2">10. İlgili Kişi Olarak Haklarınız</h2>
      <p>Kişisel veri sahipleri olarak, haklarınıza ilişkin taleplerinizi belirtmek ve kişisel verileriniz üzerindeki haklarınızı kullanmak amacıyla Diştedavim’in resmi e-mail adresi <a href="mail:info@distedavim.com">info@distedavim.com</a> ve resmi telefon hattı olan 02167062122 numarası üzerinden veya Diştedavim’in <b>Atatürk Mah. Ertuğrul Gazi Sk. Metropol Istanbul Sitesi C1 Blok No: 2b İç Kapı No: 135 Ataşehir / İstanbul</b> adresine gerekli değişiklik, güncelleme ve/veya silme gibi işlemleri ve ilgili talepleri aşağıdaki bilgiler ile gerçekleştirebilirsiniz.
      </p>

      <ul className="list-disc pl-5 mb-3 mt-3 text-sm">
        <li>Başvuru sahibinin adı soyadı,</li>
        <li>Başvuru sahibi Türkiye Cumhuriyeti vatandaşı ise TC Kimlik Numarası, değil ise uyruğu ile birlikte pasaport numarası veya var ise kimlik numarası,</li>
        <li>Başvuru sahibinin tebligata esas yerleşim yeri veya iş yeri adresi,</li>
        <li>Başvuru sahibinin bildirime esas elektronik posta adresi, telefon veya faks numarası,</li>
        <li>Talep konusu,</li>
        <li>Talep konusuna istinaden bilgi ve belgeler,</li>
        <li>Başvuru yöntemleri ve</li>
        <li>Başvuru yazılı ise imza.</li>
      </ul>

      <p>Belirtilen yöntemlerle taleplerinizi bize iletmeniz durumunda Diştedavim, talebinizin niteliğine göre talebi en kısa sürede ve en geç otuz gün içinde ücretsiz olarak sonuçlandıracaktır. Ancak, işlemin ayrıca bir maliyeti gerektirmesi hâlinde, Diştedavim tarafından ilgili mevzuat uyarınca talep edilebilecek ücret alınacaktır. </p>

      <p>Kişisel verilerin korunmasına ilişkin mevzuat kapsamında kişisel veri sahipleri aşağıdaki haklara sahiptir:</p>

      <p>a. Kişisel veri işlenip işlenmediğini öğrenme,</p>
      <p>b. Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,</p>
      <p>c. Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</p>
      <p>d. Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,</p>
      <p>e. Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,</p>
      <p>e. Kanun’un 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme,</p>
      <p>g. (e) ve (f) bentleri uyarınca yapılan işlemlerin, kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,</p>
      <p>h. İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme,</p>
      <p>i. Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme.</p>
      <p>Kişisel veri sahibi olarak sahip olduğunuz ve yukarıda belirtilen haklarınızı kullanmak için yapacağınız ve kullanmayı talep ettiğiniz hakka ilişkin açıklamalarınızı içeren başvuruda; talep ettiğiniz hususun açık ve anlaşılır olması, talep ettiğiniz konunun şahsınız ile ilgili olması veya başkası adına hareket ediyor iseniz bu konuda özel olarak yetkili olmanız ve yetkinizi belgelendirilmesi, başvurunun kimlik ve adres bilgilerini içermesi ve başvuruya kimliğinizi tevsik edici belgelerin eklenmesi gerekmektedir.</p>
      <p>Bizim veya verilerinizi ilettiğimiz bir kişinin haklarınızı ihlal ettiğine inanıyorsanız, ülkenizdeki veri koruma otoritesine ve diğer yetkili denetim makamlarına şikâyette bulunabilirsiniz.</p>

      <p>Şirket Unvanı: <b>Diştedavim Teknoloji Hizmetleri Anonim Şirketi</b></p>
      <p>Adres: <b>Atatürk Mah. Ertuğrul Gazi Sk. Metropol Istanbul Sitesi C1 Blok No: 2b İç Kapı No: 135 Ataşehir / İstanbul</b></p>
      <p>E-posta: <b>info@distedavim.com</b></p>
      <p>Tel: <b>02167062122</b></p>

    </div>

  )
}
