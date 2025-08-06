# 🛍️ HappyShop

[![React Native](https://img.shields.io/badge/React--Native-0.80.2-blue?logo=react)](https://reactnative.dev/)
[![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-green)]()
[![License](https://img.shields.io/badge/License-MIT-lightgrey)]()

HappyShop, React Native ile geliştirilmiş bir mini e-ticaret uygulamasıdır.  
Kullanıcılar ürünleri inceleyebilir, sepete ekleyebilir ve sepet işlemlerini yönetebilir.  
Bu proje teknik mülakat değerlendirmesi amacıyla hazırlanmıştır.

---

## ✨ Özellikler

- 🔄 Ürünleri API üzerinden çekme
- 🧾 Ürün detay ekranı (resim galerisi dahil)
- 🛒 Sepete ekleme, artırma, azaltma, silme
- 🧠 Redux ile global sepet yönetimi
- 🚀 Performanslı listeleme (FlatList)
- 🌙 iOS ve Android desteği
- 🧩 Modüler ve temiz kod yapısı

---

## ⚙️ Kurulum ve Çalıştırma

```bash
git clone https://github.com/kullaniciadiniz/HappyShop.git
cd HappyShop

npm install

# Android için
npx react-native run-android

# iOS için (ilk kez çalıştırmadan önce pod install)
cd ios && pod install && cd ..
npx react-native run-ios
