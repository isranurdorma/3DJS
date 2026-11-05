# 3D Web Tasarımı - 3D Dönen Fotoğraf Makinesi (Three.js)

Bu proje, Three.js 1. hafta temel sahne kurulumu (`01`) referans alınarak hazırlanmıştır. 
Arka plan **sıcak krem rengi** yapılmış, dönen nesne ise temel geometriler (`BoxGeometry` ve `CylinderGeometry`) kullanılarak şık ve sevimli bir **3D fotoğraf makinesi** olarak modellenmiştir.

## 🚀 Projeyi Çalıştırma

Projeyi başlatmak için terminalde şu komutu çalıştırın:

```bash
npm run dev
```

Ardından tarayıcınızdan terminaldeki adrese (genellikle `http://localhost:5173`) giderek 3D kamerayı görüntüleyebilirsiniz.

---

## 📸 3D Kamera Modeli Nelerden Oluşur?

1. **Gövde (Body):** Koyu antrasit renkli ana dikdörtgen gövde kutusu.
2. **Üst Kapak (Top Plate):** Retro kameralardaki metalik gümüş üst plaka.
3. **Objektif (Lens):** 
   - Siyah silindirik objektif gövdesi
   - Gümüş halka detayı
   - Mavi yansımalı parlak lens camı
4. **Deklanşör (Shutter Button):** Üstte yer alan kırmızı renkli basma butonu.
5. **Mod Çarkı (Mode Dial):** Üstte yer alan metalik ayar tekeri.
6. **Flaş (Flash):** Ön yüzde sarımsı flaş penceresi.
7. **Arka Ekran (LCD Screen):** Kameranın arka yüzeyindeki geniş ekran.
8. **Vizör (Eyepiece):** Arka üst kısımdaki bakma penceresi.

---

## 🎨 Arka Plan ve Işıklandırma

- **Arka Plan:** Sıcak ve modern krem tonu (`#f6f0e4`).
- **Işıklandırma:** Kameranın metalik ve mat yüzeylerinin gerçekçi görünmesi için yumuşak ortam ışığı (`AmbientLight`) ve ön/arka yönsel ışıklar (`DirectionalLight`) yerleştirilmiştir.
- **Animasyon:** `01`'deki gibi `renderer.setAnimationLoop` ile kamera kendi eksenleri etrafında yavaşça dönerek tüm detaylarını sergiler.
