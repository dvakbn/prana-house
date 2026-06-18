-- ═══════════════════════════════════════════════════════════════
-- PRANA HOUSE - COMPLETE DATA PRE-FILL
-- Run sections separately in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════
-- SECTION 1: CLASSES (Online & Offline)
-- ═══════════════════════════════════════════════════════════════

INSERT INTO classes (name, type, level, schedule, duration, price, description, max_students, active) VALUES

-- Online Classes
('Morning Hatha Yoga Online', 'online', 'all', 'Mon, Wed, Fri - 6:30 to 7:30 AM', 60, 2000, 
'Start your day with traditional Hatha Yoga from the comfort of home. This gentle yet invigorating practice combines asanas, pranayama, and meditation. Perfect for building a consistent morning practice. Small group size ensures personal attention and adjustments. Includes recorded sessions for makeup classes.', 
12, true),

('Evening Relaxation Flow Online', 'online', 'all', 'Tue, Thu - 7:00 to 8:00 PM', 60, 1800,
'Unwind after work with this calming flow designed to release tension and prepare for restful sleep. Combines gentle vinyasa, restorative poses, and Yoga Nidra. Ideal for stress management and better sleep quality. Suitable for complete beginners.',
15, true),

('Pranayama & Meditation Online', 'online', 'all', 'Daily - 6:00 to 6:45 AM', 45, 1500,
'Daily morning breathwork and meditation practice. Learn traditional pranayama techniques and guided meditation. Builds mental clarity, emotional balance, and respiratory health. Join live or access recordings. Perfect for establishing a daily spiritual practice.',
20, true),

-- Offline Classes  
('Sunrise Yoga - Offline', 'offline', 'all', 'Mon, Wed, Fri - 6:00 to 7:15 AM', 75, 3000,
'Experience yoga in person at Prana House, Pratap Nagar. Complete morning sadhana including pranayama, asana, and meditation. Personalized adjustments and hands-on corrections. Build community with fellow practitioners. Tea and light refreshments included.',
8, true),

('Therapeutic Yoga - Offline', 'offline', 'beginner', 'Tue, Thu - 9:00 to 10:15 AM', 75, 3500,
'Specialized class for chronic pain, injury recovery, or limited mobility. One-on-one attention within a small group setting. Uses props, chair yoga, and gentle modifications. Combines yoga therapy principles with naturopathic guidance.',
6, true),

('Power Vinyasa - Offline', 'offline', 'intermediate', 'Tue, Thu, Sat - 6:00 to 7:15 PM', 75, 2800,
'Dynamic, flowing sequences linking breath with movement. Builds strength, stamina, and flexibility. Expect inversions, arm balances, and challenging transitions. Suitable for those with consistent yoga practice. High-energy class with detailed alignment cues.',
10, true),

-- Hybrid Classes
('Flexibility & Mobility', 'hybrid', 'all', 'Saturday - 7:00 to 8:30 AM', 90, 2500,
'Deep stretch and mobility work. Focuses on hip openers, hamstring flexibility, shoulder mobility, and spinal health. Join online or offline. Includes myofascial release techniques and props work. Perfect complement to strength training or desk work.',
12, true),

('Yoga for Stress Relief', 'hybrid', 'all', 'Sunday - 5:00 to 6:30 PM', 90, 2200,
'Weekly restorative practice combining gentle asanas, breathwork, and guided relaxation. Learn practical stress management tools. Includes Yoga Nidra (yogic sleep) and mindfulness techniques. Supportive, nurturing environment.',
15, true);


-- ═══════════════════════════════════════════════════════════════
-- SECTION 2: RETREATS (Full Day + Weekend)
-- ═══════════════════════════════════════════════════════════════

INSERT INTO retreats (title, start_date, end_date, location, price, max_participants, description, highlights, image, schedule, active) VALUES

-- Main Full Day Retreat
('Full Day Yoga & Wellness Retreat', '2026-08-15', '2026-08-15', 'Prana House, Pratap Nagar, Jaipur', 5000, 20,
'Immerse yourself in a transformative day of yoga, meditation, wellness workshops, and sattvic nourishment. Disconnect from daily stress and reconnect with your inner self. Led by Dr. Fareen Tak with personalized attention throughout.',
ARRAY[
  'Complete yoga & pranayama sessions',
  'Sattvic breakfast & wholesome lunch',
  'Wellness workshop on yogic lifestyle',
  'Yoga Nidra deep relaxation',
  'All mats, props & materials provided',
  'Welcome kit with herbal tea & journal',
  'Certificate of participation',
  'Post-retreat wellness plan'
],
'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200',
'[
  {"time":"6:00 - 7:00 AM","icon":"🌅","title":"Sunrise Meditation & Pranayama","description":"Welcome the day in stillness. Guided breathwork and meditation to center your mind and set intention for the day ahead."},
  {"time":"7:00 - 9:00 AM","icon":"🧘","title":"Morning Hatha Yoga Flow","description":"Complete asana practice flowing from gentle warm-up through dynamic sequences. Focus on alignment, breath coordination, and mindful movement."},
  {"time":"9:00 - 10:00 AM","icon":"🍵","title":"Sattvic Breakfast","description":"Nourishing vegetarian meal eaten mindfully. Fresh fruits, whole grains, herbal teas. An opportunity to practice conscious eating."},
  {"time":"10:30 AM - 12:30 PM","icon":"📖","title":"Wellness Workshop","description":"Interactive session on yogic lifestyle, naturopathic principles, stress management, or seasonal wellness practices. Includes Q&A with Dr. Fareen."},
  {"time":"12:30 - 2:00 PM","icon":"🌻","title":"Mindful Lunch & Rest","description":"Wholesome vegetarian thali served with awareness. Followed by free time for journaling, rest, or quiet reflection in the garden."},
  {"time":"2:00 - 3:30 PM","icon":"🤸","title":"Restorative Yoga & Yin Practice","description":"Gentle, supported poses held for longer duration. Deep stretching that releases fascia and calms nervous system. Props-assisted comfort."},
  {"time":"3:30 - 5:00 PM","icon":"💤","title":"Yoga Nidra (Yogic Sleep)","description":"Guided systematic relaxation leading to a state between waking and sleeping. Profoundly restful - equivalent to 3 hours of sleep."},
  {"time":"5:00 - 5:45 PM","icon":"🌄","title":"Closing Circle & Integration","description":"Share reflections, set intentions, and receive your personalized wellness plan. Gentle chanting and gratitude practice."},
  {"time":"All Day","icon":"💚","title":"Community & Connection","description":"Connect with like-minded individuals. Build lasting friendships and a supportive wellness community that extends beyond the retreat."}
]'::jsonb,
true),

-- Weekend Retreat
('Weekend Yoga Immersion', '2026-09-12', '2026-09-13', 'Nature Resort, 45km from Jaipur', 8500, 16,
'Two-day residential retreat in nature. Deepen your practice through extended sessions, nature walks, silent meals, and evening satsang. Includes accommodation and all meals.',
ARRAY[
  'Two full days of guided practice',
  'Accommodation in peaceful setting',
  'All meals (6 sattvic meals included)',
  'Morning & evening meditation',
  'Nature walk & outdoor yoga',
  'Bonfire & evening satsang',
  'Digital detox environment',
  'Take-home practice guide'
],
'https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200',
'[
  {"time":"Saturday 6:00 AM","icon":"🌄","title":"Morning Meditation","description":"Silent meditation watching sunrise. Connect with nature and inner stillness."},
  {"time":"7:00 - 9:00 AM","icon":"🧘","title":"Morning Yoga Practice","description":"2-hour intensive asana session outdoors (weather permitting)."},
  {"time":"9:30 AM","icon":"🥗","title":"Breakfast","description":"Farm-fresh vegetarian breakfast"},
  {"time":"11:00 AM - 1:00 PM","icon":"🌳","title":"Nature Walk & Mindfulness","description":"Guided walk focusing on present-moment awareness"},
  {"time":"2:00 - 4:00 PM","icon":"📚","title":"Philosophy & Practice","description":"Yoga philosophy discussion and practical application"},
  {"time":"4:30 - 6:00 PM","icon":"🌬️","title":"Pranayama Deep Dive","description":"Advanced breathing techniques with detailed instruction"},
  {"time":"7:30 PM","icon":"🔥","title":"Bonfire Satsang","description":"Evening gathering with chanting, sharing, and community"},
  {"time":"Sunday Morning","icon":"🌅","title":"Sunrise Practice","description":"Gentle wake-up flow and meditation"},
  {"time":"Final Session","icon":"💫","title":"Integration & Closing","description":"Personal practice planning and closing ceremony"}
]'::jsonb,
true);


-- ═══════════════════════════════════════════════════════════════
-- SECTION 3: PROGRAMS (4 Complete Programs)
-- ═══════════════════════════════════════════════════════════════

-- Program 1: Guided Meditation (was missing)
INSERT INTO programs (name, slug, category, icon, tagline, description, long_description, benefits, what_included, duration, schedule, location, price, max_participants, level, type, tags, upcoming_dates, active) VALUES
(
  'Guided Meditation Program',
  'guided-meditation',
  'Meditation',
  '🧘',
  'Discover inner peace through structured meditation practice',
  'A comprehensive 4-week program teaching various meditation techniques - from mindfulness to visualization. Perfect for beginners and those deepening their practice.',
  'Meditation transforms your relationship with your mind. This program guides you through foundational to advanced techniques in a supportive group setting. Each week focuses on a different meditation style, giving you a complete toolkit for lifelong practice. You''ll learn to work with wandering thoughts, physical discomfort, emotional turbulence, and eventually experience moments of deep peace. Dr. Fareen combines traditional Buddhist and yogic methods with contemporary mindfulness approaches. By program''s end, you''ll have a personalized daily practice that fits your lifestyle and temperament.',
  ARRAY[
    'Reduced anxiety and stress',
    'Improved emotional regulation',
    'Better focus and concentration',
    'Enhanced self-awareness',
    'Improved sleep quality',
    'Greater sense of inner peace',
    'Tools for managing difficult emotions'
  ],
  ARRAY[
    'Weekly 90-minute live sessions',
    'Mindfulness of breath meditation',
    'Body scan progressive relaxation',
    'Loving-kindness (Metta) meditation',
    'Visualization and guided imagery',
    'Mantra and sound meditation',
    'Walking meditation techniques',
    'Daily practice audio recordings',
    'Meditation journal and tracking sheet',
    'Private WhatsApp group support',
    '30-day post-program email guidance'
  ],
  '4 Weeks',
  'Every Wednesday, 7:00 - 8:30 PM',
  'Online & Offline (Pratap Nagar, Jaipur)',
  3000,
  15,
  'all',
  'hybrid',
  ARRAY['meditation', 'mindfulness', 'stress-relief', 'mental-health', 'beginners'],
  ARRAY['2026-07-09', '2026-08-06', '2026-09-03']::date[],
  true
);

-- Programs 2, 3, 4 were added in 10_add_sample_programs.sql
-- No need to duplicate here


-- ═══════════════════════════════════════════════════════════════
-- SECTION 4: BLOG POSTS (10 Detailed Articles)
-- ═══════════════════════════════════════════════════════════════

INSERT INTO blogs (title, slug, author, category, image, excerpt, content, published) VALUES

-- Blog 1
('The Complete Guide to Sun Salutations', 'complete-guide-sun-salutations', 'Dr. Fareen Tak', 'Yoga',
'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
'Master Surya Namaskar with proper alignment, breath coordination, and variations for all levels.',
'Sun Salutations (Surya Namaskar) are the foundation of vinyasa-style yoga. This flowing sequence warms the body, synchronizes breath with movement, and energizes your entire system.

**The 12-Step Classical Sequence:**

1. **Pranamasana** - Mountain Pose with prayer hands
2. **Hasta Uttanasana** - Raised arms pose, gentle backbend
3. **Padahastasana** - Standing forward fold
4. **Ashwa Sanchalanasana** - Low lunge, right leg back
5. **Parvatasana** - Downward facing dog
6. **Ashtanga Namaskara** - Eight-point salutation
7. **Bhujangasana** - Cobra pose
8. **Parvatasana** - Downward dog (return)
9. **Ashwa Sanchalanasana** - Low lunge, left leg back
10. **Padahastasana** - Standing forward fold
11. **Hasta Uttanasana** - Raised arms
12. **Pranamasana** - Return to mountain

**Breath Pattern:**
Inhale: Reaching up, lunging, cobra
Exhale: Folding forward, transitioning to plank/downdog
Hold breath out: Eight-point salutation

**Common Mistakes:**
- Holding breath during transitions
- Collapsing shoulders in plank
- Forcing deeper stretch than body allows
- Rushing through poses

**Variations:**
- Beginner: Keep knees down in plank
- Intermediate: Add push-up (chaturanga)
- Advanced: Jump between poses

**Benefits:**
- Cardiovascular warm-up
- Full-body strength building
- Spine flexibility
- Mental focus through counting

Start with 3 rounds, building to 12 rounds over time. Practice on empty stomach in morning sunlight when possible.',
true),

-- Blog 2  
('Pranayama for Anxiety: Techniques That Work', 'pranayama-for-anxiety', 'Dr. Fareen Tak', 'Pranayama',
'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
'Discover breath techniques scientifically proven to reduce anxiety and calm the nervous system instantly.',
'Anxiety lives in the breath. When anxious, breathing becomes shallow and rapid. These pranayama techniques interrupt the stress cycle and activate calm.

**Technique 1: 4-7-8 Breath (Immediate Relief)**
- Inhale through nose: count 4
- Hold breath: count 7  
- Exhale through mouth: count 8
- Repeat 4 times
Effect: Slows heart rate within 60 seconds

**Technique 2: Alternate Nostril Breathing**
Right hand: fold index and middle fingers
- Close right nostril with thumb
- Inhale left nostril
- Close left with ring finger
- Exhale right nostril
- Inhale right
- Exhale left
Continue 5-10 minutes
Effect: Balances nervous system

**Technique 3: Bee Breath (Bhramari)**
- Inhale normally
- Close ears with thumbs
- Exhale making humming sound
- Feel vibration in head
Effect: Reduces racing thoughts

**Science Behind It:**
- Stimulates vagus nerve (rest response)
- Increases parasympathetic tone
- Reduces cortisol levels
- Regulates heart rate variability

**When to Practice:**
- Upon waking (prevents anxiety buildup)
- Before stressful situations
- During panic attack onset
- Before sleep (improves rest)

**Important Notes:**
Never force breath
Practice on empty stomach
Stop if feeling dizzy
Consistency creates lasting change

These techniques work within minutes but build resilience over weeks of daily practice.',
true),

-- Blog 3
('Naturopathy Home Remedies for Common Ailments', 'naturopathy-home-remedies', 'Dr. Fareen Tak', 'Naturopathy',
'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
'Simple, effective natural treatments using kitchen ingredients for headaches, colds, indigestion, and more.',
'Nature provides remedies for most common health issues. These tried-and-tested naturopathic solutions use simple ingredients.

**For Headaches:**
- Cold compress on forehead
- Ginger tea with honey
- Peppermint oil temples massage
- Magnesium-rich foods (almonds, spinach)

**For Common Cold:**
- Ginger-tulsi-black pepper tea
- Steam inhalation with eucalyptus
- Turmeric milk before bed
- Garlic raw or in food
- Rest and warmth

**For Indigestion:**
- Cumin-coriander-fennel tea (CCF)
- Walk 100 steps after meals
- Avoid cold water with food
- Eat until 80% full only

**For Insomnia:**
- Warm milk with nutmeg and saffron
- Foot massage with warm oil
- No screens 1 hour before bed
- Chamomile or ashwagandha tea

**For Acidity:**
- Coconut water morning empty stomach
- Avoid citrus and spicy food
- Small frequent meals
- Fennel seeds after meals

**For Joint Pain:**
- Turmeric golden milk
- Hot compress or heating pad
- Gentle movement (not rest)
- Omega-3 rich foods

**General Principles:**
- Prevention better than cure
- Address root cause, not just symptoms
- Support body''s natural healing
- Patience - natural healing takes time

**When to See a Doctor:**
- Symptoms persist beyond 3-5 days
- Severe pain or fever
- Unusual symptoms
- Underlying health conditions

These remedies complement, not replace, medical care when needed.',
true),

-- Blog 4
('Meditation for Better Sleep: A Bedtime Practice', 'meditation-better-sleep', 'Dr. Fareen Tak', 'Meditation',
'https://images.unsplash.com/photo-1511268559489-34b624fbfcf5?w=800',
'Learn a simple meditation routine that prepares your mind and body for deep, restful sleep.',
'Insomnia often stems from an overactive mind. This bedtime meditation creates conditions for natural sleep.

**The 20-Minute Sleep Meditation:**

**Minutes 1-5: Transition Ritual**
- Dim lights, comfortable position
- Close eyes, take 3 deep sighs
- Scan body, release obvious tension
- Set intention: "I allow sleep to come"

**Minutes 6-10: Breath Counting**
- Breathe naturally
- Count backwards from 100
- Only on exhales
- When thoughts arise, return to counting
- Most people sleep before reaching zero

**Minutes 11-15: Body Relaxation**
- Progressive muscle release
- Start at toes, move upward
- Soften each body part
- "My feet are heavy and relaxed"
- "My legs are heavy and relaxed"
Continue through entire body

**Minutes 16-20: Visualization**
- Imagine safe, peaceful place
- Engage all senses
- Feel warmth of sunshine
- Hear gentle sounds
- Stay in this scene
- Allow sleep to arrive

**If Still Awake:**
Don''t force it. Get up, do quiet activity for 15 minutes, return to bed and repeat.

**Sleep Hygiene to Support Practice:**
- Same sleep/wake time daily
- Cool, dark, quiet room
- No caffeine after 2 PM
- No large meals 3 hours before bed
- Morning sunlight exposure
- Regular exercise (not close to bedtime)

**Yoga Poses Before Meditation:**
- Legs up wall (5 min)
- Supported child''s pose (3 min)  
- Gentle twist both sides (2 min each)

Most report falling asleep within the first two weeks of consistent practice.',
true),

-- Blog 5
('Yoga Philosophy: Living the Yamas in Modern Life', 'yoga-philosophy-yamas-modern-life', 'Dr. Fareen Tak', 'Lifestyle',
'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
'Apply the ethical foundations of yoga - the five Yamas - to contemporary challenges and relationships.',
'The Yamas are yoga''s ethical guidelines for how we relate to the world. Ancient wisdom, deeply relevant today.

**1. Ahimsa (Non-Violence)**
Beyond physical harm:
- Speech: Speak kindly, avoid gossip
- Thoughts: Practice self-compassion
- Food: Consider impact of food choices
- Environment: Reduce harm to planet
Modern application: Set boundaries without aggression

**2. Satya (Truthfulness)**  
Honest but kind:
- Speak truth when it helps
- Silence when truth harms
- Be authentic in relationships
- Honor commitments
Modern application: Authentic social media presence

**3. Asteya (Non-Stealing)**
Beyond physical theft:
- Time: Don''t waste others'' time
- Credit: Acknowledge others'' work
- Attention: Be present in conversations
- Energy: Don''t drain others emotionally
Modern application: Respect intellectual property

**4. Brahmacharya (Moderation)**
Originally celibacy, now moderation:
- Food: Eat mindfully, not excessively
- Entertainment: Balanced screen time
- Work: Avoid burnout
- Relationships: Quality over quantity
Modern application: Digital detox practices

**5. Aparigraha (Non-Possessiveness)**
Let go of attachment:
- Material: Minimalism, declutter
- Relationships: Allow others freedom
- Outcomes: Release need to control
- Identity: Don''t cling to self-image
Modern application: Practice gratitude not accumulation

**Integration Practice:**
- Morning: Set intention for one Yama
- Throughout day: Notice opportunities to practice
- Evening: Reflect on successes and challenges
- Weekly: Focus deeply on one Yama

These aren''t rules but practices that create harmony within and around us.',
true);


-- More Blog Posts (continued)

-- Blog 6
('Stress Management Through Yoga: A Scientific Approach', 'stress-management-yoga-scientific', 'Dr. Fareen Tak', 'Stress & Mental Health',
'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
'Understand how yoga affects your stress response system and learn evidence-based practices for resilience.',
'Chronic stress is epidemic. Yoga offers scientifically-validated tools to build stress resilience.

**Understanding the Stress Response:**

When stressed, body activates "fight or flight":
- Cortisol and adrenaline release
- Heart rate increases
- Breathing becomes shallow
- Digestion shuts down
- Immune system suppressed

Chronic activation causes:
- Anxiety and depression
- Digestive issues
- Sleep problems
- Weakened immunity
- Heart disease risk

**How Yoga Interrupts This Cycle:**

**1. Physical Practice (Asana)**
- Releases muscular tension
- Lowers blood pressure
- Improves HRV (heart rate variability)
- Boosts GABA (calming neurotransmitter)

**2. Breathwork (Pranayama)**
- Activates parasympathetic nervous system
- Reduces cortisol by 30%
- Increases oxygen efficiency
- Calms amygdala (fear center)

**3. Meditation**
- Shrinks amygdala over time
- Thickens prefrontal cortex (emotional regulation)
- Increases gray matter in hippocampus
- Improves resilience to future stress

**Practical Stress-Relief Protocol:**

**Morning (10 minutes):**
- 5 min: Gentle stretches
- 5 min: Alternate nostril breathing

**During Stress (5 minutes):**
- Stop what you''re doing
- 4-7-8 breath (4 rounds)
- Body scan, release tension
- Return to task

**Evening (15 minutes):**
- 10 min: Restorative poses
- 5 min: Yoga Nidra

**Weekly:**
- 2-3 full yoga classes
- One longer meditation session
- Nature walk mindfully

**Research-Backed Results:**
- 8 weeks: Measurable cortisol reduction
- 12 weeks: Structural brain changes
- 6 months: Long-term stress resilience

**Important:** Yoga complements, doesn''t replace, mental health treatment. If experiencing severe stress or depression, seek professional support.

The key is consistency. Even 10 minutes daily creates more benefit than sporadic longer practices.',
true),

-- Blog 7
('Building a Home Yoga Practice', 'building-home-yoga-practice', 'Dr. Fareen Tak', 'Yoga',
'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
'Create a sustainable personal yoga practice at home with practical tips for space, time, and sequence design.',
'A home practice deepens your relationship with yoga beyond attending classes. Here''s how to build one that lasts.

**Creating Your Space:**

Dedicate a corner:
- Clean, quiet area
- Good ventilation
- Natural light if possible
- Minimal distractions
- Your mat stays rolled there

Ambiance (optional):
- Candle or incense
- Small plant
- Inspiring image or statue
- Meditation cushion

**Finding Your Time:**

**Morning practice benefits:**
- Body stiff but mind clear
- Sets positive tone for day
- Energy boost
- Empty stomach ideal

**Evening practice benefits:**
- Body more flexible
- Releases day''s tension
- Prepares for sleep
- Processing emotions

Choose one and commit. Consistency over perfection.

**Sample 30-Minute Home Sequence:**

**Opening (5 min):**
- Seated: 5 deep breaths
- Cat-cow: 10 rounds
- Child''s pose: 2 minutes

**Warm-Up (5 min):**
- Sun Salutations: 3 rounds
- Gradually increase intensity

**Standing Poses (10 min):**
- Warrior I: 5 breaths each side
- Warrior II: 5 breaths each side
- Triangle: 5 breaths each side
- Tree pose: 8 breaths each side

**Floor Work (5 min):**
- Bridge pose: 3 times, 5 breaths
- Supine twist: 10 breaths each side
- Happy baby: 10 breaths

**Closing (5 min):**
- Savasana: 5 minutes minimum
- Seated: 3 deep breaths
- Bow or prayer hands

**Staying Motivated:**

- Same time daily builds habit
- Start with 15 minutes, grow gradually
- Some days just do Savasana - that counts
- Keep a practice journal
- Online classes for variety
- Connect with practice buddies

**When Resistance Arises:**

- "I''m too tired": Try 5 minutes only
- "I don''t have time": Wake up 30 min earlier
- "I need a teacher": Follow videos initially
- "I''m too stiff": Perfect reason to practice

**Signs of Progress:**
- You crave practice when you miss it
- Life feels more balanced
- Physical flexibility increases
- Mental clarity improves
- Emotional resilience grows

Remember: Yoga practice doesn''t have to be perfect. Showing up is the practice.',
true),

-- Blog 8
('Ayurvedic Daily Routine (Dinacharya)', 'ayurvedic-daily-routine-dinacharya', 'Dr. Fareen Tak', 'Naturopathy',
'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
'Discover Ayurveda''s time-tested daily routine that aligns your body with natural rhythms for optimal health.',
'Ayurveda, yoga''s sister science, prescribes a daily routine (Dinacharya) that synchronizes with nature''s rhythms.

**Morning Routine (Brahma Muhurta: 5:30-6:30 AM):**

**Upon Waking:**
- Wake before sunrise
- Gratitude prayer or affirmation
- Observe your breath and mental state

**Elimination:**
- Drink warm water (copper vessel ideal)
- Natural urge to eliminate
- Don''t suppress natural urges

**Cleansing:**
- Tongue scraping (removes ama/toxins)
- Oil pulling (coconut or sesame, 10-15 min)
- Brush teeth with herbal powder
- Nasal wash (Neti pot)
- Eye wash with cold water or rose water

**Self-Massage (Abhyanga):**
- Warm sesame oil
- Massage toward heart
- 10-15 minutes before bath
- Benefits: improved circulation, calm mind, skin health

**Exercise:**
- Yoga or walking
- 50% of capacity (should be able to nose-breathe)
- Build sweat but not exhaustion

**Bathing:**
- Warm water (not hot)
- Cold water rinse at end
- Activates circulation

**Breakfast:**
- Eat only if hungry
- Warm, cooked foods
- Fruit alone or wait 30 min before meal

**Mid-Day Routine:**

**Lunch (12-1 PM):**
- Largest meal of day
- Digestive fire (agni) strongest at noon
- Eat in peaceful environment
- Chew thoroughly
- 100 steps walk after

**Work:**
- Focused work during Pitta time (10 AM - 2 PM)
- Short breaks every 90 minutes

**Evening Routine:**

**Dinner (6-7 PM):**
- Lighter than lunch
- Finish 3 hours before sleep
- Warm, easily digestible

**Winding Down:**
- Gentle yoga or stretching
- Avoid screens 1 hour before bed
- Warm shower or bath
- Foot massage with oil

**Sleep:**
- By 10 PM (Kapha time - naturally sleepy)
- 7-8 hours
- Left side for digestion, right for energy

**Seasonal Adjustments:**

**Summer:** 
- Wake earlier
- Cool foods
- More rest

**Winter:**
- Can wake later
- Warming foods
- More vigorous exercise

**Benefits of Consistent Dinacharya:**
- Better digestion
- Improved sleep
- Balanced energy
- Mental clarity
- Disease prevention
- Graceful aging

**Implementation:**
Don''t change everything at once. Add one practice weekly. Within 3 months, the routine becomes natural.',
true),

-- Blog 9
('Understanding Chakras: Energy Centers in Yoga', 'understanding-chakras-energy-centers', 'Dr. Fareen Tak', 'Yoga',
'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800',
'Explore the chakra system, its relevance to modern life, and practices to balance your energy centers.',
'Chakras are energy centers in yogic anatomy. While subtle and not visible, their effects manifest physically and emotionally.

**The Seven Main Chakras:**

**1. Muladhara (Root) - Base of Spine**
Color: Red | Element: Earth
Governs: Security, survival, grounding
Balanced: Feel safe, stable, present
Imbalanced: Fear, anxiety, financial worry
Practice: Standing poses, mountain pose, leg work

**2. Svadhisthana (Sacral) - Lower Abdomen**
Color: Orange | Element: Water
Governs: Creativity, sexuality, emotions
Balanced: Creative flow, healthy relationships
Imbalanced: Creative blocks, emotional numbness
Practice: Hip openers, goddess pose, flowing movements

**3. Manipura (Solar Plexus) - Upper Abdomen**
Color: Yellow | Element: Fire
Governs: Personal power, confidence, will
Balanced: Strong boundaries, self-esteem
Imbalanced: Low confidence, people-pleasing
Practice: Core work, boat pose, twists

**4. Anahata (Heart) - Center of Chest**
Color: Green | Element: Air
Governs: Love, compassion, connection
Balanced: Loving, forgiving, connected
Imbalanced: Closed-off, resentful, lonely
Practice: Backbends, chest openers, arm reaches

**5. Vishuddha (Throat) - Throat**
Color: Blue | Element: Ether
Governs: Communication, truth, expression
Balanced: Authentic expression, good listener
Imbalanced: Fear of speaking, throat problems
Practice: Neck rolls, shoulder stands, chanting

**6. Ajna (Third Eye) - Between Eyebrows**
Color: Indigo | Element: Light
Governs: Intuition, wisdom, imagination
Balanced: Clear intuition, good insight
Imbalanced: Confusion, lack of direction
Practice: Meditation, child''s pose, forward folds

**7. Sahasrara (Crown) - Top of Head**
Color: Violet/White | Element: Thought
Governs: Spiritual connection, consciousness
Balanced: Connected to something larger
Imbalanced: Spiritual disconnection, closed-minded
Practice: Meditation, headstand, Savasana

**Balancing Practices:**

**Meditation:**
- Visualize each chakra''s color
- Chant associated mantras (LAM, VAM, RAM, YAM, HAM, OM, AH)
- Breathe into each center

**Yoga Asana:**
Target poses for specific chakras as listed above

**Lifestyle:**
- Eat foods matching chakra colors
- Wear colors of underactive chakra
- Journal about chakra themes
- Therapy/counseling for emotional blocks

**Signs of Balanced Chakra System:**
- Physical health
- Emotional stability
- Mental clarity
- Spiritual connection
- Life flows with ease

While chakras are subtle, working with them creates tangible shifts in wellbeing.',
true),

-- Blog 10
('Yoga for Desk Workers: Combat Sitting Disease', 'yoga-desk-workers-sitting-disease', 'Dr. Fareen Tak', 'Lifestyle',
'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
'Essential yoga practices to counteract the effects of prolonged sitting and prevent chronic pain.',
'Sitting is called "the new smoking." These yoga practices reverse its damage.

**The Problem with Sitting:**

**Physical Effects:**
- Hip flexors shorten and tighten
- Glutes weaken and flatten
- Hamstrings shorten
- Upper back rounds (kyphosis)
- Neck juts forward
- Wrists strain (typing)
- Eyes fatigue (screen)

**Health Risks:**
- Back and neck pain
- Poor circulation
- Weight gain
- Increased disease risk
- Mental fog
- Mood issues

**At-Your-Desk Mini Sequences:**

**Every Hour (2 minutes):**
1. Stand, reach arms overhead, side bend
2. Chair twist both sides (30 sec each)
3. Neck rolls (gentle, both directions)
4. Wrist circles (10 each direction)
5. Ankle circles (10 each)
6. Eye exercises (look far, near, circles)

**Lunch Break (10 minutes):**
1. Forward fold (hands toward floor): 1 min
2. Low lunge (hip flexor stretch): 1 min each
3. Puppy pose (shoulders): 2 min
4. Cat-cow: 2 min
5. Seated twist: 1 min each side
6. Eagle arms (shoulder blade stretch): 1 min

**After-Work Routine (20 minutes):**

**Opening:**
- Child''s pose: 2 min
- Cat-cow: 2 min

**Hip Opening:**
- Pigeon pose: 3 min each side
- Low lunge with quad stretch: 2 min each
- Reclined figure-4: 2 min each side

**Shoulder/Upper Back:**
- Puppy pose: 2 min
- Thread needle: 1 min each side
- Reverse prayer hands: 1 min

**Closing:**
- Legs up wall: 5 min
- Savasana: 3 min

**Ergonomic Adjustments:**
- Screen at eye level
- Feet flat on floor
- Keyboard at elbow height
- Chair supports lower back
- Regular standing/walking breaks

**Lifestyle Changes:**
- Walking meetings
- Standing desk (alternate sitting/standing)
- Take stairs
- Park farther away
- Exercise before/after work

**Warning Signs to Address:**
- Persistent back/neck pain
- Numbness in hands/feet
- Severe headaches
- Vision problems
- Inability to sit without pain

**Prevention is Key:**
Don''t wait for pain to start. Begin these practices now, even if you feel fine. Your future self will thank you.',
true);


-- ═══════════════════════════════════════════════════════════════
-- SECTION 5: GALLERY IMAGES (15+ Images)
-- ═══════════════════════════════════════════════════════════════

INSERT INTO gallery (url, caption, category, alt, sort_order, visible) VALUES

-- Classes Category
('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800', 'Morning Hatha Yoga Session', 'classes', 'Group yoga class in sunlit studio', 1, true),
('https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800', 'Meditation Circle at Prana House', 'classes', 'Students in seated meditation pose', 2, true),
('https://images.unsplash.com/photo-1545389336-cf090694435e?w=800', 'Evening Restorative Practice', 'classes', 'Gentle yoga with props and support', 3, true),
('https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800', 'Pranayama Breathing Session', 'classes', 'Close-up of meditation and breathwork', 4, true),

-- Meditation Category
('https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800', 'Silent Meditation Practice', 'meditation', 'Peaceful meditation in natural setting', 5, true),
('https://images.unsplash.com/photo-1511268559489-34b624fbfcf5?w=800', 'Mindfulness in Nature', 'meditation', 'Outdoor meditation by the water', 6, true),
('https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800', 'Group Meditation Circle', 'meditation', 'Community meditation gathering', 7, true),

-- Workshop Category
('https://images.unsplash.com/photo-1545389336-cf090694435e?w=800', 'Yoga Philosophy Workshop', 'workshop', 'Interactive learning session with Dr. Fareen', 8, true),
('https://images.unsplash.com/photo-1593811167562-9cef47bfc4a7?w=800', 'Ayurveda & Wellness Workshop', 'workshop', 'Practical naturopathy demonstrations', 9, true),
('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800', 'Pranayama Deep Dive Workshop', 'workshop', 'Advanced breathing techniques training', 10, true),

-- Retreat Category
('https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800', 'Full Day Yoga Retreat - Morning Session', 'retreat', 'Sunrise yoga during retreat', 11, true),
('https://images.unsplash.com/photo-1545389336-cf090694435e?w=800', 'Retreat Wellness Workshop', 'retreat', 'Interactive wellness session at retreat', 12, true),
('https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800', 'Sattvic Retreat Meal', 'retreat', 'Healthy vegetarian retreat meal presentation', 13, true),
('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800', 'Yoga Nidra Relaxation', 'retreat', 'Deep relaxation practice during retreat', 14, true),
('https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800', 'Retreat Community Circle', 'retreat', 'Participants sharing and connecting', 15, true);

-- ═══════════════════════════════════════════════════════════════
-- END OF DATA PRE-FILL
-- ═══════════════════════════════════════════════════════════════

-- Verify all data was inserted
SELECT 'Classes:' as table_name, COUNT(*) as count FROM classes
UNION ALL
SELECT 'Retreats:', COUNT(*) FROM retreats
UNION ALL
SELECT 'Programs:', COUNT(*) FROM programs  
UNION ALL
SELECT 'Blogs:', COUNT(*) FROM blogs
UNION ALL
SELECT 'Gallery:', COUNT(*) FROM gallery;
