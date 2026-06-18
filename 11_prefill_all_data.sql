-- ═══════════════════════════════════════════════════════════════
-- PRANA HOUSE - Complete Data Pre-fill
-- Run this in Supabase SQL Editor to populate all content
-- ═══════════════════════════════════════════════════════════════

-- Clean existing data (optional - comment out if you want to keep existing data)
-- DELETE FROM blogs;
-- DELETE FROM gallery;
-- DELETE FROM retreats;
-- DELETE FROM classes;
-- DELETE FROM programs;

-- ═══════════════════════════════════════════════════════════════
-- BLOG POSTS (10 detailed articles)
-- ═══════════════════════════════════════════════════════════════

INSERT INTO blogs (title, slug, author, category, image, excerpt, content, published) VALUES

-- Blog 1: Yoga
(
  'Understanding the 8 Limbs of Yoga: A Complete Guide',
  'understanding-8-limbs-of-yoga',
  'Dr. Fareen Tak',
  'Yoga',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
  'Explore the ancient philosophy behind yoga practice through Patanjali''s eight-fold path to enlightenment.',
  'Yoga is far more than just physical postures on a mat. The ancient sage Patanjali codified the essence of yoga philosophy into the Yoga Sutras, outlining an eight-fold path known as Ashtanga Yoga.

**The Eight Limbs Explained:**

**1. Yama (Ethical Restraints)**
The first limb consists of five moral disciplines: Ahimsa (non-violence), Satya (truthfulness), Asteya (non-stealing), Brahmacharya (moderation), and Aparigraha (non-possessiveness). These form the foundation of yogic living.

**2. Niyama (Self-Disciplines)**
Five personal observances: Saucha (cleanliness), Santosha (contentment), Tapas (discipline), Svadhyaya (self-study), and Ishvara Pranidhana (surrender to a higher power).

**3. Asana (Physical Postures)**
The practice most of us associate with yoga. Asanas prepare the body to sit comfortably in meditation by building strength, flexibility, and body awareness.

**4. Pranayama (Breath Control)**
Conscious regulation of breath to control prana (life force energy). Techniques include alternate nostril breathing, breath retention, and various rhythmic patterns.

**5. Pratyahara (Sense Withdrawal)**
Learning to withdraw attention from external stimuli and turn inward. This is the bridge between the outer and inner limbs of yoga.

**6. Dharana (Concentration)**
Training the mind to focus on a single point - whether a mantra, breath, or visual object. This develops mental stability.

**7. Dhyana (Meditation)**
Sustained, uninterrupted flow of concentration. The mind becomes absorbed in the object of meditation.

**8. Samadhi (Union/Enlightenment)**
The ultimate goal - complete absorption and unity with the divine. A state of bliss and transcendence.

**Practical Application:**
Start where you are. Most practitioners begin with asana and pranayama, gradually incorporating the ethical guidelines and meditation practices. The eight limbs work together as an integrated system for holistic wellbeing.

At Prana House, we honor this traditional framework while making it accessible to modern practitioners.',
  true
),

-- Blog 2: Pranayama
(
  'The Science Behind Pranayama: How Breathwork Heals',
  'science-behind-pranayama',
  'Dr. Fareen Tak',
  'Pranayama',
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
  'Discover how ancient breathing techniques are validated by modern science for stress relief, immunity, and mental clarity.',
  'Pranayama, the yogic science of breath control, has been practiced for thousands of years. Modern research is now validating what yogis have known intuitively - that conscious breathing profoundly impacts our physiology and psychology.

**The Autonomic Nervous System Connection**

When we practice pranayama, we directly influence the autonomic nervous system (ANS). The ANS has two branches:
- **Sympathetic**: "Fight or flight" response
- **Parasympathetic**: "Rest and digest" response

Most people live in sympathetic dominance due to chronic stress. Pranayama activates the parasympathetic nervous system through the vagus nerve, triggering relaxation responses throughout the body.

**Key Pranayama Techniques:**

**Nadi Shodhana (Alternate Nostril Breathing)**
Research shows this balances left and right brain hemispheres, reduces blood pressure, and improves cardiovascular function. Practice: Close right nostril, inhale left. Close left, exhale right. Continue alternating for 5-10 minutes.

**Kapalbhati (Skull Shining Breath)**
Rapid, forceful exhalations followed by passive inhalations. Benefits include improved digestion, increased oxygen supply to brain, and detoxification. Practice with caution and never on a full stomach.

**Bhramari (Humming Bee Breath)**
Creates a humming sound on exhalation. Studies show it significantly reduces stress hormones and anxiety. The vibration stimulates the vagus nerve directly.

**Ujjayi (Victorious Breath)**
Constricting the throat to create an ocean-like sound. Improves focus and regulates body temperature.

**Scientific Benefits Documented:**
- Reduces cortisol (stress hormone) by up to 30%
- Increases GABA (calming neurotransmitter)
- Improves heart rate variability (marker of resilience)
- Enhances lung capacity and oxygen efficiency
- Activates relaxation response within 5 minutes

**Getting Started:**
Begin with 5-10 minutes daily. Practice on an empty stomach, preferably in the morning. Never force the breath - pranayama should feel effortless and comfortable.

At Prana House, we teach pranayama progressively, ensuring proper technique before advancing to more powerful practices.',
  true
),

-- Blog 3: Naturopathy  
(
  'Naturopathy Principles for Daily Wellness',
  'naturopathy-principles-daily-wellness',
  'Dr. Fareen Tak',
  'Naturopathy',
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
  'Learn the fundamental naturopathic principles and simple practices you can integrate into your everyday life for lasting health.',
  'Naturopathy is a holistic system of healing that works with the body''s innate ability to heal itself. As a naturopath and yoga practitioner, I integrate these principles daily.

**The Five Core Principles:**

**1. The Healing Power of Nature (Vis Medicatrix Naturae)**
The body has an inherent ability to maintain and restore health. Our role is to support this process, not override it.

**2. Identify and Treat the Cause (Tolle Causam)**
Rather than suppressing symptoms, we seek the root cause of illness - whether physical, emotional, or environmental.

**3. First, Do No Harm (Primum Non Nocere)**
Use the least invasive, most natural interventions first. Support, don''t suppress.

**4. Treat the Whole Person (Tolle Totum)**
Consider physical, mental, emotional, spiritual, environmental, and social factors in health.

**5. Prevention is the Best Cure**
Teaching healthy lifestyle practices prevents disease before it manifests.

**Practical Daily Applications:**

**Morning Routine:**
- Drink 2 glasses of room-temperature water upon waking (adds freshness to system)
- Tongue scraping to remove toxins
- Oil pulling with coconut oil (10-15 minutes)
- Sunlight exposure for 10-15 minutes (vitamin D and circadian rhythm)

**Dietary Wisdom:**
- Eat sattvic foods: fresh fruits, vegetables, whole grains, nuts, legumes
- Avoid processed, canned, or leftover foods when possible
- Eat largest meal at noon when digestive fire (agni) is strongest
- Include all six tastes: sweet, sour, salty, bitter, pungent, astringent

**Hydrotherapy:**
- Alternating hot and cold water in shower stimulates circulation
- Cold water face immersion reduces stress instantly (dive reflex)

**Sleep Hygiene:**
- Sleep by 10 PM to align with natural circadian rhythms
- Create complete darkness in bedroom
- Avoid screens 1 hour before bed

**Seasonal Living (Ritucharya):**
Adjust diet and lifestyle with changing seasons. In summer, eat cooling foods. In winter, warming, heavier foods.

**Common Ailments - Natural Approaches:**

**Headaches:** Apply cold compress, drink water, practice alternate nostril breathing
**Indigestion:** Ginger tea, walk after meals, avoid cold water with food
**Insomnia:** Warm milk with nutmeg, foot massage, evening relaxation practices
**Common Cold:** Ginger-tulsi tea, steam inhalation, rest

The beauty of naturopathy is its simplicity and accessibility. Small, consistent changes create profound transformation over time.',
  true
),
