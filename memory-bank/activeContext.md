# Aktif Bağlam: MediMind MVP Geliştirme

## 1. Şu Anda Odaklanılan Konular (Son Güncelleme: [Bugünün Tarihi])

*   **Memory Bank Kurulumu:** Projenin temel dokümantasyon yapısı olan `memory-bank` klasörü ve içindeki ana dosyalar (`projectbrief.md`, `productContext.md`, `activeContext.md`, `systemPatterns.md`, `techContext.md`, `progress.md`) oluşturuluyor.
*   **MVP Teknolojilerinin Belirlenmesi:**
    *   Platform: Web Uygulaması
    *   Frontend Framework: Next.js
    *   Yapay Zeka Entegrasyonu: OpenAI API
    *   Veritabanı (BaaS): Firebase (Karar verildi)
*   **İlk Adım Planlaması:** Next.js proje kurulumu ve Firebase entegrasyonu.

## 2. Son Yapılan Değişiklikler ve Alınan Kararlar

*   Proje için `memory-bank` oluşturulmasına karar verildi.
*   MVP'nin web tabanlı olarak Next.js ile geliştirilmesine karar verildi.
*   OpenAI API'sinin yapay zeka motoru olarak kullanılmasına karar verildi.
*   Veritabanı olarak Firebase seçildi.
*   `projectbrief.md` ve `productContext.md` dosyalarının ilk içerikleri oluşturuldu.

## 3. Bir Sonraki Adımlar

*   `memory-bank` içindeki diğer dosyaların (`systemPatterns.md`, `techContext.md`, `progress.md`) Firebase seçimine göre güncellenmesi (gerekirse).
*   Next.js projesinin oluşturulması: `npx create-next-app@latest medi-mind-mvp`.
*   Firebase projesinin oluşturulması ve Next.js projesine temel entegrasyonu için ilk adımların atılması.
*   Temel UI/UX prensipleri ve hasta sohbet arayüzü için fikir alışverişi.

## 4. Aktif Tartışmalar ve Açık Sorular

*   **UI/UX Detayları:** Hasta sohbet arayüzü ve doktor paneli için temel tasarım yaklaşımları ne olmalı?
*   **OpenAI API Kullanım Detayları:** Hangi OpenAI modelleri (örn: GPT-3.5-turbo, GPT-4) kullanılacak? İstek limitleri ve maliyetler nasıl yönetilecek?
*   **Güvenlik Önlemleri:** MVP aşamasında hangi temel güvenlik önlemleri alınmalı (özellikle API anahtarları ve kullanıcı verileri için)?

## 5. Riskler ve Endişeler

*   **OpenAI API Bağımlılığı:** API'nin erişilebilirliği, maliyeti veya politikalarındaki değişiklikler projeyi etkileyebilir.
*   **Veri Gizliliği ve Güvenliği (KVKK/GDPR):** Sağlık verilerinin işlenmesi nedeniyle yasal düzenlemelere tam uyum sağlanması kritik önem taşıyor. MVP aşamasında bile temel prensiplere dikkat edilmeli.
*   **Yapay Zeka Yanıtlarının Doğruluğu:** Yapay zekanın verdiği ön bilgilerin ve yönlendirmelerin tıbbi olarak tamamen doğru olmaması ve kullanıcıları yanlış yönlendirme riski. (Bu bir tıbbi teşhis aracı değildir, sadece ön bilgilendirme ve yönlendirme yapar vurgusu önemli).
*   **Kullanıcı Kabulü:** Hem hastaların hem de doktorların sistemi benimsemesi ve aktif olarak kullanması için arayüzün kullanıcı dostu ve sistemin gerçekten faydalı olması gerekiyor. 