# Sistem Desenleri: MediMind MVP

## 1. Genel Mimari (MVP Aşaması)

MediMind MVP'si, istemci tarafı (Frontend), sunucu tarafı (Backend API) ve üçüncü parti servislerden (Yapay Zeka, Veritabanı) oluşan monolitik bir Next.js uygulaması olarak tasarlanmıştır.

```mermaid
flowchart TD
    Kullanici[Hasta Kullanıcı] --> Arayuz[Next.js Frontend (Sohbet Arayüzü)]
    Arayuz --> API_Gateway[Next.js API Rotaları (Backend)]
    API_Gateway -- Semptom Bilgisi --> OpenAI[OpenAI API]
    OpenAI -- Sorular/Yönlendirmeler --> API_Gateway
    API_Gateway -- Konuşma Özeti --> Arayuz
    Arayuz -- QR Kod İsteği --> API_Gateway
    API_Gateway -- Özet Bilgisi --> QR_Servisi[QR Kod Üretim Kütüphanesi]
    QR_Servisi -- QR Kod --> Arayuz
    Kullanici -- QR Kodu Gösterir --> Doktor

    Doktor --> Doktor_Arayuzu[Next.js Frontend (Doktor Paneli)]
    Doktor_Arayuzu -- QR Kod Okuma İsteği --> API_Gateway_Doktor[Next.js API Rotaları (Backend)]
    API_Gateway_Doktor -- QR Verisi --> Veritabani_Oku[Veritabanı (Firebase/Supabase - Özet Okuma)]
    Veritabani_Oku -- Hasta Özeti --> API_Gateway_Doktor
    API_Gateway_Doktor -- Hasta Özeti --> Doktor_Arayuzu

    API_Gateway -- Konuşma Kaydı (Gelecekte) --> Veritabani_Yaz[Veritabanı (Firebase/Supabase - Kayıt)]
```

**Açıklamalar:**

*   **Next.js Frontend:** Kullanıcıların (hasta ve doktor) etkileşimde bulunduğu arayüzler. React bileşenleri ile oluşturulur.
*   **Next.js API Rotaları:** Frontend'den gelen istekleri işleyen, OpenAI API ile iletişim kuran, QR kod üreten ve veritabanı işlemleri yapan backend mantığını içerir. Next.js'in `pages/api` klasörü altında yer alır.
*   **OpenAI API:** Hastanın girdiği semptomları analiz eden, ek sorular üreten ve ön yönlendirmeler/bilgiler sağlayan yapay zeka servisidir.
*   **QR Kod Üretim Kütüphanesi:** Verilen metin (konuşma özeti) için QR kod oluşturan bir istemci veya sunucu tarafı kütüphanesi (örneğin, `qrcode.react` veya sunucu tarafında `qrcode`).
*   **Veritabanı (Firebase/Supabase):** MVP'de öncelikle doktorun erişeceği konuşma özetlerini saklamak için kullanılabilir. Gelecekte kullanıcı hesapları, detaylı konuşma kayıtları ve analiz verileri için de kullanılacaktır.

## 2. Temel Veri Akışı

1.  **Hasta Semptom Girişi:**
    *   Hasta, sohbet arayüzüne semptomlarını yazar.
    *   Frontend, bu bilgiyi Next.js API'sine gönderir.
    *   API, semptomu OpenAI'ye iletir.
2.  **Yapay Zeka Etkileşimi:**
    *   OpenAI, ek sorular veya bilgilerle yanıt verir.
    *   API, bu yanıtı frontend'e iletir ve hastaya gösterilir.
    *   Bu soru-cevap döngüsü birkaç kez tekrarlanabilir.
3.  **Özet ve QR Kod Oluşturma:**
    *   Konuşma tamamlandığında, API (OpenAI yardımıyla veya kendi mantığıyla) bir özet oluşturur.
    *   Bu özet, bir QR koduna dönüştürülür ve hastaya sunulur.
    *   Özet, (gelecekte) veritabanına kaydedilebilir.
4.  **Doktor Erişimi:**
    *   Doktor, hastanın QR kodunu kendi panelinden okutur.
    *   Frontend (doktor paneli), QR bilgisini Next.js API'sine gönderir.
    *   API, (gelecekte) veritabanından ilgili özeti çeker ve doktora gösterir. (MVP'de özet direkt QR içinde olabilir veya geçici bir çözümle saklanabilir).

## 3. Kullanılan Tasarım Desenleri (MVP için basit tutulacak)

*   **Component-Based Architecture (React):** Arayüz, yeniden kullanılabilir bileşenlerden (örneğin, `ChatBubble`, `InputField`, `QRCodeDisplay`) oluşacaktır.
*   **API Rotaları (Next.js):** Backend mantığı, belirli endpoint'ler üzerinden erişilebilen API rotaları ile organize edilecektir.
*   **State Management (React Context/ Zustand/Redux - İhtiyaca göre):** Uygulama genelinde veya karmaşık bileşenler arasında veri yönetimi için basit bir state management çözümü (başlangıç için React Context yeterli olabilir) kullanılacaktır.

## 4. Güvenlik Desenleri

*   **API Anahtarı Yönetimi:** OpenAI API anahtarı gibi hassas bilgiler, ortam değişkenleri (`.env.local`) ile güvenli bir şekilde saklanacak ve sunucu tarafında kullanılacaktır.
*   **HTTPS:** Uygulama, güvenli iletişim için HTTPS üzerinden sunulacaktır (genellikle Vercel/Netlify gibi platformlar bunu otomatik sağlar).
*   **Veri Doğrulama:** Kullanıcıdan gelen girdiler (özellikle API isteklerinde) hem istemci hem de sunucu tarafında doğrulanacaktır.
*   **Rate Limiting (Gelecekte):** API endpoint'lerine yönelik aşırı istekleri önlemek için rate limiting uygulanabilir.

Bu desenler, MVP aşamasında projenin temelini oluşturacak ve ilerleyen sürümlerde ihtiyaçlara göre geliştirilip genişletilecektir. 