import NotFoundComponent from "@/components/notFoundComponent"
import { unstable_setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n";
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Politikamız',
};
{/* just test meta data */}
export default function Page() {
  return (

    <div>

      <strong>1 AMAÇ</strong><br/> 
      Bu politikanın amacı Diş Tedavim için güvenlik amaçlarını ve BGYS taahhüdünü tanımlamaktadır. Güvenlik standartlarını uygunluğun denetlenmesi ve bu standartların gözden geçirilip iyileştirilmesi ile güvenlik yönetimi ile gerekli güvenlik seviyelerinin yakalanması ve sürdürülmesini sağlamış olur. Ayrıca kurumsal bilgi güvenliği yöntemlerinin tanımlanmasını sağlar.<br/><br/> <strong>2 SORUMLULAR</strong><br/> Bu politika firmamızda bulunan tüm bilişim ve buna bağlı bilgi varlıklarını kapsadığı için tüm personel sorumludur. Her bir Diş Tedavim çalışanı yetkisi dahilindeki elektronik bilginin korunmasından sorumludur. Korunması gereken kaynaklar bunlar ile sınırlı olmamakla beraber; şirket ağı, bilgisayarlar, yazılımlar, taşınabilir medya ve bilgilerdir. Bu kaynakların fiziksel ve mantıksal bütünlüğü, izinsiz girişleri, sabotajlara, kötü amaçlı ve dikkatsiz kullanıma karşı korunmalıdır.<br/><br/> <strong>3 UYGULAMA</strong><br/> &nbsp; <strong>3.1 Politika Metni </strong><br/> &nbsp; ✓ Yönetim sistemimizin ISO 27001 standartlarının gereklerini yerine getirecek şekilde dokümanların oluşturulması, belgelendirilmesi ve sürekli iyileştirilmesini,<br/> &nbsp; ✓ Toplam Kalite felsefesini esas alarak ve müşteri memnuniyetini benimseyerek, takım ruhu içerisinde şirket ve birim hedeflerine ulaşılmasını,<br/> &nbsp; ✓ Kendisi ve paydaşlarının bilgi varlıklarına güvenli bir şekilde erişim sağlamayı,<br/> &nbsp; ✓ Bilginin kullanılabilirliğini, bütünlüğünü ve gizliliğini korumayı,<br/> &nbsp; ✓ Kendisinin ve paydaşlarının bilgi varlıkları üzerinde oluşabilecek riskleri değerlendirmeyi ve yönetmeyi<br/> &nbsp; ✓ Bilgi varlıklarına yönelik riskler de göz önünde bulundurularak gerekli alt yapı ve çalışma ortamı oluşturmayı,<br/> &nbsp; ✓ Şartlara uygunluğun idame ettirilmesi için bilgi güvenliği politikası ve uygulanabilirlik bildirgesini periyodik olarak gözden geçirmeyi,<br/> &nbsp; ✓ Kurumun güvenilirliğini ve marka imajını korumayı,<br/> &nbsp; ✓ Bilgi güvenliği ihlali durumunda gerekli görülen yaptırımları uygulamayı,<br/> &nbsp; ✓ Tabi olduğu ulusal, uluslararası veya sektörel düzenlemelerden, ilgili mevzuat ve standart gereklerini yerine getirmekten, anlaşmalardan doğan yükümlülüklerini karşılamaktan, iç ve dış paydaşlara yönelik kurumsal sorumluluklardan kaynaklanan bilgi güvenliği gereksinimleri sağlamayı,<br/> &nbsp; ✓ İş/Hizmet sürekliliğine bilgi güvenliği tehditlerinin etkisini azaltmayı ve işin sürekliliği ve sürdürülebilirliğini sağlamayı,<br/> &nbsp; ✓ Kurulan kontrol altyapısı ile bilgi güvenliği seviyesini korumayı ve iyileştirmeyi,<br/> &nbsp; ✓ Bilgi varlıklarına yönelik risklerin sistematik olarak yönetmeyi, bilgi güvenliği farkındalığını artırmak amacıyla teknik ve davranışsal yetkinlikleri geliştirecek eğitimleri gerçekleştirmeyi,<br/> &nbsp; ✓ Yenilikçi ve yaratıcı yaklaşımların cesaretlendirilmesi, teknik ve davranışsal yetkinlikleri artıracak eğitimlerin gerçekleştirilmesi yönünde faaliyetleri yöneterek, sektöre kalite açısından öncülüğü örnek bir kuruluş olmak için tüm gücüyle çalışmayı,<br/><br/> TAAHHÜT ETMEKTEDİR.<br/><br/> <strong>3.1.1 Yaptırım</strong><br/> &nbsp; Kurumsal Bilgi Güvenlik Politikalarının ihlali durumunda, Bilgi Güvenlik Kurulu ve ilgili yöneticinin onaylarıyla Disiplin Talimatında belirtilen kanunlar ve ilgili maddeleri esas alınarak işlem yapılır.

  </div>

  )
}
