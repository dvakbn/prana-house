# 🖼️ Recommended Class Images

## Free High-Quality Yoga Images from Unsplash

Here are professional yoga images you can use for your classes. All images are **free to use** from Unsplash.

---

## 🧘 General Yoga Classes

### Morning Hatha Yoga / Sunrise Yoga
```
https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop
```
*Peaceful sunrise yoga pose*

```
https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop
```
*Morning meditation and yoga*

### Evening Yoga / Sunset Practice
```
https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800&h=600&fit=crop
```
*Peaceful evening yoga session*

```
https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&h=600&fit=crop
```
*Sunset yoga by the beach*

---

## 💻 Online Yoga Classes

### Virtual/Home Practice
```
https://images.unsplash.com/photo-1593810451137-5dc55105dace?w=800&h=600&fit=crop
```
*Person doing yoga at home with laptop*

```
https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?w=800&h=600&fit=crop
```
*Home yoga setup with mat*

```
https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop
```
*Peaceful home yoga practice*

---

## 🧘‍♀️ Specific Practice Types

### Pranayama / Breathing Classes
```
https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?w=800&h=600&fit=crop
```
*Meditation and breath work*

```
https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800&h=600&fit=crop
```
*Peaceful breathing exercise*

### Relaxation / Restorative Yoga
```
https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=600&fit=crop
```
*Calming restorative pose*

```
https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&h=600&fit=crop
```
*Peaceful relaxation*

### Power Yoga / Vinyasa Flow
```
https://images.unsplash.com/photo-1599447292208-4a1b066f5a52?w=800&h=600&fit=crop
```
*Dynamic vinyasa flow*

```
https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop
```
*Warrior pose strength*

---

## 🏡 Studio / Group Classes

### Group Practice
```
https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800&h=600&fit=crop
```
*Group yoga class*

```
https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=600&fit=crop
```
*Studio yoga session*

### Indoor Studio
```
https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&h=600&fit=crop
```
*Clean yoga studio interior*

```
https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop
```
*Bright yoga studio*

---

## 🌿 Nature/Outdoor Yoga

### Outdoor Practice
```
https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop
```
*Yoga in nature*

```
https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800&h=600&fit=crop
```
*Beach yoga practice*

---

## 🎯 Specialized Classes

### Flexibility & Mobility
```
https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?w=800&h=600&fit=crop
```
*Stretching and flexibility*

### Therapeutic Yoga
```
https://images.unsplash.com/photo-1593810451137-5dc55105dace?w=800&h=600&fit=crop
```
*Gentle therapeutic practice*

### Meditation Classes
```
https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?w=800&h=600&fit=crop
```
*Peaceful meditation*

```
https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop
```
*Meditative yoga pose*

---

## 📝 How to Add Images to Your Classes

### Method 1: Via Admin Dashboard (Recommended)

1. **Go to Admin Dashboard**
   - Visit: `https://pranayoga.qzz.io/admin/dashboard`
   - Login with your credentials

2. **Navigate to Classes Section**
   - Click on the "🧘 Classes" card

3. **Edit Your Class**
   - Click "Edit" on the class you want to add an image to

4. **Add Image URL**
   - In the "Image URL" field, paste one of the URLs above
   - Example: `https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop`

5. **Save**
   - Click "Save Class"
   - Image will now appear on the classes page!

---

### Method 2: Via Supabase (If needed)

Run this SQL in Supabase to update existing classes:

```sql
-- First, add the image column (run the migration file 13_add_image_to_classes.sql)

-- Then update specific classes:
UPDATE classes 
SET image = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop'
WHERE name = 'Morning Hatha Yoga';

UPDATE classes 
SET image = 'https://images.unsplash.com/photo-1593810451137-5dc55105dace?w=800&h=600&fit=crop'
WHERE name = 'Evening Relaxation Flow';

-- Add more UPDATE statements for other classes...
```

---

## 🎨 Image Guidelines

### Recommended Dimensions:
- **Width**: 800px
- **Height**: 600px
- **Aspect Ratio**: 4:3 (landscape)

### What Makes a Good Class Image:
✅ Clear, well-lit yoga poses
✅ Calm, peaceful atmosphere
✅ Professional quality
✅ Not too busy (simple background)
✅ Represents the class type (morning, evening, online, etc.)

❌ Avoid:
- Blurry or low-quality images
- Too many elements/distracting
- Dark or unclear images
- Unrelated to yoga/wellness

---

## 🔄 How Images Will Display:

**With Image:**
- 200px height cover image at top of card
- Type badge (💻/🏡) in top-left corner with blur effect
- Level badge in top-right corner with blur effect
- Zoom effect on hover
- Fallback to icon if image fails to load

**Without Image:**
- Traditional card layout with icon
- No image space used
- Still looks elegant and professional

---

## 💡 Pro Tips:

1. **Use consistent image style** - All images from same source look more professional
2. **Match image to class mood** - Sunrise images for morning classes, peaceful for meditation
3. **Test on mobile** - Images should look good on all screen sizes
4. **Update gradually** - No need to add all images at once
5. **Keep URLs safe** - Unsplash URLs are permanent and reliable

---

**Your existing classes won't change - images are completely optional!** 🎉

Just add image URLs to the classes you want to enhance visually.
