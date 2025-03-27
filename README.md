# Fashion loyihasi uchun Backend 👗👠

## Loyihaning maqsadi:

Online kiyim-kechak dokoni uchun categoriyalar bo'yicha kiyimlarni ko'rish, ularni online xarid qilish imkoniyatini beruvchi loyihaning backend API qismi

## Funksional talablar:

- Barcha kiyimlarning categoriyalari bo'lishi kerak. (man,woman,child)
- Har bir kiyim albatta bitta kategoriyaga mansub bo'lishi kerak
- Kiyimning rasmi, nomi, narxi, description, razmeri bo'lishi kerak
- Foydalanuvchi ro'yxattan o'tmagan holatta ham category va kiyimlarni ko'ra olishi kerak.
- Foydalanuvchi email va name bilan ro'yxattan o'tadi
- Profilga kirish email orqali bo'ladi
- Foydalanuvchi savatga maxsulotlar qo'sha olishi kerak
- Foydalanuvchi bir nechta mahsulot zakaz qila olishi kerak
- Foydalanuvchi o'zining zakazlar tarixini ko'ra olishi kerak
- Foydalanuvchi profilini yangilay oplishi kerak

## Nofunksional talablar:

-Tozalik
-Xavfsizlik
-Kengaya oladigan loyiha bo'lishi kerak

## Database model: 🗓️

1. Category:

- id
- name
- createdAt
- updateAt
- categoryId

2. Clothes:

- id
- name
- price
- description
- size
- imageUrl
- createAt
- updateAt
- categoryId (FK)

3. User:

- id
- name
- phoneNumber
- createAt
- updateAt

4. Orders:

- id
- createdAt
- totalPrice
- userId (FK)

5. OrderItem:

- count
- orderId(FK)
- clotheId (FK)
