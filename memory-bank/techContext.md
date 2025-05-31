# Teknik Bağlam: MediMind MVP

## 1. Kullanılan Teknolojiler ve Diller

*   **Programlama Dili (Frontend & Backend):** JavaScript (ve potansiyel olarak TypeScript)
    *   *Açıklama:* Next.js, JavaScript tabanlıdır. TypeScript, daha büyük projelerde kod kalitesini ve sürdürülebilirliği artırmak için tercih edilebilir. MVP için saf JavaScript ile başlanabilir, sonrasında TypeScript'e geçiş düşünülebilir.
*   **Frontend Framework:** Next.js (React tabanlı)
    *   *Açıklama:* Sunucu taraflı render (SSR), statik site oluşturma (SSG), API rotaları gibi modern web geliştirme ihtiyaçları için güçlü bir framework.
*   **Backend Çatısı:** Next.js API Rotaları
    *   *Açıklama:* Basit ve orta karmaşıklıktaki backend işlemleri için Next.js'in kendi API rota sistemi MVP için yeterli olacaktır.
*   **Yapay Zeka Servisi:** OpenAI API (GPT modelleri, örn. GPT-3.5-turbo veya GPT-4)
    *   *Açıklama:* Doğal dil işleme, soru cevaplama ve metin özetleme yetenekleri için kullanılacak.
*   **Veritabanı (BaaS - Backend as a Service):** Firebase
    *   *Açıklama:* Karar verildi. Kullanıcı kimlik doğrulama, veri saklama (Firestore - konuşma özetleri, gelecekte kullanıcı verileri) ve potansiyel olarak gerçek zamanlı özellikler için kullanılacak.
*   **Stil ve CSS:** Tailwind CSS veya CSS Modülleri / Styled Components
    *   *Açıklama:* Hızlı ve tutarlı UI geliştirme için Tailwind CSS popüler bir seçenektir. Alternatif olarak CSS Modülleri veya Styled Components gibi çözümler de düşünülebilir.

## 2. Kütüphaneler ve Araçlar (Öngörülenler)

*   **QR Kod Üretimi (İstemci Tarafı):** `qrcode.react` veya benzeri bir React kütüphanesi.
*   **QR Kod Okuma (İstemci Tarafı):** `react-qr-reader` veya benzeri bir kütüphane (doktor paneli için).
*   **HTTP İstekleri (İstemci Tarafı):** `fetch` API (tarayıcıda yerleşik) veya `axios`.
*   **State Management (İhtiyaç Halinde):** React Context API (basit durumlar için), Zustand veya Redux (daha karmaşık durum yönetimi için).
*   **Linting ve Formatlama:** ESLint, Prettier.
    *   *Açıklama:* Kod kalitesini ve tutarlılığını sağlamak için.
*   **Paket Yöneticisi:** npm veya yarn.

## 3. Geliştirme Ortamı

*   **Kod Editörü:** Visual Studio Code (önerilir) veya tercih edilen başka bir IDE.
*   **Versiyon Kontrol Sistemi:** Git ve GitHub (veya GitLab/Bitbucket).
*   **Node.js:** Next.js ve diğer geliştirme araçları için gereklidir.
*   **Tarayıcılar:** Geliştirme ve test için modern web tarayıcıları (Chrome, Firefox, Edge).

## 4. Dağıtım (Deployment)

*   **Platform:** Vercel (Next.js için optimize edilmiş, tavsiye edilir) veya Netlify.
    *   *Açıklama:* Kolay dağıtım, otomatik CI/CD ve HTTPS gibi özellikler sunarlar.

## 5. Teknik Kısıtlar ve Dikkat Edilmesi Gerekenler

*   **OpenAI API Limitleri ve Maliyetleri:** API kullanım oranları ve maliyetler dikkatle takip edilmeli. MVP aşamasında ücretsiz veya düşük maliyetli katmanlar tercih edilebilir.
*   **Veri Gizliliği ve Güvenliği (KVKK/GDPR Uyumu):** Özellikle sağlık verileri işleneceği için kullanıcı verilerinin güvenli bir şekilde saklanması, işlenmesi ve anonimleştirilmesi (gerektiğinde) kritik öneme sahiptir. BaaS platformlarının güvenlik özellikleri incelenmelidir.
*   **Ölçeklenebilirlik:** MVP sonrası kullanıcı sayısı arttıkça sistemin (özellikle backend ve veritabanı) ölçeklenebilirliği göz önünde bulundurulmalıdır. BaaS platformları bu konuda genellikle esneklik sunar.
*   **Tarayıcı Uyumluluğu:** Hedeflenen kullanıcı kitlesinin kullandığı tarayıcılarla uyumluluk testleri yapılmalıdır.
*   **Performans:** Sayfa yükleme hızları ve API yanıt süreleri optimize edilmelidir.

## 6. Entegrasyonlar

*   **OpenAI API Entegrasyonu:** Güvenli API anahtarı yönetimi ve sunucu tarafı istekler.
*   **Firebase Entegrasyonu:** SDK kurulumu, kimlik doğrulama ve Firestore veritabanı işlemleri.

Bu teknik bağlam, projenin geliştirme süreci boyunca güncellenecek ve detaylandırılacaktır.

*   **Kurulum Durumu:** Next.js ve Firebase projeleri başarıyla kuruldu. 